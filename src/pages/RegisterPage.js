import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const RegisterPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile_no: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
    security_phrase: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile_no)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    const registerData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_no: formData.mobile_no,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      security_phrase: formData.security_phrase
    };

    const result = await register(registerData);
    
    if (result.success) {
      toast.success('Registration successful! Welcome to ZeroHour!');
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

      <div className="w-full max-w-2xl">
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
            Join ZeroHour
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Create your account and start chatting instantly
          </p>
        </div>

        {/* Registration Form */}
        <div className="neumorphic p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  First Name
                </label>
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className="neumorphic-input"
                  required
                  data-testid="first-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Last Name
                </label>
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className="neumorphic-input"
                  required
                  data-testid="last-name-input"
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                  className="neumorphic-input"
                  required
                  data-testid="mobile-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="neumorphic-input"
                  required
                  data-testid="email-input"
                />
              </div>
            </div>

            {/* Credentials */}
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
                placeholder="Choose a unique username"
                className="neumorphic-input"
                required
                data-testid="username-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="At least 6 characters"
                  className="neumorphic-input"
                  required
                  data-testid="password-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" 
                       style={{ color: 'var(--text-primary)' }}>
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="neumorphic-input"
                  required
                  data-testid="confirm-password-input"
                />
              </div>
            </div>

            {/* Security Phrase */}
            <div>
              <label className="block text-sm font-medium mb-2" 
                     style={{ color: 'var(--text-primary)' }}>
                Security Phrase
              </label>
              <Input
                type="text"
                name="security_phrase"
                value={formData.security_phrase}
                onChange={handleInputChange}
                placeholder="A memorable phrase for account recovery"
                className="neumorphic-input"
                required
                data-testid="security-phrase-input"
              />
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                This will be used for account recovery. Make it memorable but secure.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full neumorphic-button py-3 text-lg font-semibold"
              style={{ 
                background: `linear-gradient(135deg, var(--color-blue), var(--color-light-blue))`,
                color: 'white'
              }}
              data-testid="register-submit-btn"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating Account<span className="loading-dots"></span>
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus mr-2"></i>
                  Create Account
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

          {/* Login Link */}
          <div className="text-center">
            <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
            <Link 
              to="/login" 
              className="font-semibold hover:underline"
              style={{ color: 'var(--color-blue)' }}
              data-testid="login-link"
            >
              Sign in
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

export default RegisterPage;
