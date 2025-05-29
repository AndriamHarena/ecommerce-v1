import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPage from './pages/AdminPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsersPage from './pages/AdminUsersPage';
import OrdersPage from './pages/OrdersPage';
import ShopPage from './pages/ShopPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccessDenied from './pages/AccessDenied';
import TestPage from './pages/TestPage';
import TestBasic from './pages/TestBasic';
import Navbar from './components/Navbar';

// Contextes
import { useAuth, AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

// Composant pour protéger les routes d'admin
const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <div className="loading">Chargement...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin()) {
    return <Navigate to="/access-denied" />;
  }
  
  return children;
};

// Composant pour protéger les routes utilisateur
const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="loading">Chargement...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Composant principal qui englobe les routes avec les providers
function AppWithProviders() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

function App() {
  console.log('App component rendering');
  const { user, isAdmin } = useAuth();
  
  return (
    <div className="app-container">
      {/* Navbar appears on all routes */}
      <Navbar />
      
      {/* Main content area */}
      <div className="main-content" style={{ padding: '0', maxWidth: '100%', margin: '0 auto' }}>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          
          {/* Routes pour le processus de commande */}
          <Route path="/checkout" element={
            <UserRoute>
              <CheckoutPage />
            </UserRoute>
          } />
          <Route path="/order-confirmation" element={
            <UserRoute>
              <OrderConfirmationPage />
            </UserRoute>
          } />
          
          {/* Routes utilisateur protégées */}
          <Route path="/orders" element={
            <UserRoute>
              <OrdersPage />
            </UserRoute>
          } />
          
          {/* Routes administrateur protégées */}
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          } />
          
          {/* Routes de test */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/basic" element={<TestBasic />} />
          
          {/* Route par défaut - redirection intelligente basée sur le rôle */}
          <Route path="*" element={
            user ? (
              isAdmin() ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/shop" replace />
              )
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Page introuvable</h1>
                <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
                <div style={{ marginTop: '20px' }}>
                  <Link to="/" style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: '#4a148c',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px'
                  }}>Retour à l'accueil</Link>
                </div>
                <p>Pages disponibles :</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li><Link to="/" style={{ color: '#4a90e2', textDecoration: 'none' }}>Accueil</Link></li>
                  <li><Link to="/login" style={{ color: '#4a90e2', textDecoration: 'none' }}>Connexion</Link></li>
                  <li><Link to="/register" style={{ color: '#4a90e2', textDecoration: 'none' }}>Inscription</Link></li>
                  <li><Link to="/shop" style={{ color: '#4a90e2', textDecoration: 'none' }}>Boutique</Link></li>
                  <li><Link to="/products" style={{ color: '#4a90e2', textDecoration: 'none' }}>Produits</Link></li>
                  <li><Link to="/admin" style={{ color: '#4a90e2', textDecoration: 'none' }}>Admin</Link></li>
                </ul>
              </div>
            )
          } />
        </Routes>
      </div>
      
      {/* Simple footer */}
      <footer style={{ 
        padding: '15px', 
        textAlign: 'center', 
        backgroundColor: '#f8f9fa', 
        borderTop: '1px solid #e7e7e7',
        marginTop: '40px'
      }}>
        <p>© {new Date().getFullYear()} E-commerce Admin Platform | All rights reserved</p>
      </footer>
    </div>
  );
}

export default AppWithProviders;
