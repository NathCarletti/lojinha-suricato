import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateQuantity } = useCart(); //useCart é um hook que retorna o estado do carrinho, 
  // removeItem é uma função que remove um item do carrinho, 
  // updateQuantity é uma função que atualiza a quantidade de um item no carrinho

  if (state.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-200">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">Carrinho</h2>
      <div className="space-y-4">
        {state.items.map((item) => ( //map para percorrer o array de items e exibir cada item
          <div key={item.product.id} className="flex items-center justify-between border-b pb-4"> 
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-semibold text-slate-700">{item.product.title}</h3>
                <p className="text-slate-600">R$ {item.product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4"> 
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                  className="bg-slate-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="text-slate-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-slate-200 px-2 py-1 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4"> 
        <p className="text-xl font-bold mb-4 text-slate-800">
          Total: R$ {state.total.toFixed(2)}
        </p>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full bg-beige-soft text-white px-4 py-2 rounded hover:bg-beige-hover"
        >
          Ir para Checkout
        </button>
      </div>
    </div>
  );
}; 