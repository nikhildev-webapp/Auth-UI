import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">AuthApp</div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-card welcome-card">
          <h1>Welcome, {user?.username}! 👋</h1>
          <p>You have successfully logged in to your account.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h2>Profile</h2>
            <p>View and manage your profile information</p>
            <a href="#" className="card-button">
              View Profile
            </a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🔒</div>
            <h2>Security</h2>
            <p>Manage your password and security settings</p>
            <a href="#" className="card-button">
              Change Password
            </a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h2>Settings</h2>
            <p>Customize your account preferences</p>
            <a href="#" className="card-button">
              Go to Settings
            </a>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎨</div>
            <h2>Preferences</h2>
            <p>Adjust your display and notification settings</p>
            <a href="#" className="card-button">
              Preferences
            </a>
          </div>
        </div>

        <div className="user-info">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Username</label>
              <p>{user?.username}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>User ID</label>
              <p>{user?.id}</p>
            </div>
            <div className="info-item">
              <label>Account Status</label>
              <p className="status-active">Active</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
