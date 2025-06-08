import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Catalog } from './pages/Catalog';
import { Checkout } from './pages/Checkout';
import { Success } from './pages/Success';
import { ItemDescription } from './pages/ItemDescription';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route path="/item-description/:id" element={<ItemDescription />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
