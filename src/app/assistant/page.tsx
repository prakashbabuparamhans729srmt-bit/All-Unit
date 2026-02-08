
'use client';

import React, { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, PlusSquare, Mic, Paperclip, ArrowUp, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { answerQuestion } from '@/ai/flows/answer-question-flow';

type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const AssistantPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [assistantInput, setAssistantInput] = useState('');
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);

  const handleAssistantSubmit = useCallback(async (text?: string) => {
    const currentInput = text || assistantInput;
    if (!currentInput.trim()) return;

    const userInput = currentInput;
    const userMessage: AssistantMessage = { role: 'user', content: userInput };

    const newMessages: AssistantMessage[] = [...assistantMessages, userMessage];
    setAssistantMessages(newMessages);
    setAssistantInput('');
    setIsAssistantLoading(true);

    try {
      const result = await answerQuestion({ question: userInput });
      const assistantMessage: AssistantMessage = { role: 'assistant', content: result.answer };
      setAssistantMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error("Assistant error:", error);
      toast({
        title: "Assistant Error",
        description: "Could not get a response from the assistant.",
        variant: "destructive",
      });
      setAssistantMessages(assistantMessages); // Revert on error
    } finally {
      setIsAssistantLoading(false);
    }
  }, [assistantInput, assistantMessages, toast]);

  const handleAttachment = () => {
    toast({ title: "Attachment is not implemented on this page." });
  };
  
  const startVoiceSearch = () => {
      toast({ title: "Voice search is not implemented on this page." });
  };
  
  const handleAssistantSearch = () => {
      if (assistantInput.trim()) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(assistantInput.trim())}`, '_blank');
      } else {
        toast({ title: "Nothing to search." });
      }
  };


  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex h-14 items-center gap-4 border-b bg-card px-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="flex-1 text-lg font-semibold">Assistant</h1>
        <Button variant="ghost" size="icon" onClick={() => {
            setAssistantMessages([]);
            toast({ title: "New chat started." });
        }}>
            <PlusSquare className="w-5 h-5 text-muted-foreground" />
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <ScrollArea className="flex-1 pr-4 scrollbar-hide">
          <div className="space-y-4">
            {assistantMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center h-full pt-20">
                <Sparkles className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-light text-muted-foreground/80">Assistant</h2>
                <p className="text-base font-light text-muted-foreground mt-2">How can I help you?</p>
              </div>
            ) : (
              assistantMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : ''
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback><Sparkles /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm font-light ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="https://picsum.photos/seed/prakashbabu/100/100" alt="User avatar" />
                      <AvatarFallback>PB</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
            {isAssistantLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback><Sparkles /></AvatarFallback>
                </Avatar>
                <div className="bg-secondary rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-0"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-2 bg-background/70 rounded-lg mt-auto border">
          <Textarea
            placeholder="Ask anything..."
            className="bg-secondary border-none rounded-lg p-3 pr-4 h-auto min-h-[80px] resize-none text-sm font-light scrollbar-hide"
            value={assistantInput}
            onChange={(e) => setAssistantInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && assistantInput.trim()) {
                e.preventDefault();
                handleAssistantSubmit();
              }
            }}
            disabled={isAssistantLoading}
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={handleAssistantSearch}>
                <Globe className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleAttachment}>
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
              </Button>
              {assistantInput.trim() ? (
                <Button 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleAssistantSubmit()} 
                    disabled={isAssistantLoading}
                >
                    <ArrowUp className="w-5 h-5" />
                </Button>
              ) : (
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={startVoiceSearch}
                >
                    <Mic className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AssistantPage;
