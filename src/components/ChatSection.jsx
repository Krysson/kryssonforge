// src/components/ChatSection.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send } from 'lucide-react';

const ChatMessage = ({ sender, message }) => (
  <div className={`mb-4 ${sender === 'You' ? 'text-right' : 'text-left'}`}>
    <div
      className={`inline-block p-2 rounded-lg ${
        sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}>
      <p className='font-semibold'>{sender}</p>
      <p>{message}</p>
    </div>
  </div>
);

const ChatSection = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'You', message: newMessage }]);
      setNewMessage('');
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: 'Bot', message: 'Thank you for your message!' }
        ]);
      }, 1000);
    }
  };

  return (
    <Card className='w-full h-[500px] flex flex-col'>
      <CardHeader>
        <div className='flex items-center'>
          <MessageSquare className='mr-2' />
          <span className='font-semibold'>Chat</span>
        </div>
      </CardHeader>
      <CardContent className='flex-grow flex flex-col'>
        <ScrollArea className='flex-grow mb-4'>
          {chatMessages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))}
        </ScrollArea>
        <div className='flex'>
          <Input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder='Type a message...'
            className='flex-grow mr-2'
          />
          <Button onClick={sendMessage}>
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatSection;
