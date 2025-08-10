import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  MessageSquare,
  Bot,
  User,
  Send as SendIcon
} from 'lucide-react';
import { chatBotApi } from '../../Utils/Services/api';


const ChatBot = observer(() => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  
  // Helper function to handle sending the message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    chatBotApi("/chatbot/chat",userMessage).then((responses)=>{
      setIsLoading(false);
      let {response} = responses?.data;
       const botMessage = { role: 'bot', content: response };
      setMessages(prev => [...prev, botMessage]);
    }).catch (error=>{
      const errorMessage = { role: 'bot', content: 'There was an error processing your request.' };
      setMessages(prev => [...prev, errorMessage]);
      console.error(error);
    })
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        p: 2,
        fontFamily: 'sans-serif',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: '700px', height: '90vh', display: 'flex', flexDirection: 'column', borderRadius: 4, boxShadow: 3 }}>
        <CardHeader
          title="Chatbot"
          avatar={<MessageSquare size={24} />}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
          titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
        />
        <CardContent sx={{ flex: 1, p: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box
            ref={scrollRef}
            sx={{
              flex: 1,
              p: 2,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              backgroundColor: 'white',
            }}
          >
            {messages.length === 0 ? (
              <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center', mt: 'auto', mb: 'auto' }}>
                Start a conversation...
              </Typography>
            ) : (
              messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    gap: 1,
                  }}
                >
                  {msg.role === 'bot' && (
                    <Avatar sx={{ bgcolor: 'blue.100', color: 'blue.600' }}>
                      <Bot size={20} />
                    </Avatar>
                  )}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: '80%',
                      backgroundColor: msg.role === 'user' ? 'primary.main' : 'grey.200',
                      color: msg.role === 'user' ? 'white' : 'text.primary',
                      borderBottomLeftRadius: msg.role === 'user' ? 'inherit' : 0,
                      borderBottomRightRadius: msg.role === 'bot' ? 'inherit' : 0,
                      whiteSpace: "pre-line"
                    }}
                  >
                    {msg.content}
                  </Paper>
                  {msg.role === 'user' && (
                    <Avatar sx={{ bgcolor: 'blue.500', color: 'white' }}>
                      <User size={20} />
                    </Avatar>
                  )}
                </Box>
              ))
            )}
            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'blue.100', color: 'blue.600' }}>
                  <Bot size={20} />
                </Avatar>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    maxWidth: '80%',
                    backgroundColor: 'grey.200',
                    borderBottomLeftRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  <Typography>Typing...</Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </CardContent>
        <Box
          sx={{
            p: 2,
            backgroundColor: 'grey.50',
            borderTop: '1px solid',
            borderColor: 'grey.300',
            borderBottomLeftRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TextField
            multiline
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            sx={{ '& .MuiOutlinedInput-root': { pr: 0 }, flex: 1 }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            variant="contained"
            color="primary"
            sx={{ minWidth: '48px', height: '48px', borderRadius: '50%', p: 0 }}
          >
            <SendIcon sx={{ transform: 'rotate(-45deg)' }} />
          </Button>
        </Box>
      </Card>
    </Box>
  );
});

export default ChatBot;