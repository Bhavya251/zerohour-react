# 🎨 ZeroHour Chat - Frontend

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-3.4.17-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Shadcn/UI-Latest-purple?style=for-the-badge" alt="Shadcn/UI">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</div>

## 📖 Overview

The ZeroHour Chat frontend is a modern React application featuring a stunning **Neumorphic UI design** with dark/light theme switching, real-time messaging capabilities, and responsive design optimized for all devices.

## ✨ Features

### 🎨 UI/UX Features
- **Neumorphic Design** - Soft, tactile interface with dual shadows
- **Dark/Light Themes** - Smooth theme switching with persistence
- **Responsive Layout** - Mobile-first design that scales beautifully
- **Micro-animations** - Subtle hover effects and transitions
- **Custom Components** - Built with Shadcn/UI component library

### 🚀 Functional Features
- **Real-time Messaging** - WebSocket integration for instant communication
- **User Authentication** - JWT-based secure authentication flow
- **User Search** - Find and connect with users by name/username
- **Chat Management** - Dashboard view with chat history and online status
- **Theme Persistence** - Remember user's theme preference

## 🏗️ Architecture

### Component Structure
```
src/
├── 📁 components/
│   └── ui/              # Shadcn/UI components
│       ├── button.jsx
│       ├── input.jsx
│       ├── dialog.jsx
│       └── ...         # 30+ pre-built components
├── 📁 contexts/
│   ├── AuthContext.js   # Authentication state management
│   └── ThemeContext.js  # Theme switching logic
├── 📁 pages/
│   ├── HomePage.js      # Landing page with features
│   ├── LoginPage.js     # User authentication
│   ├── RegisterPage.js  # User registration
│   ├── DashboardPage.js # Chat list and user search
│   └── ChatPage.js      # Real-time messaging interface
├── 📁 hooks/
│   └── use-toast.js     # Toast notification hook
├── App.js              # Main application component
├── App.css             # Global styles and neumorphic design
└── index.js            # Application entry point
```

### State Management
- **React Context** - Global state for authentication and theme
- **Local State** - Component-level state with useState/useEffect
- **Custom Hooks** - Reusable stateful logic

## 🚀 Quick Start

### Prerequisites
- Node.js 16 or higher
- Yarn package manager (recommended)
- Backend API running on port 8001

### Installation
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
yarn install

# Create environment file
cp .env.example .env

# Edit .env with your backend URL
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start development server
yarn start
```

### Available Scripts
```bash
# Development server with hot reload
yarn start

# Production build
yarn build

# Run tests
yarn test

# Lint code
yarn lint

# Format code
yarn format
```

## 🎨 Design System

### Color Palette
```css
/* ZeroHour Brand Colors */
:root {
  /* Primary Colors */
  --color-primary: #040508;
  --color-secondary: #212a36;
  --color-tertiary: #32425d;
  --color-accent: #1b2d4a;
  --color-blue: #2274d1;
  --color-light-blue: #b1c6f9;
  
  /* Light Theme */
  --bg-primary-light: #e0e0e0;
  --text-primary-light: #040508;
  --shadow-light-1: #ffffff;
  --shadow-dark-1: #bebebe;
  
  /* Dark Theme */
  --bg-primary-dark: #040508;
  --text-primary-dark: #b1c6f9;
  --shadow-light-dark: #0a0f15;
  --shadow-dark-dark: #000000;
}
```

### Typography
```css
/* Primary Font */
font-family: 'Space Grotesk', sans-serif;

/* Font Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-4xl: 2.25rem;   /* 36px */
--text-6xl: 3.75rem;   /* 60px */
```

### Neumorphic Components
```css
/* Elevated Element */
.neumorphic {
  background: var(--bg-primary);
  border-radius: 20px;
  box-shadow: 
    8px 8px 16px var(--shadow-dark),
    -8px -8px 16px var(--shadow-light);
}

/* Pressed/Inset Element */
.neumorphic-inset {
  background: var(--bg-primary);
  border-radius: 20px;
  box-shadow: 
    inset 8px 8px 16px var(--shadow-dark),
    inset -8px -8px 16px var(--shadow-light);
}

/* Interactive Button */
.neumorphic-button {
  background: var(--bg-primary);
  border-radius: 15px;
  box-shadow: 
    6px 6px 12px var(--shadow-dark),
    -6px -6px 12px var(--shadow-light);
  transition: all 0.2s ease;
}

.neumorphic-button:hover {
  transform: translateY(-1px);
  box-shadow: 
    8px 8px 16px var(--shadow-dark),
    -8px -8px 16px var(--shadow-light);
}

.neumorphic-button:active {
  transform: translateY(1px);
  box-shadow: 
    inset 4px 4px 8px var(--shadow-dark),
    inset -4px -4px 8px var(--shadow-light);
}
```

## 🔧 Configuration

### Environment Variables
```bash
# .env file
REACT_APP_BACKEND_URL=http://localhost:8001  # Backend API URL
WDS_SOCKET_PORT=443                          # WebSocket port (production)
```

### Build Configuration
```javascript
// package.json scripts
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}

