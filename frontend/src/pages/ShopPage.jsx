import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ShopPage.css';

/**
 * Page principale de la boutique pour les utilisateurs normaux
 */
function ShopPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Données fictives pour les produits
  const mockProducts = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      price: 499.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'electronics',
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: 'Laptop Pro',
      price: 1299.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'electronics',
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: 'Casual T-shirt',
      price: 29.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'clothing',
      rating: 4.2,
      inStock: true
    },
    {
      id: 4,
      name: 'Running Shoes',
      price: 89.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'clothing',
      rating: 4.6,
      inStock: false
    },
    {
      id: 5,
      name: 'Coffee Machine',
      price: 199.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'home',
      rating: 4.3,
      inStock: true
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      price: 149.99,
      image: 'https://via.placeholder.com/300x300',
      category: 'electronics',
      rating: 4.7,
      inStock: true
    }
  ];

  useEffect(() => {
    // Simuler le chargement des produits depuis l'API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Dans un cas réel, vous feriez un appel API ici
        await new Promise(resolve => setTimeout(resolve, 800)); // Délai simulé
        setProducts(mockProducts);
        
        // Extraire les catégories uniques
        const uniqueCategories = [...new Set(mockProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des produits:', err);
        setError('Impossible de charger les produits. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrer les produits par catégorie
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Rendu des produits
  const renderProducts = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des produits...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Réessayer</button>
        </div>
      );
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="no-products">
          <p>Aucun produit trouvé dans cette catégorie.</p>
        </div>
      );
    }

    return (
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              {!product.inStock && <span className="out-of-stock">Rupture de stock</span>}
            </div>
            <div className="product-details">
              <h3>{product.name}</h3>
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                <span className="product-rating">★ {product.rating}</span>
              </div>
              <div className="product-price">{product.price.toFixed(2)} €</div>
              <div className="product-actions">
                <button 
                  className="add-to-cart" 
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                </button>
                <Link to={`/product/${product.id}`} className="view-details">
                  Détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>Notre boutique</h1>
        <p>Découvrez nos produits de qualité</p>
      </div>

      <div className="shop-controls">
        <div className="categories">
          <button 
            className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Tous les produits
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="user-actions">
          {user ? (
            <>
              <Link to="/orders" className="user-action-button">
                <span className="action-icon">📋</span>
                Mes commandes
              </Link>
              <Link to="/cart" className="user-action-button">
                <span className="action-icon">🛒</span>
                Mon panier
              </Link>
            </>
          ) : (
            <Link to="/login" className="user-action-button">
              <span className="action-icon">👤</span>
              Se connecter
            </Link>
          )}
        </div>
      </div>

      <div className="shop-content">
        {renderProducts()}
      </div>
    </div>
  );
}

export default ShopPage;
