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
  X,
  FilePlus,
  PlusSquare,
  ShieldOff,
  KeyRound,
  Download,
  Bookmark,
  PanelsTopLeft,
  Trash2,
  ZoomIn,
  ZoomOut,
  Printer,
  Languages,
  Cast,
  Settings,
  HelpCircle,
  LogOut,
  Minus,
  RectangleHorizontal,
  Sun,
  Moon,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

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

type Tab = {
  id: string;
  history: string[];
  currentIndex: number;
  title: string;
  isLoading: boolean;
};

export default function BrowserPage() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "tab-1",
      history: [DEFAULT_URL],
      currentIndex: 0,
      title: "New Tab",
      isLoading: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState("tab-1");
  const [inputValue, setInputValue] = useState("");
  const [theme, setTheme] = useState('dark');
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const { toast } = useToast();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
        setTheme('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
        setTheme('light');
    }
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const currentUrl = activeTab?.history[activeTab.currentIndex] || DEFAULT_URL;
  
  useEffect(() => {
    if (activeTab) {
      const newUrl = activeTab.history[activeTab.currentIndex];
      if (newUrl === DEFAULT_URL) {
        setInputValue("");
      } else {
        setInputValue(newUrl);
      }
    }
  }, [activeTab]);


  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab))
    );
  };
  
  const handleNavigation = (tabId: string, url: string) => {
    let newUrl = url.trim();
    if (!newUrl) return;

    if (!/^(https?:\/\/|about:)/i.test(newUrl)) {
      newUrl = `https://www.google.com/search?q=${encodeURIComponent(newUrl)}`;
    }
    
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;
    
    const newHistory = tab.history.slice(0, tab.currentIndex + 1);
    newHistory.push(newUrl);
    
    updateTab(tabId, { 
        history: newHistory,
        currentIndex: newHistory.length - 1,
        isLoading: true 
    });
  };

  const goBack = () => {
    if (!activeTab) return;
    if (activeTab.currentIndex > 0) {
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex - 1, isLoading: true });
    }
  };

  const goForward = () => {
    if (!activeTab) return;
    if (activeTab.currentIndex < activeTab.history.length - 1) {
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex + 1, isLoading: true });
    }
  };

  const reload = () => {
    if (activeTab && iframeRefs.current[activeTab.id]) {
      updateTab(activeTabId, { isLoading: true });
      iframeRefs.current[activeTab.id]!.src = iframeRefs.current[activeTab.id]!.src;
    }
  };
  
  const goHome = () => {
    if (activeTab) {
      handleNavigation(activeTabId, DEFAULT_URL);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && activeTab) {
      handleNavigation(activeTabId, inputValue);
    }
  };

  const handleIframeLoad = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;

    let title = "Untitled";
    try {
      const iframe = iframeRefs.current[tabId];
      if (iframe && iframe.contentWindow) {
        title = iframe.contentWindow.document.title || "Untitled";

        const realUrl = iframe.contentWindow.location.href;
        if (realUrl !== 'about:blank' && realUrl !== tab.history[tab.currentIndex]) {
           const newHistory = [...tab.history];
           newHistory[tab.currentIndex] = realUrl;
           updateTab(tabId, {history: newHistory});
           if (tabId === activeTabId) {
             setInputValue(realUrl);
           }
        }
      }
    } catch (error) {
      console.warn("Could not access iframe content due to cross-origin restrictions:", error);
      title = "Page";
    }
    updateTab(tabId, { isLoading: false, title });
  };
  
  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      history: [DEFAULT_URL],
      currentIndex: 0,
      title: "New Tab",
      isLoading: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  const closeTab = (tabIdToClose: string) => {
    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    if (tabIndex === -1) return;

    // Prevent closing the last tab
    if (tabs.length === 1) return;

    const newTabs = tabs.filter(t => t.id !== tabIdToClose);
    setTabs(newTabs);

    // If the closed tab was active, switch to another tab
    if (activeTabId === tabIdToClose) {
      if (newTabs[tabIndex]) {
        setActiveTabId(newTabs[tabIndex].id);
      } else {
        setActiveTabId(newTabs[tabIndex - 1].id);
      }
    }
  };
  
  const copyLink = () => {
    if (currentUrl !== DEFAULT_URL) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        toast({ title: "Copied to clipboard!" });
      }).catch(err => {
        console.error("Failed to copy:", err);
        toast({ title: "Failed to copy link", variant: "destructive" });
      });
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
          {tabs.map((tab) => (
             <div key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative flex items-center text-sm font-medium h-10 px-4 rounded-t-lg cursor-pointer border border-b-0
                ${activeTabId === tab.id 
                    ? 'bg-card text-card-foreground z-10 -mb-px' 
                    : 'bg-secondary text-secondary-foreground hover:bg-card/80'
                }`}
             >
                <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="truncate max-w-[150px]">
                    {tab.isLoading ? "Loading..." : tab.title}
                </span>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 ml-2 rounded-full hover:bg-muted-foreground/20"
                    onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
          ))}
          <Button variant="ghost" size="icon" className="h-9 w-9 ml-1" onClick={addTab}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Card className="flex items-center gap-1 p-2 rounded-b-lg rounded-t-none border-t-border">
          <Button variant="ghost" size="icon" onClick={goBack} disabled={!activeTab || activeTab.currentIndex === 0}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goForward} disabled={!activeTab || activeTab.currentIndex >= activeTab.history.length - 1}>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={reload}>
            {activeTab?.isLoading ? <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div> : <RefreshCw className="w-5 h-5" />}
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
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyLink}>
              <Link className="w-5 h-5 text-muted-foreground" />
            </Button>
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
              {tabs.flatMap(t => t.history).filter(item => item !== DEFAULT_URL).reverse().slice(0, 10).map((item, index) => (
                 <DropdownMenuItem key={`${item}-${index}`} onSelect={() => activeTab && handleNavigation(activeTab.id, item)}>
                   <p className="max-w-xs truncate">{item}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
                <DropdownMenuItem onSelect={addTab}>
                    <FilePlus className="mr-2 h-4 w-4" />
                    <span>New tab</span>
                    <DropdownMenuShortcut>Ctrl+T</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <PlusSquare className="mr-2 h-4 w-4" />
                    <span>New window</span>
                    <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ShieldOff className="mr-2 h-4 w-4" />
                    <span>New Incognito window</span>
                    <DropdownMenuShortcut>Ctrl+Shift+N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <KeyRound className="mr-2 h-4 w-4" />
                    <span>Passwords and autofill</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <HistoryIcon className="mr-2 h-4 w-4" />
                    <span>History</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Downloads</span>
                    <DropdownMenuShortcut>Ctrl+J</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Bookmarks and lists</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <PanelsTopLeft className="mr-2 h-4 w-4" />
                    <span>Tab groups</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Extensions</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete browsing data...</span>
                    <DropdownMenuShortcut>Ctrl+Shift+Del</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <ZoomIn className="mr-2 h-4 w-4" />
                        <span>Zoom</span>
                         <div className="ml-auto flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Minus className="w-4 h-4"/></Button>
                            <span>100%</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><RectangleHorizontal className="w-4 h-4"/></Button>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                 <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    <span>Print...</span>
                    <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search with Google Lens</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Languages className="mr-2 h-4 w-4" />
                    <span>Translate...</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Find and edit</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Cast className="mr-2 h-4 w-4" />
                    <span>Cast, save, and share</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>More tools</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                 <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Exit</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </Card>
      </header>
      <main className="flex-1 bg-card m-2 mt-0 mb-0 rounded-t-lg overflow-hidden relative">
        {tabs.map(tab => (
            <div key={tab.id} className={`w-full h-full ${activeTabId === tab.id ? 'block' : 'hidden'}`}>
                {tab.history[tab.currentIndex] === DEFAULT_URL ? (
                    <NewTabPage />
                ) : (
                    <iframe
                        ref={el => (iframeRefs.current[tab.id] = el)}
                        src={tab.history[tab.currentIndex]}
                        onLoad={() => handleIframeLoad(tab.id)}
                        className="w-full h-full border-0"
                        title="Browser Content"
                        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts"
                    />
                )}
            </div>
        ))}
      </main>
    </div>
  );
}
