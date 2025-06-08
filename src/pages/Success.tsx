import { useNavigate } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4 text-beige-light">Compra Realizada com Sucesso!</h1>
        <p className="mb-8 text-slate-300">
          Obrigado por sua compra. Em um sistema real, você receberia um e-mail com os detalhes do pedido.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-beige-soft text-white px-6 py-2 rounded hover:bg-beige-hover"
        >
          Voltar para o Catálogo
        </button>
      </div>
    </div>
  );
}; 