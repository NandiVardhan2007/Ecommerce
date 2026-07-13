"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AiAPI, AuthAPI } from '@/lib/api';

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ type: 'ai' | 'user'; text: string }[]>([
    { type: 'ai', text: 'Hi there! I am your AI Shopping Assistant. Looking for anything specific today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Check if user is logged in
    const user = AuthAPI.getCurrentUser();
    if (!user) {
      setMessages(prev => [
        ...prev,
        { type: 'user', text: textToSend },
        { type: 'ai', text: 'Please sign in first to use the AI Shopping Assistant.' }
      ]);
      return;
    }

    setMessages(prev => [...prev, { type: 'user', text: textToSend }]);
    setIsLoading(true);
    setQuery('');

    try {
      const res = await AiAPI.askAssistant(textToSend);
      setMessages(prev => [...prev, { type: 'ai', text: res.message }]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      setMessages(prev => [
        ...prev,
        { type: 'ai', text: `Sorry, I encountered an error: ${err.message || 'Please try again later.'}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSendMessage(query);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="Open AI Assistant"
        >
          <Sparkles className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">AI Shopping Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-[350px] overflow-y-auto flex flex-col gap-4 bg-secondary/10">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-secondary' : 'bg-primary/10 text-primary'}`}>
                  {msg.type === 'user' ? <User className="w-4 h-4 text-muted-foreground" /> : <Sparkles className="w-4 h-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm whitespace-pre-line ${msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary rounded-tl-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 self-start max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl text-sm bg-secondary rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />

            {/* Quick Suggestions */}
            {!isLoading && (
              <div className="flex flex-wrap gap-2 mt-2">
                {['List store inventory', 'Recommend best product', 'Sony headphones details'].map(suggestion => (
                  <button 
                    key={suggestion} 
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-secondary transition-colors text-muted-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t bg-background">
            <form 
              onSubmit={handleSubmit} 
              className="flex items-center gap-2"
            >
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything..." 
                disabled={isLoading}
                className="flex-1 rounded-full bg-secondary border-none"
              />
              <Button type="submit" size="icon" disabled={isLoading} className="shrink-0 rounded-full h-10 w-10">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
          
        </div>
      )}
    </>
  );
}
