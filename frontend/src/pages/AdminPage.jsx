import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminUserList from '../components/AdminUserList';

/**
 * Admin page component that displays admin features
 * Only accessible to users with admin role
 */
function AdminPage() {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if user is not an admin
  if (!loading && user && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      ) : (
        <div className="admin-sections">
          <section className="admin-section">
            <h2>User Management</h2>
            <AdminUserList />
          </section>
          
          {/* Additional admin sections can be added here */}
          {/* <section className="admin-section">
            <h2>Other Admin Feature</h2>
            <p>This is a placeholder for other admin features.</p>
          </section> */}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