// craco.config.js - Custom webpack configuration
module.exports = {
  // Custom build configurations
};
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.5.1",
  "axios": "^1.8.4"
}
```

### UI Dependencies
```json
{
  "@radix-ui/react-*": "latest",
  "lucide-react": "^0.507.0",
  "tailwindcss": "^3.4.17",
  "tailwindcss-animate": "^1.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.2.0"
}
```

### Form & Validation
```json
{
  "react-hook-form": "^7.56.2",
  "@hookform/resolvers": "^5.0.1",
  "zod": "^3.24.4"
}
```

## 📱 Pages & Components

### Pages

#### HomePage.js
- **Purpose**: Landing page with feature highlights
- **Features**: Hero section, feature grid, call-to-action buttons
- **Design**: Full-screen layout with animated elements

#### LoginPage.js
- **Purpose**: User authentication
- **Features**: Username/password form, validation, error handling
- **Design**: Centered card layout with neumorphic styling

#### RegisterPage.js
- **Purpose**: New user registration
- **Features**: Complete form with all required fields, validation
- **Design**: Multi-column layout with organized field groups

#### DashboardPage.js
- **Purpose**: Main application dashboard
- **Features**: Chat list, new chat creation, user search
- **Design**: Header with actions, scrollable chat list

#### ChatPage.js
- **Purpose**: Real-time messaging interface
- **Features**: Message history, real-time messaging, WebSocket status
- **Design**: Chat header, scrollable messages, fixed input area

### Key Components

#### ThemeContext.js
```javascript
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  // Theme persistence and CSS class management
};
```

#### AuthContext.js
```javascript
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (username, password) => { /* JWT authentication */ };
  const register = async (userData) => { /* User registration */ };
  const logout = async () => { /* Clear session */ };
};
```

## 🔌 API Integration

### HTTP Client Setup
```javascript
// axios configuration
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Automatic token attachment
useEffect(() => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}, [token]);
```

### WebSocket Integration
```javascript
// WebSocket connection
const connectWebSocket = () => {
  const ws = new WebSocket(`${WS_URL}/ws/${user.user_id}`);
  
  ws.onopen = () => setConnected(true);
  ws.onmessage = (event) => {
    const messageData = JSON.parse(event.data);
    // Handle incoming messages
  };
  ws.onclose = () => {
    setConnected(false);
    // Reconnection logic
  };
};
```

### API Endpoints Usage
```javascript
// Authentication
const login = await axios.post(`${API}/auth/login`, { username, password });
const register = await axios.post(`${API}/auth/register`, userData);

// User management
const users = await axios.get(`${API}/users/search?query=${query}`);

// Chat operations
const chats = await axios.get(`${API}/chats`);
const chat = await axios.post(`${API}/chats/create?other_user_id=${userId}`);
const messages = await axios.get(`${API}/chats/${chatId}/messages`);
```

## 🎯 User Experience

### Navigation Flow
1. **Landing** → Register/Login
2. **Authentication** → Dashboard
3. **Dashboard** → Search users → Start chat
4. **Chat** → Real-time messaging

### Theme Switching
- **Toggle Button**: Sun/Moon icon in top-right corner
- **Persistence**: Theme preference saved to localStorage
- **Smooth Transition**: CSS transitions for theme changes
- **System Preference**: Respects user's system theme by default

### Responsive Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## 🚀 Performance Optimizations

### Code Splitting
```javascript
// Lazy loading pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Suspense wrapper
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/login" element={<LoginPage />} />
  </Routes>
</Suspense>
```

### Image Optimization
```javascript
// Optimized image loading
<img 
  src={imageUrl} 
  alt="Description"
  loading="lazy"
  className="w-full h-auto"
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
yarn build
npx webpack-bundle-analyzer build/static/js/*.js
```

## 🧪 Testing

### Component Testing
```javascript
// Example test setup
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../contexts/ThemeContext';
import HomePage from '../pages/HomePage';

test('renders homepage with theme toggle', () => {
  render(
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
  
  expect(screen.getByTestId('theme-toggle-btn')).toBeInTheDocument();
});
```


## 🚢 Deployment

### Build for Production
```bash
# Create optimized production build
yarn build

# Serve locally to test
npx serve -s build
```

### Environment Setup
```bash
# Production environment variables
REACT_APP_BACKEND_URL=https://api.yourapp.com
REACT_APP_WS_URL=wss://api.yourapp.com
```

### Deployment Platforms

**Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**AWS S3 + CloudFront**
```bash
# Upload build folder to S3
aws s3 sync build/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

## 🐛 Troubleshooting

### Common Issues

**Theme Not Persisting**
```javascript
// Check localStorage implementation
localStorage.setItem('zerohour-theme', theme);
const savedTheme = localStorage.getItem('zerohour-theme');
```

**WebSocket Connection Fails**
```javascript
// Check WebSocket URL format
const WS_URL = BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://');
```

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install

# Check for TypeScript errors
yarn tsc --noEmit
```

## 📚 Additional Resources

- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Shadcn/UI**: https://ui.shadcn.com
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes with proper styling
3. Test on multiple devices/browsers
4. Ensure neumorphic design consistency
5. Submit pull request

### Code Style Guidelines
- Use functional components with hooks
- Follow existing naming conventions
- Maintain neumorphic design principles
- Add proper data-testid attributes
- Include responsive design considerations

---

<div align="center">
  <strong>Beautiful React Frontend for ZeroHour Chat</strong>
  <br>
  <sub>Neumorphic design meets modern React development</sub>
</div>