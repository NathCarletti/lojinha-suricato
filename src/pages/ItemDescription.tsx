import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/product';
import { getProducts } from '../api/products';
import { Cart } from '../components/Cart';

export const ItemDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { //useEffect é um hook que executa uma função quando o componente é montado
    const fetchProduct = async () => { //fetchProduct é uma função que busca o produto
      try {
        const products = await getProducts();
        const foundProduct = products.find(p => p.id === Number(id));
        if (foundProduct) {
          setProduct(foundProduct); //setProduct é uma função que atualiza o estado do produto
        } else {
          setError('Produto não encontrado');
        }
      } catch (err) {
        setError('Erro ao carregar o produto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-300">Carregando produto...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <button
              onClick={() => navigate('/')}
              className="mb-6 text-slate-200 hover:text-slate-800 flex items-center"
            >
              ← Voltar ao catálogo
            </button>
            <h1 className="text-3xl font-bold mb-8 text-beige-soft">{product.title}</h1>
            <div className="relative h-96 mb-6">
              <img
                src={product.image}
                alt={product.title}
                className="absolute w-full h-full object-contain"
              />
            </div>
            <div className="mb-6 mt-6">
              <h2 className="text-xl font-semibold mb-2 text-beige-light">Descrição</h2>
              <p className="text-slate-200">{product.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"> 
                <span className="text-sm text-slate-200">Avaliação:</span>
                <span className="text-yellow-500">★</span>
                <span className="text-slate-200">{product.rating.rate}</span>
                <span className="text-slate-400">({product.rating.count} avaliações)</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-slate-200">
                  R$ {product.price.toFixed(2)}
                </span>
                <button
          onClick={(e) => {
            e.stopPropagation(); 
            addItem(product);
          }}
          className="bg-beige-soft text-white px-4 py-2 rounded hover:bg-beige-hover transition-colors"
        >
          Adicionar ao Carrinho
        </button>
              </div>
            </div>
        </div>
        
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}; 