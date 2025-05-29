import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fonction pour mettre à jour la quantité d'un article
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateQuantity(productId, newQuantity);
  };

  // Fonction pour procéder au paiement
  const handleCheckout = () => {
    if (!user) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/login', { state: { from: '/cart', message: 'Veuillez vous connecter pour finaliser votre commande' } });
      return;
    }

    // Simuler un chargement
    setIsCheckingOut(true);
    
    // Rediriger vers la page de paiement après un court délai (simulation)
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h1>Votre panier</h1>
        <div className="empty-cart-message">
          <i className="empty-cart-icon">🛒</i>
          <p>Votre panier est vide</p>
          <Link to="/products" className="continue-shopping-btn">
            Explorer nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Votre panier</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => {
            const productId = item.id || item._id;
            return (
              <div key={productId} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image || 'https://via.placeholder.com/80x80?text=Produit'} 
                    alt={item.name} 
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{(item.price || 0).toFixed(2)} €</p>
                </div>
                
                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-subtotal">
                  <p>{((item.price || 0) * item.quantity).toFixed(2)} €</p>
                </div>
                
                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(productId)}
                >
                  ✕
                </button>
              </div>
            );
          })}
          
          <button 
            className="clear-cart-btn"
            onClick={() => {
              if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
                clearCart();
              }
            }}
          >
            Vider le panier
          </button>
        </div>
        
        <div className="cart-summary">
          <h2>Résumé de la commande</h2>
          
          <div className="summary-row">
            <span>Sous-total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          
          <div className="summary-row">
            <span>Frais de livraison</span>
            <span>{total >= 50 ? 'Gratuit' : '4.99 €'}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>{(total >= 50 ? total : total + 4.99).toFixed(2)} €</span>
          </div>
          
          <div className="free-shipping-info">
            {total >= 50 ? (
              <p>✅ Livraison gratuite appliquée</p>
            ) : (
              <p>🚚 Plus que {(50 - total).toFixed(2)} € pour la livraison gratuite</p>
            )}
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Traitement en cours...' : 'Procéder au paiement'}
          </button>
          
          <Link to="/products" className="continue-shopping-link">
            Continuer vos achats
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
