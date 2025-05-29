import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

/**
 * UserProfile component displays detailed information about the logged-in user
 * It fetches user data on mount if not already loaded
 */
function UserProfile() {
  const { user, loading, error, refreshUserProfile } = useAuth();

  useEffect(() => {
    // If no user data is loaded yet, trigger a refresh
    if (!user && !loading && !error) {
      refreshUserProfile();
    }
  }, [user, loading, error, refreshUserProfile]);

  if (loading) {
    return <div className="user-profile loading">Chargement du profil utilisateur...</div>;
  }

  if (error) {
    return (
      <div className="user-profile error">
        <p>Error loading profile: {error}</p>
        <button onClick={refreshUserProfile}>Try Again</button>
      </div>
    );
  }

  if (!user) {
    return <div className="user-profile not-logged-in">You are not logged in</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-field">
          <span className="field-label">Name:</span>
          <span className="field-value">{user.name || 'N/A'}</span>
        </div>
        <div className="profile-field">
          <span className="field-label">Email:</span>
          <span className="field-value">{user.email || 'N/A'}</span>
        </div>
        {user.role && (
          <div className="profile-field">
            <span className="field-label">Role:</span>
            <span className="field-value">{user.role}</span>
          </div>
        )}
        {user.createdAt && (
          <div className="profile-field">
            <span className="field-label">Member since:</span>
            <span className="field-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
