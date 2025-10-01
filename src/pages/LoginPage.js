import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className={`min-h-screen theme-${theme} flex items-center justify-center p-4`} 
         style={{ background: 'var(--bg-primary)' }}>
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="theme-toggle neumorphic-button"
        data-testid="theme-toggle-btn"
      >
        <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="neumorphic-inset w-16 h-16 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-comments text-2xl" style={{ color: 'var(--color-blue)' }}></i>
            </div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Zero<span style={{ color: 'var(--color-blue)' }}>Hour</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Welcome Back
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Sign in to continue your conversations
          </p>
        </div>

        {/* Login Form */}
        <div className="neumorphic p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" 
                     style={{ color: 'var(--text-primary)' }}>
                Username
              </label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className="neumorphic-input"
                required
                data-testid="username-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" 
                     style={{ color: 'var(--text-primary)' }}>
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="neumorphic-input"
                required
                data-testid="password-input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full neumorphic-button py-3 text-lg font-semibold"
              style={{ 
                background: `linear-gradient(135deg, var(--color-blue), var(--color-light-blue))`,
                color: 'white'
              }}
              data-testid="login-submit-btn"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Signing In<span className="loading-dots"></span>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px" style={{ background: 'var(--text-secondary)', opacity: 0.3 }}></div>
            <span className="px-4 text-sm" style={{ color: 'var(--text-secondary)' }}>or</span>
            <div className="flex-1 h-px" style={{ background: 'var(--text-secondary)', opacity: 0.3 }}></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
            <Link 
              to="/register" 
              className="font-semibold hover:underline"
              style={{ color: 'var(--color-blue)' }}
              data-testid="register-link"
            >
              Create one
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm hover:underline"
            style={{ color: 'var(--text-secondary)' }}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
