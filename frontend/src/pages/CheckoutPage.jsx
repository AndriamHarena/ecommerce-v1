import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/apiClient';
import '../styles/CheckoutPage.css';

function CheckoutPage() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phoneNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Si l'utilisateur n'est pas connecté ou si le panier est vide, rediriger
  if (!user) {
    navigate('/login', { state: { from: '/checkout', message: 'Veuillez vous connecter pour finaliser votre commande' } });
    return null;
  }
  
  if (cart.length === 0) {
    navigate('/cart', { state: { message: 'Votre panier est vide' } });
    return null;
  }
  
  // Calcul des totaux
  const subtotal = total;
  const shipping = total >= 50 ? 0 : 4.99;
  const orderTotal = subtotal + shipping;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur pour ce champ si l'utilisateur le modifie
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validation des champs requis
    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est requis';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Format de code postal invalide (5 chiffres)';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Le numéro de téléphone est requis';
    } else if (!/^(\+33|0)[1-9](\d{2}){4}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Format de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Préparer les données de la commande au format attendu par le backend
      const orderData = {
        // Le backend extrait déjà l'ID utilisateur du token JWT
        products: cart.map(item => ({
          product: item.id || item._id,
          quantity: item.quantity
        }))
      };
      
      // Stocker les informations d'adresse dans localStorage pour la page de confirmation
      // (le backend actuel ne stocke pas ces informations)
      const orderDetails = {
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phoneNumber: formData.phoneNumber
        },
        paymentMethod,
        totalPrice: orderTotal,
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
      };
      
      localStorage.setItem('lastOrderDetails', JSON.stringify(orderDetails));
      
      // Appel API pour créer la commande
      const response = await createOrder(orderData);
      
      // Fusionner la réponse avec les détails supplémentaires pour la page de confirmation
      const completeOrder = {
        ...response,
        ...orderDetails
      };
      
      // Vider le panier après une commande réussie
      clearCart();
      
      // Rediriger vers la page de confirmation
      navigate('/order-confirmation', { state: { order: completeOrder } });
      
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      setErrors({
        submit: 'Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="checkout-page">
      <h1>Finaliser votre commande</h1>
      
      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2>Informations personnelles</h2>
              
              <div className="form-group">
                <label htmlFor="fullName">Nom complet *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber">Téléphone *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="ex: 0612345678"
                  className={errors.phoneNumber ? 'error' : ''}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Adresse de livraison</h2>
              
              <div className="form-group">
                <label htmlFor="address">Adresse *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Ville *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">Code postal *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={errors.postalCode ? 'error' : ''}
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Pays</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Mode de paiement</h2>
              
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <label htmlFor="card">Carte bancaire</label>
                </div>
                
                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              {/* Affichage conditionnel des champs de carte bancaire */}
              {paymentMethod === 'card' && (
                <div className="card-fields">
                  <p className="secure-payment-notice">
                    <span className="secure-icon">🔒</span>
                    Paiement sécurisé - Cette démo n'enregistre pas vos informations de carte bancaire.
                  </p>
                </div>
              )}
            </div>
            
            {errors.submit && (
              <div className="form-error">
                {errors.submit}
              </div>
            )}
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Traitement en cours...' : 'Confirmer la commande'}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Récapitulatif de la commande</h2>
          
          <div className="cart-items-summary">
            {cart.map(item => (
              <div key={item.id || item._id} className="summary-item">
                <div className="summary-item-details">
                  <span className="item-quantity">{item.quantity} ×</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-price">
                  {((item.price || 0) * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            
            <div className="summary-row">
              <span>Frais de livraison</span>
              <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)} €`}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{orderTotal.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
