import UserProfile from '../components/UserProfile';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

/**
 * Profile page component that displays the user's profile information
 * Redirects to login if user is not authenticated
 */
function ProfilePage() {
  const { user } = useAuth();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="profile-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Votre Profil</h1>
      <UserProfile />
    </div>
  );
}

export default ProfilePage;
