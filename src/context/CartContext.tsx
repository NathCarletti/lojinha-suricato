import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types/product';

interface CartState {
  items: CartItem[];
  total: number;
}

// Chave para o localStorage
const CART_STORAGE_KEY = '@SuricatoStore:cart';   //CART_STORAGE_KEY é a chave para o localStorage

// Função para carregar o estado inicial do localStorage
const loadInitialState = (): CartState => {
  if (typeof window === 'undefined') return { items: [], total: 0 }; //se o window não estiver definido, retorna um estado vazio
  
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0 }; //se o carrinho estiver definido, retorna o carrinho
};

// Função para salvar o estado no localStorage
const saveCartState = (state: CartState) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
};

type CartAction = //type CartAction é um tipo que define as ações que podem ser executadas no carrinho
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }; 

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
      break;
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.product.id === action.payload);
      if (!item) return state;
      newState = {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        total: state.total - (item.product.price * item.quantity),
      };
      break;
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (!item) return state;
      const quantityDiff = action.payload.quantity - item.quantity;
      newState = {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.product.price * quantityDiff),
      };
      break;
    }
    case 'CLEAR_CART':
      newState = {
        items: [],
        total: 0,
      };
      break;
    default:
      return state;
  }

  // Salva o novo estado no localStorage
  saveCartState(newState);
  return newState;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  // Sincroniza o carrinho entre diferentes abas/janelas
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        const newState = JSON.parse(e.newValue);
        dispatch({ type: 'CLEAR_CART' });
        newState.items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_ITEM', payload: item.product });
          if (item.quantity > 1) {
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { productId: item.product.id, quantity: item.quantity }
            });
          }
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 