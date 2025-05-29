import { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

function ProductsPage() {
  const { products, loading, error, categories } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les produits lorsque la catégorie ou le terme de recherche change
  useEffect(() => {
    if (!products) return;

    let result = [...products];
    
    // Filtrer par catégorie si sélectionnée
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filtrer par terme de recherche
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(product => 
        (product.name && product.name.toLowerCase().includes(searchLower)) || 
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des produits...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nos produits</h1>
        <p>Découvrez notre sélection de produits de qualité</p>
      </div>
      
      <div className="products-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>Aucun produit ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
