import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserOrders } from '../api/apiClient';
import '../styles/OrdersPage.css';

const OrderStatus = ({ status }) => {
  let statusClass = 'status-badge ';
  let statusText = status;
  
  switch(status?.toLowerCase()) {
    case 'delivered':
    case 'livré':
    case 'livrée':
      statusClass += 'status-delivered';
      statusText = 'Livrée';
      break;
    case 'shipped':
    case 'expédié':
    case 'expédiée':
      statusClass += 'status-shipped';
      statusText = 'Expédiée';
      break;
    case 'processing':
    case 'en traitement':
      statusClass += 'status-processing';
      statusText = 'En traitement';
      break;
    case 'pending':
    case 'en attente':
      statusClass += 'status-pending';
      statusText = 'En attente';
      break;
    case 'cancelled':
    case 'annulé':
    case 'annulée':
      statusClass += 'status-cancelled';
      statusText = 'Annulée';
      break;
    default:
      statusClass += 'status-unknown';
      statusText = status || 'Inconnue';
  }
  
  return <span className={statusClass}>{statusText}</span>;
};

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Seulement récupérer les commandes si l'utilisateur est connecté
    if (user && !authLoading) {
      fetchOrders();
    }
  }, [user, authLoading]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getUserOrders();
      setOrders(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des commandes:', err);
      setError('Impossible de charger vos commandes. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!authLoading && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">Mes commandes</h1>
      
      {loading ? (
        <div className="orders-loading">
          <div className="spinner"></div>
          <p>Chargement de vos commandes...</p>
        </div>
      ) : error ? (
        <div className="orders-error">
          <p>{error}</p>
          <button 
            onClick={fetchOrders} 
            className="retry-button"
          >
            Réessayer
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="orders-empty">
          <p>Vous n'avez pas encore passé de commande.</p>
          <a href="/" className="shop-now-button">Commencer mes achats</a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id || order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-label">Commande</span>
                  <span className="order-id">#{order._id || order.id}</span>
                </div>
                <OrderStatus status={order.status} />
              </div>
              
              <div className="order-details">
                <div className="order-info">
                  <div className="order-info-item">
                    <span className="info-label">Date:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="order-info-item">
                    <span className="info-label">Total:</span>
                    <span className="order-total">{order.totalPrice?.toFixed(2) || '0.00'} €</span>
                  </div>
                  <div className="order-info-item">
                    <span className="info-label">Articles:</span>
                    <span>{order.products?.length || 0}</span>
                  </div>
                </div>
                
                <button className="view-details-button">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;
