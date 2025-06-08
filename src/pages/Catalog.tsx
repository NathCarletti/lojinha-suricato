import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../api/products';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { SearchBar } from '../components/SearchBar';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-300">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
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
          <h1 className="text-3xl font-bold mb-8 text-beige-soft">Catálogo de Produtos</h1>
        </div>
        <div className="lg:col-span-1">
          <div className="mb-6">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Buscar produtos por nome ou descrição..."
            />
          </div>
        </div>
          <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              Nenhum produto encontrado para "{searchTerm}"
            </div>
          )}
          </div>
        <div className="lg:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}; 