import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const DashboardPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);

  // Fetch user chats
  const fetchChats = async () => {
    try {
      const response = await axios.get(`${API}/chats`);
      setChats(response.data);
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  // Search users
  const searchUsers = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setSearching(true);
    try {
      const response = await axios.get(`${API}/users/search?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setSearching(false);
    }
  };

  // Create new chat
  const createChat = async (otherUserId) => {
    try {
      const response = await axios.post(`${API}/chats/create?other_user_id=${otherUserId}`);
      const newChat = response.data;
      
      // Check if this chat already exists in the list
      const existingChatIndex = chats.findIndex(chat => chat.chat_id === newChat.chat_id);
      if (existingChatIndex === -1) {
        // Add the new chat to the list and enhance it with user info
        const otherUser = searchResults.find(user => user.user_id === otherUserId);
        const enhancedChat = {
          ...newChat,
          other_user: otherUser,
          last_message: null,
          last_message_time: null
        };
        setChats(prev => [enhancedChat, ...prev]);
      }
      
      setShowNewChatDialog(false);
      setSearchQuery('');
      setSearchResults([]);
      
      // Navigate to the chat
      navigate(`/chat/${newChat.chat_id}`);
      toast.success('Chat started!');
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('Failed to create chat');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUsers(searchQuery);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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

      {/* Header */}
      <div className="neumorphic mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="neumorphic-inset w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-comments text-xl" style={{ color: 'var(--color-blue)' }}></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Zero<span style={{ color: 'var(--color-blue)' }}>Hour</span>
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Welcome back, {user?.first_name}!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
              <DialogTrigger asChild>
                <Button 
                  className="neumorphic-button px-4 py-2"
                  style={{ 
                    background: `linear-gradient(135deg, var(--color-blue), var(--color-light-blue))`,
                    color: 'white'
                  }}
                  data-testid="new-chat-btn"
                >
                  <i className="fas fa-plus mr-2"></i>
                  New Chat
                </Button>
              </DialogTrigger>
              
              <DialogContent className="neumorphic border-0" style={{ background: 'var(--bg-primary)' }}>
                <DialogHeader>
                  <DialogTitle style={{ color: 'var(--text-primary)' }}>Start New Chat</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Search users by name or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="neumorphic-input"
                    data-testid="search-users-input"
                  />
                  
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {searching ? (
                      <div className="text-center py-4" style={{ color: 'var(--text-secondary)' }}>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Searching...
                      </div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <div 
                          key={user.user_id} 
                          className="neumorphic-inset p-3 flex items-center justify-between cursor-pointer hover:opacity-80"
                          onClick={() => createChat(user.user_id)}
                          data-testid={`user-result-${user.username}`}
                        >
                          <div className="flex items-center">
                            <div className="neumorphic-inset w-10 h-10 rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-user" style={{ color: 'var(--color-blue)' }}></i>
                            </div>
                            <div>
                              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                @{user.username}
                                {user.is_online && (
                                  <span className="ml-2">
                                    <i className="fas fa-circle text-green-500 text-xs"></i> Online
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <i className="fas fa-comment-plus" style={{ color: 'var(--color-blue)' }}></i>
                        </div>
                      ))
                    ) : searchQuery ? (
                      <div className="text-center py-4" style={{ color: 'var(--text-secondary)' }}>
                        No users found
                      </div>
                    ) : (
                      <div className="text-center py-4" style={{ color: 'var(--text-secondary)' }}>
                        Start typing to search for users
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button 
              onClick={handleLogout}
              className="neumorphic-button px-4 py-2"
              style={{ color: 'var(--text-primary)' }}
              data-testid="logout-btn"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="p-4">
        <div className="neumorphic p-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            <i className="fas fa-comments mr-2"></i>
            Your Chats
          </h2>
          
          {loading ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
              <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
              <div>Loading your chats...</div>
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
              <i className="fas fa-comment-slash text-4xl mb-4 opacity-50"></i>
              <div className="text-lg mb-2">No chats yet</div>
              <div>Start a new conversation by clicking the "New Chat" button above</div>
            </div>
          ) : (
            <div className="space-y-3">
              {chats.map((chat) => (
                <Link 
                  key={chat.chat_id} 
                  to={`/chat/${chat.chat_id}`}
                  className="block"
                  data-testid={`chat-item-${chat.chat_id}`}
                >
                  <div className="neumorphic-inset p-4 hover:opacity-80 transition-opacity">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="neumorphic-inset w-12 h-12 rounded-full flex items-center justify-center mr-4">
                          <i className="fas fa-user text-xl" style={{ color: 'var(--color-blue)' }}></i>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                              {chat.other_user.first_name} {chat.other_user.last_name}
                            </h3>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                              {formatTime(chat.last_message_time)}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                              @{chat.other_user.username}
                              {chat.other_user.is_online && (
                                <span className="ml-2">
                                  <i className="fas fa-circle text-green-500 text-xs"></i>
                                </span>
                              )}
                            </p>
                          </div>
                          
                          {chat.last_message && (
                            <p className="text-sm mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                              {chat.last_message}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <i className="fas fa-chevron-right ml-4" style={{ color: 'var(--color-blue)' }}></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
