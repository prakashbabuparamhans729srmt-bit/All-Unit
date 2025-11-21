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
  Search,
  Mic,
  Camera,
  Sparkles,
  Book,
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

const DEFAULT_URL = "about:newtab";

const shortcuts = [
    { name: "Tools < utru.in...", icon: 'U', color: 'bg-green-500' },
    { name: "utru", icon: 'U', color: 'bg-blue-500'  },
    { name: "https://utru.c...", icon: 'U', color: 'bg-green-500'  },
    { name: "chatgpt", icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-500' },
    { name: "deesheek", icon: <Sparkles className="w-5 h-5" />, color: 'bg-blue-500' },
    { name: "Canvas", icon: 'C', color: 'bg-cyan-500' },
    { name: "IDX Firebase", icon: <Sparkles className="w-5 h-5" />, color: 'bg-orange-500' },
    { name: "google admob", icon: 'A', color: 'bg-yellow-500' },
    { name: "flutter full co...", icon: <Book className="w-5 h-5" />, color: 'bg-red-500' },
    { name: "Flip Book", icon: <Book className="w-5 h-5" />, color: 'bg-sky-500' },
  ];

export default function BrowserPage() {
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [currentTitle, setCurrentTitle] = useState("New Tab");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentUrl = history[currentIndex];

  useEffect(() => {
    if (currentUrl === DEFAULT_URL) {
      setInputValue("");
      setCurrentTitle("New Tab");
      setIsLoading(false);
    } else {
      setInputValue(currentUrl);
      setIsLoading(true);
    }
  }, [currentUrl]);

  const handleNavigation = (url: string) => {
    let newUrl = url.trim();
    if (!newUrl) return;

    if (!/^(https?:\/\/|about:)/i.test(newUrl)) {
      newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}`;
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
        const title = iframeRef.current.contentWindow.document.title;
        setCurrentTitle(title || "Untitled");

        const realUrl = iframeRef.current.contentWindow.location.href;
         if (realUrl !== 'about:blank' && realUrl !== currentUrl) {
            const newHistory = [...history];
            newHistory[currentIndex] = realUrl;
            setHistory(newHistory);
            setInputValue(realUrl);
        }
      }
    } catch (error) {
      console.warn("Could not access iframe content due to cross-origin restrictions:", error);
      setCurrentTitle("Page");
    }
  };
  
  const NewTabPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-8xl font-bold mb-8" style={{fontFamily: 'Google Sans, sans-serif'}}>Google</h1>
        <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
                type="text"
                placeholder="Search Google or type a URL"
                className="w-full h-12 pl-12 pr-32 rounded-full bg-secondary border-none focus-visible:ring-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8"><Mic className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8"><Camera className="w-5 h-5" /></Button>
                <Button variant="outline" size="sm" className="rounded-full">
                    <Sparkles className="w-4 h-4 mr-2"/>
                    AI Mode
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-x-8 gap-y-4 mt-8">
            {shortcuts.map(shortcut => (
                <div key={shortcut.name} className="flex flex-col items-center gap-2 text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl ${shortcut.color}`}>
                        {typeof shortcut.icon === 'string' ? shortcut.icon : shortcut.icon}
                    </div>
                    <span className="text-xs truncate w-20">{shortcut.name}</span>
                </div>
            ))}
        </div>
    </div>
  )

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
          <div className="flex items-center bg-secondary focus-within:bg-card focus-within:shadow-md transition-all rounded-full w-full px-4 py-1.5 text-sm">
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
              <Star className="w-5 h-5 text-muted-foreground hover:text-yellow-400" />
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
                 item !== DEFAULT_URL && <DropdownMenuItem key={`${item}-${index}`} onSelect={() => setCurrentIndex(history.length - 1 - index)}>
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
        {currentUrl === DEFAULT_URL ? (
            <NewTabPage />
        ) : (
            <iframe
            ref={iframeRef}
            src={currentUrl}
            onLoad={handleIframeLoad}
            className="w-full h-full border-0"
            title="Browser Content"
            sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts"
            />
        )}
      </main>
    </div>
  );
}
