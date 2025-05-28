import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllUsers } from '../api/apiClient';
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
    return <div className="loading-users">Loading users...</div>;
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
      <h2>All Users</h2>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user._id}>
                <td>{user.id || user._id}</td>
                <td>{user.name || 'N/A'}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString() 
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUserList;
