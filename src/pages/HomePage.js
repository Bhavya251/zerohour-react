import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen theme-${theme}`} style={{ background: 'var(--bg-primary)' }}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="theme-toggle neumorphic-button"
        data-testid="theme-toggle-btn"
      >
        <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
      </button>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          
          {/* Logo/Brand Section */}
          <div className="neumorphic p-8 mb-8 fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="neumorphic-inset w-20 h-20 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-comments text-3xl" style={{ color: 'var(--color-blue)' }}></i>
              </div>
              <h1 className="text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Zero<span style={{ color: 'var(--color-blue)' }}>Hour</span>
              </h1>
            </div>
            
            <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
              Real-time communication at the speed of thought
            </p>
            
            <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Connect instantly with friends, colleagues, and communities through our 
              neumorphic-designed chat platform. Experience seamless conversations 
              with a beautiful, tactile interface.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl">
            <div className="neumorphic p-6 slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="neumorphic-inset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl" style={{ color: 'var(--color-blue)' }}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Real-time Messaging
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Instant message delivery with WebSocket technology
              </p>
            </div>

            <div className="neumorphic p-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="neumorphic-inset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl" style={{ color: 'var(--color-blue)' }}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Secure Authentication
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Advanced security with encrypted user sessions
              </p>
            </div>

            <div className="neumorphic p-6 slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="neumorphic-inset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-palette text-2xl" style={{ color: 'var(--color-blue)' }}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Neumorphic Design
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Beautiful, tactile interface with soft shadows
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="slide-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                className="neumorphic-button px-8 py-4 text-lg font-semibold"
                style={{ 
                  background: `linear-gradient(135deg, var(--color-blue), var(--color-light-blue))`,
                  color: 'white',
                  boxShadow: `6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light)`
                }}
                data-testid="get-started-btn"
              >
                <i className="fas fa-rocket mr-2"></i>
                Get Started
              </Button>
            </Link>
            
            <Link to="/login" className="slide-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                className="neumorphic-button px-8 py-4 text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
                data-testid="login-btn"
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Login
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md">
            <div className="text-center slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-blue)' }}>0ms</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Latency</div>
            </div>
            <div className="text-center slide-up" style={{ animationDelay: '0.7s' }}>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-blue)' }}>24/7</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uptime</div>
            </div>
            <div className="text-center slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="text-3xl font-bold" style={{ color: 'var(--color-blue)' }}>∞</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Messages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
