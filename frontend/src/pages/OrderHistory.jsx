import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiClient.get('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Erreur de récupération des commandes :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Chargement...</p>;

    if (orders.length === 0) return <p>Aucune commande pour le moment.</p>;

    return (
        <div>
            <h2>Historique de commandes</h2>
            {orders.map((order) => (
                <div key={order._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
                    <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Statut :</strong> {order.status}</p>
                    <p><strong>Total :</strong> {order.totalPrice} €</p>
                    <ul>
                        {order.products.map(item => (
                            <li key={item.product._id}>
                                {item.product.name} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory;
