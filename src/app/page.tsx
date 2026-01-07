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
  User,
  Pencil,
  BookOpen,
  Gauge,
  ListTodo,
  Code,
  CreditCard,
  MapPin,
  RefreshCcw,
  ChevronRight,
  BookmarkPlus,
  BookMarked,
  BookCopy,
  BookUp,
  Folder,
  Puzzle,
  Store,
  Scissors,
  Copy,
  ClipboardPaste,
  SquareArrowOutUpRight,
  QrCode,
  Computer,
  Info,
  CheckCircle2,
  MessageSquareWarning,
  Terminal,
  ChevronUp,
  MessageSquare,
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { summarizeText } from "@/ai/flows/summarize-flow";

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

type BookmarkItem = {
  url: string;
  title: string;
  favicon?: string;
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
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [consoleInput, setConsoleInput] = useState('');
  const [consoleHistory, setConsoleHistory] = useState<{type: 'input' | 'output', content: string}[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const { toast } = useToast();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('aisha-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  useEffect(() => {
    // Apply zoom level to the content area
    const activeContent = document.getElementById('browser-content-area');
    if (activeContent) {
      activeContent.style.transform = `scale(${zoomLevel / 100})`;
      activeContent.style.transformOrigin = 'top left';
    }
  }, [zoomLevel, activeTabId]);
  
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

    if (newUrl.startsWith('aisha:')) {
      newUrl = newUrl.replace('aisha://', 'about:');
    }
    
    const internalPages = ['about:settings', 'about:history', 'about:bookmarks', 'about:downloads', 'about:blank', 'about:startup-checklist', 'about:ai-hub'];
    if (internalPages.includes(newUrl)) {
        const newHistory = activeTab!.history.slice(0, activeTab!.currentIndex + 1);
        newHistory.push(newUrl);
        const pageTitle = newUrl.split(':')[1].charAt(0).toUpperCase() + newUrl.split(':')[1].slice(1).replace('-',' ');
        updateTab(activeTabId, { 
            history: newHistory,
            currentIndex: newHistory.length - 1,
            isLoading: false,
            title: pageTitle
        });
        return;
    }

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
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex - 1, isLoading: !activeTab.history[activeTab.currentIndex - 1].startsWith('about:') });
    }
  };

  const goForward = () => {
    if (!activeTab) return;
    if (activeTab.currentIndex < activeTab.history.length - 1) {
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex + 1, isLoading: !activeTab.history[activeTab.currentIndex + 1].startsWith('about:') });
    }
  };

  const reload = () => {
    if (!activeTab) return;

    if (currentUrl.startsWith('about:')) {
        toast({ title: "Internal pages don't need to be reloaded." });
        return;
    }

    if (iframeRefs.current[activeTab.id]) {
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
      try {
        const url = new URL(tab.history[tab.currentIndex]);
        title = url.hostname;
      } catch {
        title = "Invalid URL";
      }
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

    if (tabs.length === 1) {
      toast({title: "You can't close the last tab.", variant: "destructive"});
      return;
    };

    const newTabs = tabs.filter(t => t.id !== tabIdToClose);
    setTabs(newTabs);

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
  
  const toggleBookmark = () => {
    if (!activeTab || currentUrl === DEFAULT_URL || currentUrl.startsWith("about:")) {
        toast({title: "Can't bookmark internal pages.", variant: "destructive"});
        return;
    }
    const existingIndex = bookmarks.findIndex(b => b.url === currentUrl);
    let newBookmarks;
    if (existingIndex > -1) {
        newBookmarks = bookmarks.filter((_, index) => index !== existingIndex);
        toast({title: "Bookmark removed."});
    } else {
        const newBookmark: BookmarkItem = {
            url: currentUrl,
            title: activeTab.title,
        };
        newBookmarks = [...bookmarks, newBookmark];
        toast({title: "Bookmark added!"});
    }
    setBookmarks(newBookmarks);
    localStorage.setItem('aisha-bookmarks', JSON.stringify(newBookmarks));
  };
  
  const isBookmarked = activeTab ? bookmarks.some(b => b.url === currentUrl) : false;

  const handleConsoleCommand = () => {
    if (!consoleInput.trim() || !activeTab) return;
  
    setConsoleHistory(h => [...h, { type: 'input', content: consoleInput }]);
  
    const iframe = iframeRefs.current[activeTab.id];
    let output;
  
    try {
      if (currentUrl.startsWith("about:")) {
        // For internal pages, eval in the main window context. Be careful!
        output = window.eval(consoleInput);
      } else {
         if (!iframe || !iframe.contentWindow) {
            throw new Error("Cannot access the content of the current tab.");
         }
         // Check for cross-origin restrictions
         if (iframe.contentWindow.location.origin !== window.location.origin) {
            throw new Error("Cannot execute JavaScript on a cross-origin page. This is a security restriction.");
         }
         output = iframe.contentWindow.eval(consoleInput);
      }
  
      if (output === undefined) {
        output = 'undefined';
      } else {
        output = JSON.stringify(output, null, 2);
      }
    } catch (error: any) {
      output = `Error: ${error.message}`;
    }
    
    setConsoleHistory(h => [...h, { type: 'output', content: output }]);
    setConsoleInput('');
  };
  
  const handleFeedbackSubmit = () => {
    if (!feedbackContent.trim()) {
      toast({title: "Please enter your feedback.", variant: 'destructive'});
      return;
    }
    console.log("Feedback Submitted:", {email: feedbackEmail, content: feedbackContent});
    toast({title: "Thank you for your feedback!"});
    setIsFeedbackOpen(false);
    setFeedbackContent('');
    setFeedbackEmail('');
  };


  const isInternalPage = currentUrl.startsWith('about:');

  const NewTabPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-8xl font-bold mb-8" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
        <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
                type="text"
                placeholder="Search Aisha or type a URL"
                className="w-full h-12 pl-12 pr-32 rounded-full bg-secondary border-none focus-visible:ring-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => toast({ title: 'Voice search is not implemented yet.'})}><Mic className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => toast({ title: 'Image search is not implemented yet.'})}><Camera className="w-5 h-5" /></Button>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleNavigation(activeTabId, 'about:ai-hub')}>
                    <Sparkles className="w-4 h-4 mr-2"/>
                    AI Mode
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-5 gap-x-8 gap-y-4 mt-8">
            {shortcuts.map(shortcut => (
                <div key={shortcut.name} className="flex flex-col items-center gap-2 text-center cursor-pointer" onClick={() => handleNavigation(activeTabId, shortcut.name)}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl ${shortcut.color}`}>
                        {typeof shortcut.icon === 'string' ? shortcut.icon : shortcut.icon}
                    </div>
                    <span className="text-xs truncate w-20">{shortcut.name}</span>
                </div>
            ))}
        </div>
    </div>
  );

  const SettingsPage = () => {
    const SettingsContent = require('@/app/settings/page').default;
    return <SettingsContent />;
  }

  const StartupChecklistPage = () => {
    try {
      const ChecklistContent = require('@/app/startup-checklist/page').default;
      return <ChecklistContent />;
    } catch (error) {
      return <GenericInternalPage title="Startup Checklist" icon={ListTodo}><p>Could not load the startup checklist page.</p></GenericInternalPage>
    }
  }
  
  const AiHubPage = () => {
    const [textToSummarize, setTextToSummarize] = useState('');
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
  
    const handleSummarize = async () => {
      if (!textToSummarize.trim()) {
        toast({ title: 'Please enter text to summarize.', variant: 'destructive' });
        return;
      }
      setIsSummarizing(true);
      setSummary('');
      try {
        const result = await summarizeText({ text: textToSummarize });
        setSummary(result.summary);
      } catch (error) {
        console.error('Summarization failed:', error);
        toast({ title: 'Failed to generate summary.', description: 'Please try again later.', variant: 'destructive' });
      } finally {
        setIsSummarizing(false);
      }
    };
  
    return (
      <GenericInternalPage title="AI Hub" icon={Sparkles}>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Text Summarizer</h3>
              <div className="grid gap-4">
                <Label htmlFor="text-to-summarize">Paste your text here</Label>
                <Textarea
                  id="text-to-summarize"
                  placeholder="Enter a long article or any text you want to summarize..."
                  className="min-h-[200px]"
                  value={textToSummarize}
                  onChange={(e) => setTextToSummarize(e.target.value)}
                  disabled={isSummarizing}
                />
                <Button onClick={handleSummarize} disabled={isSummarizing}>
                  {isSummarizing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Summarize
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
  
          {summary && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {summary}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </GenericInternalPage>
    );
  };

  const GenericInternalPage = ({title, icon: Icon, children}: {title: string, icon: React.ElementType, children: React.ReactNode}) => (
    <div className="flex-1 flex flex-col bg-background text-foreground p-8 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <Icon className="w-8 h-8 text-muted-foreground"/>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
  
  const HistoryPage = () => {
    const historyItems = tabs.flatMap(t => t.history).filter(item => item !== DEFAULT_URL && !item.startsWith('about:'));
    const uniqueHistory = [...new Set(historyItems)].reverse();
    return (
        <GenericInternalPage title="History" icon={HistoryIcon}>
          {uniqueHistory.length > 0 ? (
            <div className="space-y-2">
              {uniqueHistory.map((item, index) => (
                <Card key={`${item}-${index}`} className="p-3 flex items-center justify-between">
                  <span className="truncate cursor-pointer hover:underline" onClick={() => handleNavigation(activeTabId, item)}>{item}</span>
                  <Button variant="ghost" size="icon" onClick={() => toast({title: "Clearing specific history item is not implemented."})}>
                    <Trash2 className="w-4 h-4 text-muted-foreground"/>
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <p>Your browsing history is empty.</p>
          )}
        </GenericInternalPage>
    );
  };
  
  const BookmarksPage = () => (
      <GenericInternalPage title="Bookmarks" icon={BookMarked}>
        {bookmarks.length > 0 ? (
           <div className="space-y-2">
           {bookmarks.map((bookmark, index) => (
             <Card key={`${bookmark.url}-${index}`} className="p-3 flex items-center justify-between">
               <div>
                  <p className="font-semibold truncate cursor-pointer hover:underline" onClick={() => handleNavigation(activeTabId, bookmark.url)}>{bookmark.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
               </div>
               <Button variant="ghost" size="icon" onClick={() => {
                  const newBookmarks = bookmarks.filter(b => b.url !== bookmark.url);
                  setBookmarks(newBookmarks);
                  localStorage.setItem('aisha-bookmarks', JSON.stringify(newBookmarks));
                  toast({title: "Bookmark removed"});
               }}>
                 <Trash2 className="w-4 h-4 text-muted-foreground"/>
               </Button>
             </Card>
           ))}
         </div>
        ) : (
          <p>You have no bookmarks.</p>
        )}
      </GenericInternalPage>
  );

  const DeveloperConsole = () => (
    <Sheet open={isConsoleOpen} onOpenChange={setIsConsoleOpen}>
      <SheetContent side="bottom" className="h-1/2 flex flex-col p-0">
        <div className="flex items-center justify-between p-2 border-b">
          <h3 className="font-semibold text-lg px-2">Developer Console</h3>
          <Button variant="ghost" size="icon" onClick={() => setIsConsoleOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-secondary/30 font-mono text-sm">
          {consoleHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' && (
                <div className="flex items-start">
                  <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground" />
                  <pre className="whitespace-pre-wrap">{entry.content}</pre>
                </div>
              )}
              {entry.type === 'output' && (
                <div className="flex items-start">
                  <ArrowLeft className="w-4 h-4 mr-2 mt-0.5 text-muted-foreground/50" />
                  <pre className="whitespace-pre-wrap text-muted-foreground">{entry.content}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-2 border-t flex items-center gap-2">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Run JavaScript in the current tab context..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0"
            value={consoleInput}
            onChange={(e) => setConsoleInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConsoleCommand()}
          />
          <Button onClick={handleConsoleCommand}>Run</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  const FeedbackSheet = () => (
    <Sheet open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Send Feedback</SheetTitle>
          <SheetDescription>
            Have an idea or found a bug? Let us know!
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feedback-content" className="text-right">
              Feedback
            </Label>
            <Textarea
              id="feedback-content"
              value={feedbackContent}
              onChange={(e) => setFeedbackContent(e.target.value)}
              className="col-span-3"
              placeholder="Tell us what you think..."
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="feedback-email" className="text-right">
              Email (Optional)
            </Label>
            <Input
              id="feedback-email"
              type="email"
              value={feedbackEmail}
              onChange={(e) => setFeedbackEmail(e.target.value)}
              className="col-span-3"
              placeholder="So we can get back to you"
            />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );


  return (
    <div className="flex flex-col h-screen bg-secondary text-foreground overflow-hidden">
      <header className="flex-shrink-0">
        <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-end">
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
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => toast({title: "Window controls are cosmetic."})}><Minus className="w-5 h-5"/></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => toast({title: "Window controls are cosmetic."})}><RectangleHorizontal className="w-5 h-5"/></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-red-500" onClick={() => toast({title: "Window controls are cosmetic."})}><X className="w-5 h-5"/></Button>
            </div>
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
            {isInternalPage ? (
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-0.5">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Aisha</span>
                    </div>
                </div>
            ) : (
                <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
            )}
            <Input
              type="text"
              value={isInternalPage ? inputValue.replace('about:', 'aisha://') : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              className="bg-transparent border-none h-auto p-0 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Search Aisha or type a URL"
            />
             <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyLink}>
              <Link className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleBookmark}>
              <Star className={`w-5 h-5 text-muted-foreground transition-colors ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'hover:text-yellow-400'}`} />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => handleNavigation(activeTabId, 'about:history')}>
                <HistoryIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => handleNavigation(activeTabId, 'about:downloads')}>
            <Download className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-7 h-7">
                  <AvatarImage src="https://picsum.photos/seed/avatar/32/32" />
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toast({title: 'Profile management not implemented.'})}>
                    <User className="mr-2 h-4 w-4"/>
                    <span>Manage Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({title: 'Signing out is not implemented.'})}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-[calc(100vh-150px)] overflow-y-auto">
                <DropdownMenuItem onSelect={addTab}>
                    <FilePlus className="mr-2 h-4 w-4" />
                    <span>New tab</span>
                    <DropdownMenuShortcut>Ctrl+T</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => window.open(window.location.href)}>
                    <PlusSquare className="mr-2 h-4 w-4" />
                    <span>New window</span>
                    <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({title: "Incognito mode is not available."})}>
                    <ShieldOff className="mr-2 h-4 w-4" />
                    <span>New Incognito window</span>
                    <DropdownMenuShortcut>Ctrl+Shift+N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger onSelect={() => handleNavigation(activeTabId, 'about:history')}>
                    <HistoryIcon className="mr-2 h-4 w-4" />
                    <span>History</span>
                  </DropdownMenuSubTrigger>
                </DropdownMenuSub>
                 <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:downloads')}>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Downloads</span>
                    <DropdownMenuShortcut>Ctrl+J</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuSub>
                  <DropdownMenuSubTrigger onSelect={() => handleNavigation(activeTabId, 'about:bookmarks')}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Bookmarks and lists</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-80">
                      <DropdownMenuItem onSelect={toggleBookmark}>
                        <BookmarkPlus className="mr-2 h-4 w-4" />
                        <span>Bookmark this tab...</span>
                        <DropdownMenuShortcut>Ctrl+D</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                        <BookCopy className="mr-2 h-4 w-4" />
                        <span>Bookmark all tabs...</span>
                        <DropdownMenuShortcut>Ctrl+Shift+D</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:bookmarks')}>
                        <BookMarked className="mr-2 h-4 w-4" />
                        <span>Bookmark manager</span>
                        <DropdownMenuShortcut>Ctrl+Shift+O</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>All Bookmarks</DropdownMenuLabel>
                      {bookmarks.slice(0, 5).map(b => (
                         <DropdownMenuItem key={b.url} onSelect={() => handleNavigation(activeTabId, b.url)}>
                            <Star className="mr-2 h-4 w-4 text-yellow-500"/>
                            <span className="truncate">{b.title}</span>
                         </DropdownMenuItem>
                      ))}
                      {bookmarks.length > 5 && <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:bookmarks')}><ChevronRight className="mr-2 h-4 w-4"/><span>Show all...</span></DropdownMenuItem>}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <PanelsTopLeft className="mr-2 h-4 w-4" />
                        <span>Tab groups</span>
                    </DropdownMenuSubTrigger>
                     <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                           <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Create new tab group</span>
                           </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Extensions</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onSelect={() => toast({title: "Extensions are not supported."})}>
                        <Puzzle className="mr-2 h-4 w-4" />
                        <span>Manage Extensions</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({title: "Password manager is not available."})}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    <span>Passwords and autofill</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => toast({title: "Clearing browsing data is not implemented."})}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete browsing data...</span>
                    <DropdownMenuShortcut>Ctrl+Shift+Del</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ZoomIn className="mr-2 h-4 w-4" />
                        <span>Zoom</span>
                         <div className="ml-auto flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoomLevel(z => Math.max(z - 10, 20))}><Minus className="w-4 h-4"/></Button>
                            <span>{zoomLevel}%</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoomLevel(z => Math.min(z + 10, 200))}><Plus className="w-4 h-4"/></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoomLevel(100)}><RectangleHorizontal className="w-4 h-4"/></Button>
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                 <DropdownMenuItem onSelect={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" />
                    <span>Print...</span>
                    <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>Search with Google Lens</span>
                </DropdownMenuItem>
                 <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                    <Languages className="mr-2 h-4 w-4" />
                    <span>Translate...</span>
                </DropdownMenuItem>
                 <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Search className="mr-2 h-4 w-4" />
                        <span>Find and edit</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onSelect={() => toast({title: "Find is not implemented."})}>
                                <Search className="mr-2 h-4 w-4" />
                                <span>Find...</span>
                                <DropdownMenuShortcut>Ctrl+F</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => document.execCommand('cut')}>
                                <Scissors className="mr-2 h-4 w-4" />
                                <span>Cut</span>
                                <DropdownMenuShortcut>Ctrl+X</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => document.execCommand('copy')}>
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy</span>
                                <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => navigator.clipboard.readText().then(text => {
                                const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
                                if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                                    activeElement.value += text;
                                }
                            })}>
                                <ClipboardPaste className="mr-2 h-4 w-4" />
                                <span>Paste</span>
                                <DropdownMenuShortcut>Ctrl+V</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                 <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Cast className="mr-2 h-4 w-4" />
                      <span>Cast, save, and share</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="w-80">
                        <DropdownMenuItem onSelect={() => toast({title: "Casting is not available in this browser."})}>
                            <Cast className="mr-2 h-4 w-4" />
                            <span>Cast...</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => toast({title: "Saving pages is not implemented."})}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Save page as...</span>
                            <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toast({title: "Creating shortcuts is not implemented."})}>
                            <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                            <span>Create shortcut...</span>
                        </DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={copyLink}>
                            <Link className="mr-2 h-4 w-4" />
                            <span>Copy link</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                            <Computer className="mr-2 h-4 w-4" />
                            <span>Send to your devices</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toast({title: "QR Code generation is not implemented."})}>
                            <QrCode className="mr-2 h-4 w-4" />
                            <span>Create QR Code</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                 </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>More tools</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Customize Aisha</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                        <Gauge className="mr-2 h-4 w-4" />
                        <span>Performance</span>
                      </DropdownMenuItem>
                       <DropdownMenuItem onSelect={() => setIsConsoleOpen(true)}>
                        <Terminal className="mr-2 h-4 w-4" />
                        <span>Developer Console</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                 <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                   <DropdownMenuSubTrigger>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                        <DropdownMenuItem onSelect={() => toast({title: "This feature is not implemented."})}>
                           <Info className="mr-2 h-4 w-4"/>
                           <span>About Aisha</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setIsFeedbackOpen(true)}>
                           <MessageSquare className="mr-2 h-4 w-4"/>
                           <span>Send Feedback</span>
                        </DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                 <DropdownMenuItem onSelect={() => toast({title: "You can't exit the app from here."})}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Exit</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </Card>
      </header>
      <main id="browser-content-area" className="flex-1 bg-card m-2 mt-0 mb-0 rounded-t-lg overflow-auto relative">
        {tabs.map(tab => (
            <div key={tab.id} className={`w-full h-full ${activeTabId === tab.id ? 'block' : 'hidden'}`}>
                {tab.history[tab.currentIndex] === DEFAULT_URL ? (
                    <NewTabPage />
                ) : tab.history[tab.currentIndex] === 'about:settings' ? (
                    <SettingsPage />
                ) : tab.history[tab.currentIndex] === 'about:startup-checklist' ? (
                  <StartupChecklistPage />
                ) : tab.history[tab.currentIndex] === 'about:ai-hub' ? (
                  <AiHubPage />
                ) : tab.history[tab.currentIndex] === 'about:history' ? (
                    <HistoryPage />
                ) : tab.history[tab.currentIndex] === 'about:bookmarks' ? (
                    <BookmarksPage />
                ) : tab.history[tab.currentIndex] === 'about:downloads' ? (
                    <GenericInternalPage title="Downloads" icon={Download}><p>There are no downloads to show.</p></GenericInternalPage>
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
      <DeveloperConsole />
      <FeedbackSheet />
    </div>
  );
}
