import type { Product } from '../types/product';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => { //getProducts é uma função que busca os produtos,
//  promise é uma promessa que será resolvida ou rejeitada,
//  Promise<Product[]> é uma promise que será resolvida com um array de produtos
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}; 