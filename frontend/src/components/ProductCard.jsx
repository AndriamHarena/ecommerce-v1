import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    
    // Gérer l'ajout au panier avec animation
    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart(product);
        
        // Réinitialiser l'état après une courte animation
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };
    
    // Déterminer l'état du stock
    const getStockStatus = () => {
        if (!product.stock && product.stock !== 0) return null; // Pas d'information de stock
        
        if (product.stock === 0) {
            return <span className="product-stock out-of-stock">Rupture de stock</span>;
        } else if (product.stock < 5) {
            return <span className="product-stock low-stock">Stock faible: {product.stock}</span>;
        } else {
            return <span className="product-stock in-stock">En stock</span>;
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                {product.image ? (
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        onError={(e) => {
                            e.target.onerror = null;
                            // Remplacer par un élément div contenant un SVG
                            const parent = e.target.parentNode;
                            const placeholderDiv = document.createElement('div');
                            placeholderDiv.className = 'placeholder-image';
                            placeholderDiv.innerHTML = `
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="200" height="200" fill="#f8f9fa" />
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6c757d">
                                        ${product.name.substring(0, 1)}
                                    </text>
                                </svg>
                            `;
                            parent.replaceChild(placeholderDiv, e.target);
                        }}
                    />
                ) : (
                    <div className="placeholder-image">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="200" height="200" fill="#f8f9fa" />
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6c757d" fontSize="64">
                                {product.name ? product.name.substring(0, 1) : 'P'}
                            </text>
                        </svg>
                    </div>
                )}
            </div>
            
            <div className="product-info">
                {product.category && (
                    <span className="product-category">{product.category}</span>
                )}
                
                <h3 className="product-name">{product.name}</h3>
                
                <p className="product-description">
                    {product.description || 'Aucune description disponible'}
                </p>
                
                <p className="product-price">{(product.price || 0).toFixed(2)} €</p>
                
                {getStockStatus()}
                
                <button 
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAdding}
                >
                    {isAdding ? 'Ajouté ✓' : 'Ajouter au panier'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
