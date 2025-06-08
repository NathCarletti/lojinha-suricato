import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => { 
    setProcessing(true);
    
    await new Promise((resolve) => setTimeout(resolve, 2000)); //delayzinho pra simular o pagamento
    clearCart();
    navigate('/success');
  };

  if (state.items.length === 0) { //se o carrinho estiver vazio, exibe uma mensagem
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-slate-700">Seu carrinho está vazio</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-beige-soft text-white px-6 py-2 rounded hover:bg-beige-hover"
          >
            Voltar para o Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-beige-soft">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-beige-light">Resumo do Pedido</h2>
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={item.product.id} className="flex justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium text-slate-200">{item.product.title}</h3>
                  <p className="text-slate-300">Quantidade: {item.quantity}</p>
                </div>
                <p className="font-medium text-slate-300">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <p className="text-2xl font-bold text-slate-200">
              Total: R$ {state.total.toFixed(2)}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-beige-light">Pagamento</h2>
          <div className="bg-slate-100 rounded-lg shadow-md p-6">
            <p className="text-slate-700 mb-4">
              Esta é uma simulação de checkout. Clique no botão abaixo para simular uma compra.
            </p>
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full bg-beige-soft text-white px-6 py-3 rounded hover:bg-beige-hover disabled:bg-gray-400"
            >
              {processing ? 'Processando...' : 'Finalizar Compra'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 