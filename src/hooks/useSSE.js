import { useEffect, useRef, useState, useCallback } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const useSSE = (userId) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (!userId) {
      console.log('No userId provided, skipping SSE connection');
      return;
    }

    // Close existing connection if any
    if (eventSourceRef.current) {
      console.log('Closing existing SSE connection');
      eventSourceRef.current.close();
    }

    console.log('Connecting to SSE...', `${BACKEND_URL}/sse/${userId}`);
    
    try {
      const eventSource = new EventSource(`${BACKEND_URL}/sse/${userId}`);
      eventSourceRef.current = eventSource;

      eventSource.onopen = (e) => {
        console.log('SSE Connection opened', e);
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        console.log('SSE Raw message received:', event.data);
        try {
          const data = JSON.parse(event.data);
          console.log('SSE Parsed message:', data);
          
          if (data.type === 'connected') {
            console.log('SSE Connected confirmation for user:', data.user_id);
            setIsConnected(true);
          } else if (data.type === 'message') {
            console.log('New message received:', data);
            setMessages(prev => {
              // Avoid duplicates
              const exists = prev.some(msg => msg.message_id === data.message_id);
              if (exists) {
                console.log('Message already exists, skipping');
                return prev;
              }
              console.log('Adding new message to state');
              return [...prev, data];
            });
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error, event.data);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        console.log('EventSource readyState:', eventSource.readyState);
        
        // readyState: 0 = CONNECTING, 1 = OPEN, 2 = CLOSED
        if (eventSource.readyState === 2) {
          console.log('SSE Connection closed');
          setIsConnected(false);
          
          // Attempt to reconnect after 3 seconds
          console.log('Scheduling reconnection in 3 seconds...');
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect SSE...');
            connect();
          }, 3000);
        }
      };
    } catch (error) {
      console.error('Error creating EventSource:', error);
      setIsConnected(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      connect();
    }

    return () => {
      console.log('Cleaning up SSE connection');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [userId, connect]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isConnected, clearMessages };
};
