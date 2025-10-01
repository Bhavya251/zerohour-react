import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WS_URL = BACKEND_URL.replace('https://', 'wss://').replace('http://', 'ws://');

const ChatPage = () => {
  const { chatId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatInfo, setChatInfo] = useState(null);
  const [connected, setConnected] = useState(false);
  
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Connect to WebSocket
  const connectWebSocket = () => {
    if (!user?.user_id) return;
    
    const ws = new WebSocket(`${WS_URL}/ws/${user.user_id}`);
    wsRef.current = ws;
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
    };
    
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log('Received message:', messageData);
      
      // Only add message if it belongs to current chat
      if (messageData.chat_id === chatId) {
        setMessages(prev => {
          // Check if message already exists (avoid duplicates)
          const messageExists = prev.some(msg => msg.message_id === messageData.message_id);
          if (messageExists) return prev;
          
          const newMsg = {
            ...messageData,
            timestamp: new Date(messageData.timestamp),
            is_own_message: messageData.sender.user_id === user.user_id
          };
          return [...prev, newMsg];
        });
      }
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (user?.user_id) {
          connectWebSocket();
        }
      }, 3000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnected(false);
    };
  };

  // Fetch chat messages
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API}/chats/${chatId}/messages`);
      setMessages(response.data.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 403) {
        toast.error('You do not have access to this chat');
        navigate('/dashboard');
      } else {
        toast.error('Failed to load messages');
      }
    } finally {
      setLoading(false);
    }
  };

  // Get chat info from messages
  useEffect(() => {
    if (messages.length > 0) {
      const firstMessage = messages[0];
      const otherUser = firstMessage.sender.user_id !== user?.user_id 
        ? firstMessage.sender 
        : messages.find(m => m.sender.user_id !== user?.user_id)?.sender;
      
      if (otherUser) {
        setChatInfo({
          other_user: otherUser
        });
      }
    }
  }, [messages, user]);

  // Send message
  const sendMessage = () => {
    if (!newMessage.trim() || !wsRef.current || !connected) return;
    
    const messageData = {
      chat_id: chatId,
      content: newMessage.trim()
    };
    
    wsRef.current.send(JSON.stringify(messageData));
    setNewMessage('');
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Format message timestamp
  const formatMessageTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [user?.user_id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className={`min-h-screen theme-${theme} flex items-center justify-center`} 
           style={{ background: 'var(--bg-primary)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-${theme} flex flex-col`} style={{ background: 'var(--bg-primary)' }}>
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="theme-toggle neumorphic-button"
        data-testid="theme-toggle-btn"
      >
        <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
      </button>

      {/* Chat Header */}
      <div className="neumorphic m-4 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4">
              <Button className="neumorphic-button p-2" data-testid="back-to-dashboard-btn">
                <i className="fas fa-arrow-left" style={{ color: 'var(--text-primary)' }}></i>
              </Button>
            </Link>
            
            <div className="neumorphic-inset w-12 h-12 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-user text-xl" style={{ color: 'var(--color-blue)' }}></i>
            </div>
            
            <div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {chatInfo?.other_user ? 
                  `${chatInfo.other_user.first_name} ${chatInfo.other_user.last_name}` : 
                  'Loading...'
                }
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {chatInfo?.other_user ? `@${chatInfo.other_user.username}` : ''}
              </p>
            </div>
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center text-sm">
            <div className={`w-2 h-2 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span style={{ color: 'var(--text-secondary)' }}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 mx-4 mb-4 neumorphic-inset p-4 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2" data-testid="messages-container">
          {messages.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
              <i className="fas fa-comment text-4xl mb-4 opacity-50"></i>
              <div className="text-lg mb-2">No messages yet</div>
              <div>Start the conversation by sending a message below</div>
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.message_id}
                className={`flex ${message.is_own_message ? 'justify-end' : 'justify-start'}`}
                data-testid={`message-${message.message_id}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md px-4 py-2 ${
                    message.is_own_message ? 'message-sent' : 'message-received'
                  }`}
                >
                  <p className="mb-1">{message.content}</p>
                  <p className="text-xs opacity-75">
                    {formatMessageTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="flex-shrink-0 mt-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 neumorphic-input"
              disabled={!connected}
              data-testid="message-input"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim() || !connected}
              className="neumorphic-button px-6"
              style={{
                background: newMessage.trim() && connected ? 
                  `linear-gradient(135deg, var(--color-blue), var(--color-light-blue))` : 
                  'var(--bg-primary)',
                color: newMessage.trim() && connected ? 'white' : 'var(--text-secondary)'
              }}
              data-testid="send-message-btn"
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </div>
          
          {!connected && (
            <div className="text-center mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <i className="fas fa-exclamation-triangle mr-1"></i>
              Connecting to chat...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
