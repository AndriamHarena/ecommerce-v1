import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmationPage.css';

function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  
  // Récupérer les données de commande, soit depuis l'état de navigation, soit depuis localStorage
  useEffect(() => {
    const { order } = location.state || {};
    
    if (order) {
      setOrderData(order);
    } else {
      // Essayer de récupérer depuis localStorage si pas dans l'état
      const savedOrderDetails = localStorage.getItem('lastOrderDetails');
      if (savedOrderDetails) {
        try {
          const parsedDetails = JSON.parse(savedOrderDetails);
          setOrderData(parsedDetails);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails de commande:', error);
          navigate('/');
        }
      } else {
        // Si pas de données, rediriger vers l'accueil
        navigate('/');
      }
    }
  }, [location.state, navigate]);

  // Si aucune donnée de commande n'est disponible, afficher un état de chargement
  if (!orderData) return <div className="loading">Chargement des détails de la commande...</div>;
  
  // Générer un numéro de commande à partir de l'ID ou générer un aléatoire si non disponible
  const orderId = orderData._id || orderData.id;
  const orderNumber = orderId ? orderId.substr(-6).toUpperCase() : 'CMD' + Math.floor(Math.random() * 1000000);
  
  // Calculer les totaux
  const subtotal = orderData.items ? orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0) : orderData.totalPrice;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.20; // TVA 20%
  const total = orderData.totalPrice || (subtotal + shipping + tax);
  
  // Formater la date
  const orderDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✓</div>
          <h1>Commande confirmée !</h1>
          <p>Merci pour votre achat. Votre commande a été enregistrée avec succès.</p>
        </div>
        
        <div className="order-details">
          <div className="detail-row">
            <span className="detail-label">Numéro de commande :</span>
            <span className="detail-value">{orderNumber}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Date :</span>
            <span className="detail-value">{orderDate}</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Total :</span>
            <span className="detail-value">{total.toFixed(2)} €</span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Adresse de livraison :</span>
            <span className="detail-value">
              {orderData.shippingAddress.fullName}<br />
              {orderData.shippingAddress.address}<br />
              {orderData.shippingAddress.postalCode} {orderData.shippingAddress.city}<br />
              {orderData.shippingAddress.country}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="detail-label">Méthode de paiement :</span>
            <span className="detail-value">
              {orderData.paymentMethod === 'card' ? 'Carte bancaire' : 'PayPal'}
            </span>
          </div>
        </div>
        
        <div className="order-items">
          <h2>Articles commandés</h2>
          
          <div className="items-list">
            {orderData.items && orderData.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-details">
                  <span className="item-quantity">{item.quantity} ×</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-price">
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="confirmation-footer">
          <p>Un email de confirmation a été envoyé à votre adresse email.</p>
          <p>Vous pouvez suivre l'état de votre commande dans votre <Link to="/orders">historique de commandes</Link>.</p>
          
          <div className="action-buttons">
            <Link to="/products" className="secondary-button">
              Continuer vos achats
            </Link>
            <Link to="/orders" className="primary-button">
              Voir mes commandes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
