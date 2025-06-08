import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps { //interface para definir o tipo do props, 
// que significa que o props é um objeto com uma propriedade product do tipo Product
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 rounded-lg shadow-lg p-4 flex flex-col" 
    onClick={() => navigate(`/item-description/${product.id}`)}>
      <div className="relative h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="absolute w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 flex-grow text-slate-700">{product.title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-bold text-slate-800">
          R$ {product.price.toFixed(2)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Impede que o evento de clique "borbulhe" do botão (filho) para o card (pai)
            addItem(product);
          }}
          className="bg-beige-soft text-white px-4 py-2 rounded hover:bg-beige-hover transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}; 