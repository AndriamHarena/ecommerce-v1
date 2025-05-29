import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../api/apiClient';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
      
      // Extraire les catégories uniques des produits
      if (data && Array.isArray(data)) {
        const uniqueCategories = [...new Set(data.map(product => product.category).filter(Boolean))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
      setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId || product._id === productId);
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(product => product.category === category);
  };

  const value = {
    products,
    loading,
    error,
    categories,
    fetchProducts,
    getProductById,
    getProductsByCategory
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
