"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Home,
  Lock,
  Star,
  MoreVertical,
  History as HistoryIcon,
  Plus,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const DEFAULT_URL = "https://www.google.com/webhp?igu=1";

export default function BrowserPage() {
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState(history[currentIndex]);
  const [currentTitle, setCurrentTitle] = useState("New Tab");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUrl = history[currentIndex];

  useEffect(() => {
    setInputValue(currentUrl);
    setIsLoading(true);
  }, [currentUrl]);

  const handleNavigation = (url: string) => {
    let newUrl = url.trim();
    if (!newUrl) return;

    if (!/^https?:\/\//i.test(newUrl)) {
      newUrl = `https://${newUrl}`;
    }

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const reload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };
  
  const goHome = () => {
    handleNavigation(DEFAULT_URL);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNavigation(inputValue);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    try {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        setCurrentTitle(iframeRef.current.contentWindow.document.title || "Untitled");
        const realUrl = iframeRef.current.contentWindow.location.href;
         if (realUrl !== 'about:blank' && realUrl !== currentUrl) {
            // Update URL if redirected, without adding a new history entry for it
            const newHistory = [...history];
            newHistory[currentIndex] = realUrl;
            setHistory(newHistory);
            setInputValue(realUrl);
        }
      }
    } catch (error) {
      // Cross-origin error is expected
      console.warn("Could not access iframe content due to cross-origin restrictions:", error);
      setCurrentTitle("Page");
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-secondary text-foreground overflow-hidden">
      <header className="flex-shrink-0">
        <div className="flex items-end pt-2 px-2">
          {/* Active Tab */}
          <div className="relative flex items-center bg-card text-sm font-medium h-10 px-4 rounded-t-lg z-10 -mb-px border border-b-0 border-border">
            <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="truncate max-w-[200px] sm:max-w-xs">{isLoading ? "Loading..." : currentTitle}</span>
          </div>
          {/* New Tab Button */}
          <Button variant="ghost" size="icon" className="h-9 w-9 ml-1">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Card className="flex items-center gap-1 p-2 rounded-b-lg rounded-t-none border-t-border">
          <Button variant="ghost" size="icon" onClick={goBack} disabled={currentIndex === 0}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goForward} disabled={currentIndex >= history.length - 1}>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={reload}>
            {isLoading ? <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div> : <RefreshCw className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={goHome}>
            <Home className="w-5 h-5" />
          </Button>
          <div className="flex items-center bg-background/50 focus-within:bg-card focus-within:shadow-md transition-all rounded-full w-full px-4 py-1.5 text-sm">
            <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="bg-transparent border-none h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search Google or type a URL"
            />
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Star className="w-5 h-5 text-muted-foreground hover:text-primary" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <HistoryIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>History</DropdownMenuItem>
              <Separator />
              {history.slice(0).reverse().map((item, index) => (
                <DropdownMenuItem key={`${item}-${index}`} onSelect={() => setCurrentIndex(history.length - 1 - index)}>
                   <p className="max-w-xs truncate">{item}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </Card>
      </header>
      <main className="flex-1 bg-card m-2 mt-0 mb-0 rounded-t-lg overflow-hidden">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          onLoad={handleIframeLoad}
          className="w-full h-full border-0"
          title="Browser Content"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts"
        />
      </main>
    </div>
  );
}
