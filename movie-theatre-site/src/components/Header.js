import React from "react";
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Header = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAuth({ isAuthenticated: false, user: null });
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header>
      <div className="mainHeaderDiv">
        <nav>
          <ul>
            <Link to="/" className="link">Home</Link>
            <Link to="/movielistings" className="link">Movies</Link>
            <Link to="/about" className="link">About</Link>
            <Link to="/contactus" className="link">Contact</Link>
          </ul>
        </nav>
        <div className="sign">
          {auth.isAuthenticated ? (
            <>
              <span>Welcome, {auth.user}</span> {/* Adjust if auth.user is an object */}
              <button onClick={handleSignOut} className="link">Sign Out</button>
              {/* Add My Profile button */}
              {auth.role !== 'admin' && <Link to="/profile" className="link">My Profile</Link>}
            </>
          ) : (
            <>
              <Link to="/login" className="link">Sign In</Link>
              <Link to="/signup" className="link">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;