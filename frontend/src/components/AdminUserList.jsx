import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers, updateUserRole } from '../api/apiClient';
import './AdminUserList.css';

/**
 * Component to display a list of all users
 * Only accessible to admin users
 */
function AdminUserList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleUpdateLoading, setRoleUpdateLoading] = useState(null); // ID of the user being updated

  useEffect(() => {
    // Only fetch users if the current user is an admin
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  /**
   * Fetch all users from the backend
   */
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers();
      // The API might return users directly or nested in a property
      const userData = response.users || response;
      setUsers(Array.isArray(userData) ? userData : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users list');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Handle role update for a user
   * @param {string} userId - ID of the user to update
   * @param {string} currentRole - Current role of the user
   */
  const handleRoleUpdate = async (userId, currentRole) => {
    // Prevent updating the current admin's role (self-demotion protection)
    if (userId === user.id || userId === user._id) {
      alert("Vous ne pouvez pas modifier votre propre rôle.");
      return;
    }
    
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmMessage = currentRole === 'admin' 
      ? `Êtes-vous sûr de vouloir rétrograder cet utilisateur au rôle 'user' ?`
      : `Êtes-vous sûr de vouloir promouvoir cet utilisateur au rôle 'admin' ?`;
    
    if (window.confirm(confirmMessage)) {
      setRoleUpdateLoading(userId);
      try {
        await updateUserRole(userId, newRole);
        
        // Update local state to reflect the change
        setUsers(users.map(u => {
          if ((u.id === userId) || (u._id === userId)) {
            return { ...u, role: newRole };
          }
          return u;
        }));
        
      } catch (err) {
        console.error('Error updating user role:', err);
        alert(`Erreur lors de la mise à jour du rôle: ${err.message}`);
      } finally {
        setRoleUpdateLoading(null);
      }
    }
  };

  // If the user is not an admin, show access denied message
  if (!user || user.role !== 'admin') {
    return (
      <div className="access-denied">
        <h3>Access Denied</h3>
        <p>You need admin privileges to view this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-users">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return (
      <div className="error-users">
        <p>{error}</p>
        <button onClick={fetchUsers}>Try Again</button>
      </div>
    );
  }

  if (users.length === 0) {
    return <div className="no-users">No users found.</div>;
  }

  return (
    <div className="admin-user-list">
      <h2>Gestion des utilisateurs</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userItem) => {
              const userId = userItem.id || userItem._id;
              const isCurrentUser = userId === (user?.id || user?._id);
              return (
                <tr key={userId} className={isCurrentUser ? 'current-user' : ''}>
                  <td>{userId}</td>
                  <td>
                    {userItem.name || 'N/A'}
                    {isCurrentUser && <span className="current-user-badge">Vous</span>}
                  </td>
                  <td>{userItem.email}</td>
                  <td>
                    <span className={`role-badge role-${userItem.role}`}>
                      {userItem.role === 'admin' ? (
                        <>
                          <span className="role-icon">👑</span> Admin
                        </>
                      ) : (
                        <>
                          <span className="role-icon">👤</span> Utilisateur
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    {userItem.createdAt 
                      ? new Date(userItem.createdAt).toLocaleDateString('fr-FR', { 
                          day: '2-digit', 
                          month: '2-digit',
                          year: 'numeric'
                        }) 
                      : 'N/A'}
                  </td>
                  <td>
                    <button 
                      className={`role-update-button ${userItem.role === 'admin' ? 'demote' : 'promote'}`}
                      onClick={() => handleRoleUpdate(userId, userItem.role)}
                      disabled={isCurrentUser || roleUpdateLoading === userId}
                    >
                      {roleUpdateLoading === userId ? (
                        <span className="button-loading">...</span>
                      ) : userItem.role === 'admin' ? (
                        'Rétrograder'
                      ) : (
                        'Promouvoir'
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUserList;
