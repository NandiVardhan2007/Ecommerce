'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { AiAPI, AuthAPI } from '@/lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function AIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm the Vendora AI Assistant. What kind of products are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const user = AuthAPI.getCurrentUser();
    if (!user) {
      toast.error('Please sign in to use the AI Shopping Assistant');
      router.push('/login');
    }
  }, [router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Send context of past messages if needed, but backend currently just takes `message`
      const res = await AiAPI.askAssistant(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: res.message }]);
    } catch (err: any) {
      console.error('AI error:', err);
      toast.error(err.message || 'Failed to get a response from AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-8rem)] flex flex-col">
      
      <div className="flex items-center gap-3 mb-6 bg-secondary/30 p-4 rounded-2xl border">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Vendora AI Shopping Assistant</h1>
          <p className="text-sm text-muted-foreground">Powered by Claude 3 Haiku</p>
        </div>
      </div>

      <div className="flex-1 bg-card border rounded-3xl p-6 flex flex-col overflow-hidden shadow-sm">
        
        <div className="flex-1 overflow-y-auto pr-4 flex flex-col gap-6 custom-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-secondary text-foreground rounded-tl-sm'
              }`}>
                {/* Render simple markdown bolding for the AI */}
                {msg.content.split('\n').map((line, j) => (
                   <p key={j} className="mb-2 last:mb-0">
                     {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, k) => {
                       if (part.startsWith('**') && part.endsWith('**')) {
                         return <strong key={k}>{part.slice(2, -2)}</strong>;
                       }
                       if (part.startsWith('*') && part.endsWith('*')) {
                         return <em key={k}>{part.slice(1, -1)}</em>;
                       }
                       return part;
                     })}
                   </p>
                ))}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-5 py-3.5 text-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin text-primary" /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="mt-6 flex items-center gap-2 relative">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our products (e.g., 'Do you have wireless headphones?')"
            className="flex-1 h-14 rounded-full pl-6 pr-14 text-base bg-background shadow-inner"
            disabled={loading}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || loading}
            className="absolute right-2 h-10 w-10 rounded-full shadow-sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>

      </div>
    </div>
  );
}
