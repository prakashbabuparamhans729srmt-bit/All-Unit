

"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import Image from 'next/image';
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
  Square,
  Sun,
  Moon,
  Link as LinkIcon,
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
  Mail,
  Youtube,
  Map as MapIcon,
  Newspaper,
  Image as ImageIcon,
  Video,
  ExternalLink,
  Menu,
  Play,
  History,
  Paperclip,
  ArrowUp,
  Share,
  Laptop,
  PanelLeft,
  Users,
  ShoppingCart,
  Printer,
  Languages,
  Cast,
  Settings,
  HelpCircle,
  LogOut,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { summarizeText } from "@/ai/flows/summarize-flow";
import { describeImage } from "@/ai/flows/describe-image-flow";
import { SidebarProvider, useSidebar, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { DotCircleIcon } from "@/components/icons/DotCircleIcon";
import { CustomBookReaderIcon } from "@/components/icons/CustomBookReaderIcon";
import { CustomCommunityIcon } from "@/components/icons/CustomCommunityIcon";
import { CustomAiToolIcon } from "@/components/icons/CustomAiToolIcon";
import { AishaLogo } from "@/components/icons/AishaLogo";
import { AppGridIcon } from '@/components/icons/AppGridIcon';
import { CustomAboutIcon } from "@/components/icons/CustomAboutIcon";


const DEFAULT_URL = "about:newtab";

const initialShortcuts: Shortcut[] = [
    { name: "Google", icon: 'G', color: 'bg-blue-500', url: 'https://google.com' },
    { name: "YouTube", icon: 'Youtube', color: 'bg-red-500', url: 'https://youtube.com' },
    { name: "ChatGPT", icon: 'Sparkles', color: 'bg-purple-500', url: 'https://chat.openai.com' },
    { name: "GitHub", icon: 'G', color: 'bg-gray-700', url: 'https://github.com' },
    { name: "Vercel", icon: 'V', color: 'bg-black', url: 'https://vercel.com' },
    { name: "Canvas", icon: 'C', color: 'bg-cyan-500', url: 'https://canvas.instructure.com/' },
    { name: "IDX", icon: 'Sparkles', color: 'bg-orange-500', url: 'https://idx.dev' },
    { name: "AdMob", icon: 'A', color: 'bg-yellow-500', url: 'https://admob.google.com' },
    { name: "Flutter", icon: 'Book', color: 'bg-sky-500', url: 'https://flutter.dev' },
];

const companyApps = [
  { name: 'Account', icon: User, url: 'https://myaccount.google.com/' },
  { name: 'Drive', icon: Folder, url: 'https://drive.google.com/' },
  { name: 'Business', icon: Store, url: 'https://www.google.com/business/' },
  { name: 'Gmail', icon: Mail, url: 'https://mail.google.com/' },
  { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/' },
  { name: 'Gemini', icon: Sparkles, url: 'https://gemini.google.com/' },
  { name: 'Maps', icon: MapIcon, url: 'https://www.google.com/maps' },
  { name: 'Search', icon: Search, url: 'https://www.google.com/' },
  { name: 'Calendar', icon: BookCopy, url: 'https://calendar.google.com/' },
  { name: 'News', icon: Newspaper, url: 'https://news.google.com/' },
  { name: 'Photos', icon: ImageIcon, url: 'https://photos.google.com/' },
  { name: 'Meet', icon: Video, url: 'https://meet.google.com/' },
];

const aiTools = {
  "AI Chatbots & Assistants": [
    { name: "ChatGPT", url: "https://chat.openai.com" },
    { name: "Google Gemini", url: "https://gemini.google.com" },
    { name: "Microsoft Copilot", url: "https://copilot.microsoft.com" },
    { name: "Claude", url: "https://claude.ai" },
    { name: "Grok", url: "https://grok.x.ai" },
    { name: "Perplexity AI", url: "https://www.perplexity.ai" },
    { name: "Deepseek", url: "https://chat.deepseek.com" },
  ],
  "Image / Video AI": [
    { name: "Midjourney", url: "https://www.midjourney.com" },
    { name: "DALL-E 3", url: "https://openai.com/dall-e-3" },
    { name: "Stable Diffusion", url: "https://stability.ai/" },
    { name: "Runway ML", url: "https://runwayml.com/" },
    { name: "Sora", url: "https://openai.com/sora" },
    { name: "Leonardo.ai", url: "https://leonardo.ai/" },
  ],
  "Audio & Voice AI": [
    { name: "Murf.ai", url: "https://murf.ai" },
    { name: "ElevenLabs", url: "https://elevenlabs.io" },
    { name: "Whisper", url: "https://openai.com/research/whisper" },
  ],
  "Coding / Developer AI": [
    { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
    { name: "Replit AI", url: "https://replit.com/ai" },
    { name: "Tabnine", url: "https://www.tabnine.com/" },
  ],
};


const searchEngines: { [key: string]: { name: string; url: string } } = {
  google: { name: 'Google', url: 'https://www.google.com/search?q=' },
  bing: { name: 'Bing', url: 'https://www.bing.com/search?q=' },
  duckduckgo: { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  yahoo: { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' },
};

const renderShortcutIcon = (shortcut: Shortcut) => {
    if (typeof shortcut.icon === 'string' && shortcut.icon.startsWith('https://')) {
        return <Image src={shortcut.icon} alt={shortcut.name} width={24} height={24} className="rounded-full"/>;
    }
    if (shortcut.icon === 'Sparkles') return <Sparkles className="w-5 h-5" />;
    if (shortcut.icon === 'Book') return <Book className="w-5 h-5" />;
    if (shortcut.icon === 'Youtube') return <Youtube className="w-5 h-5" />;
    return shortcut.icon;
};

type Shortcut = {
    name: string;
    icon: string | React.ElementType;
    color: string;
    url: string;
};

type Tab = {
  id: string;
  history: string[];
  currentIndex: number;
  title: string;
  isLoading: boolean;
  loadFailed: boolean;
};

type BookmarkItem = {
  url: string;
  title: string;
  favicon?: string;
};

type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
}

const VoiceSearchOverlay = ({
  state,
  onClose,
  onRetry,
  transcript,
}: {
  state: 'listening' | 'error' | 'inactive';
  onClose: () => void;
  onRetry: () => void;
  transcript: string;
}) => {
  if (state === 'inactive') return null;

  return (
    <Dialog open={state !== 'inactive'} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black/90 border-none shadow-none text-white h-screen w-screen max-w-full flex flex-col items-center justify-center gap-8 rounded-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Voice Search</DialogTitle>
            <DialogDescription>
              {state === 'listening' ? 'The browser is listening for voice input.' : 'There was an error. Please try again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
          </DialogClose>
          
          {state === 'listening' ? (
            <>
              <h2 className="text-3xl font-light min-h-16">Listening... <span className="text-gray-400">{transcript}</span></h2>
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse"></div>
                <div className="relative w-full h-full flex items-center justify-center bg-red-600 rounded-full">
                  <Mic className="w-20 h-20" />
                </div>
              </div>
            </>
          ) : ( // state === 'error'
            <div className="flex flex-row items-center justify-center gap-16">
              <div className='text-center'>
                <h2 className="text-3xl font-light text-gray-300">
                  Didn&apos;t get that.
                </h2>
                 <button onClick={onRetry} className="underline text-gray-400 hover:text-white mt-2">
                    Try again
                  </button>
              </div>
              <div className="w-32 h-32 flex items-center justify-center rounded-full border border-gray-500">
                <Mic className="w-14 h-14 text-gray-400" />
              </div>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};


const AishaAssistant = React.memo(({
  isMobile = false,
  assistantMessages,
  setAssistantMessages,
  isAssistantLoading,
  assistantInput,
  setAssistantInput,
  handleAssistantSubmit,
  toast,
  startVoiceSearch,
  listeningState,
  voiceSearchSource,
  setIsAssistantOpen,
  setMobileMenuOpen,
  toggleMainSidebar,
  setMobileSheetContent,
  handleInstallClick,
  handleAssistantSearch,
  handleAttachment,
}: {
  isMobile?: boolean;
  assistantMessages: AssistantMessage[];
  setAssistantMessages: (messages: AssistantMessage[]) => void;
  isAssistantLoading: boolean;
  assistantInput: string;
  setAssistantInput: (value: string) => void;
  handleAssistantSubmit: () => void;
  toast: (options: any) => void;
  startVoiceSearch: (source: 'address' | 'assistant') => void;
  listeningState: 'listening' | 'error' | 'inactive';
  voiceSearchSource: 'address' | 'assistant' | null;
  setIsAssistantOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMainSidebar: () => void;
  setMobileSheetContent: (content: 'nav' | 'chat') => void;
  handleInstallClick: () => void;
  handleAssistantSearch: () => void;
  handleAttachment: () => void;
}) => (
  <aside className={cn("flex flex-col",
      isMobile
      ? "flex-1 h-full bg-background"
      : "w-[400px] flex-shrink-0 border-l border-border bg-background/80 backdrop-blur-sm"
  )}>
    <div className="flex items-center p-2 border-b shrink-0">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => {
          if (isMobile) {
            setMobileSheetContent('chat');
            setMobileMenuOpen(true);
          } else {
            toggleMainSidebar();
          }
        }}>
            <Menu className="w-5 h-5 text-muted-foreground" />
        </Button>
        <Button variant="outline" size="sm" onClick={handleInstallClick}>
            <Laptop className="w-4 h-4 mr-2"/>
            Get App
        </Button>
      </div>
      <div className="flex-grow" />
      <Button variant="ghost" size="icon" className={cn(isMobile && "mr-10")} onClick={() => {
        setAssistantMessages([]);
        toast({ title: "New chat started." });
      }}>
          <PlusSquare className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
     <ScrollArea className="flex-1 pr-2">
      <div className="p-2 space-y-4">
        {assistantMessages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center h-full pt-20">
            <Sparkles className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-bold text-muted-foreground/80">Assistant</h2>
            <p className="text-lg text-muted-foreground mt-2">How can I help you?</p>
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
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                {message.content}
              </div>
               {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://picsum.photos/seed/avatar/32/32" />
                  <AvatarFallback><User/></AvatarFallback>
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
    <div className="p-2 bg-background/70 rounded-lg mt-2">
      <Textarea
        placeholder="Ask anything..."
        className="bg-secondary border-none rounded-lg p-3 pr-4 h-auto min-h-[80px] resize-none"
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
                className={`h-8 w-8 ${listeningState === 'listening' && voiceSearchSource === 'assistant' ? 'bg-red-500/20 text-red-500' : ''}`}
                onClick={() => startVoiceSearch('assistant')}
            >
                <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  </aside>
));
AishaAssistant.displayName = 'AishaAssistant';

const BrowserApp = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "tab-1",
      history: [DEFAULT_URL],
      currentIndex: 0,
      title: "New Tab",
      isLoading: false,
      loadFailed: false,
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
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(initialShortcuts);
  const [isAddShortcutOpen, setIsAddShortcutOpen] = useState(false);
  const [newShortcutName, setNewShortcutName] = useState('');
  const [newShortcutUrl, setNewShortcutUrl] = useState('');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [isIncognito, setIsIncognito] = useState(false);
  const [searchEngine, setSearchEngine] = useState('google');
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [findInput, setFindInput] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const voiceSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSheetContent, setMobileSheetContent] = useState<'nav' | 'chat'>('nav');
  const isMobile = useIsMobile();
  const [isDesktopSite, setIsDesktopSite] = useState(false);
  
  const [showHomeButton, setShowHomeButton] = useState(true);
  const [showBookmarksButton, setShowBookmarksButton] = useState(true);
  
  const [listeningState, setListeningState] = useState<'listening' | 'error' | 'inactive'>('inactive');
  const [voiceSearchSource, setVoiceSearchSource] = useState<'address' | 'assistant' | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  const { toggleSidebar: toggleMainSidebar } = useSidebar();
  
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [fontSize, setFontSize] = useState('medium');

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const currentUrl = activeTab?.history[activeTab.currentIndex] || DEFAULT_URL;

  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, ...updates } : tab))
    );
  };
  
  const handleNavigation = useCallback((tabId: string, url: string) => {
    let newUrl = url.trim();
    if (!newUrl) return;

    if (newUrl.startsWith('aisha:')) {
      newUrl = newUrl.replace('aisha://', 'about:');
    }
    
    if (newUrl.startsWith("about:")) {
        if (isIncognito && (newUrl === 'about:history' || newUrl === 'about:bookmarks')) {
             toast({ title: "History and Bookmarks are disabled in Incognito mode." });
             return;
        }
        const currentTab = tabs.find(t => t.id === tabId);
        if (!currentTab) return;
        const newHistory = currentTab.history.slice(0, currentTab.currentIndex + 1);
        newHistory.push(newUrl);

        const pageTitle = newUrl.split(':')[1].charAt(0).toUpperCase() + newUrl.split(':')[1].slice(1).replace('-',' ');
        updateTab(tabId, { 
            history: newHistory,
            currentIndex: newHistory.length - 1,
            isLoading: false,
            title: pageTitle,
            loadFailed: false,
        });
        return;
    }

    const isUrlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .?=&%#:-]*)*\/?$/;
    const isLocalhost = newUrl.includes('localhost');
    const isUrl = isUrlRegex.test(newUrl) || isLocalhost;

    if (isUrl) {
      if (!/^(https?:\/\/)/i.test(newUrl)) {
          newUrl = `https://${newUrl}`;
      }
    } else {
      const searchUrl = searchEngines[searchEngine]?.url || searchEngines.google.url;
      newUrl = `${searchUrl}${encodeURIComponent(newUrl)}`;
    }
    
    const tab = tabs.find(t => t.id === tabId);
    if (!tab) return;
    
    const newHistory = tab.history.slice(0, tab.currentIndex + 1);
    newHistory.push(newUrl);

    updateTab(tabId, { 
        history: newHistory,
        currentIndex: newHistory.length - 1,
        isLoading: true,
        title: "Loading...",
        loadFailed: false,
    });
    setInputValue(newUrl);
  }, [tabs, isIncognito, searchEngine, toast]);

  const handleAssistantSubmit = useCallback(async (text?: string) => {
    const currentInput = text || assistantInput;
    if (!currentInput.trim()) return;

    const userInput = currentInput;
    const userMessage: AssistantMessage = { role: 'user', content: userInput };

    const newMessages: AssistantMessage[] = [
      ...assistantMessages,
      userMessage,
    ];
    setAssistantMessages(newMessages);
    setAssistantInput('');
    setIsAssistantLoading(true);

    try {
      const result = await summarizeText({ text: userInput });
      const assistantMessage: AssistantMessage = { role: 'assistant', content: result.summary };
      
      setAssistantMessages([...newMessages, assistantMessage]);

    } catch (error) {
      console.error("Assistant error:", error);
      toast({
        title: "Assistant Error",
        description: "Could not get a response from the assistant.",
        variant: "destructive",
      });
      setAssistantMessages(assistantMessages);
    } finally {
      setIsAssistantLoading(false);
    }
  }, [assistantInput, assistantMessages, toast]);

  const stopVoiceSearch = useCallback(() => {
    if (voiceSearchTimeoutRef.current) {
        clearTimeout(voiceSearchTimeoutRef.current);
        voiceSearchTimeoutRef.current = null;
    }
    recognitionRef.current?.stop();
    if(listeningState === 'listening') {
      setListeningState('inactive');
      setVoiceSearchSource(null);
    }
  }, [listeningState]);

  const startVoiceSearch = useCallback((source: 'address' | 'assistant') => {
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }
    setInterimTranscript('');

    setVoiceSearchSource(source);
    setListeningState('listening');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Voice search not supported", description: "Your browser doesn't support the Web Speech API.", variant: "destructive" });
      setListeningState('inactive');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onend = () => {
      if (voiceSearchTimeoutRef.current) {
        clearTimeout(voiceSearchTimeoutRef.current);
        voiceSearchTimeoutRef.current = null;
      }
    };

    recognition.onerror = (event: any) => {
      if (voiceSearchTimeoutRef.current) {
        clearTimeout(voiceSearchTimeoutRef.current);
        voiceSearchTimeoutRef.current = null;
      }
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        setListeningState('error');
      } else {
        toast({ title: "Voice search error", description: event.error, variant: "destructive" });
        stopVoiceSearch();
      }
    };

    recognition.onresult = (event: any) => {
      if (voiceSearchTimeoutRef.current) {
        clearTimeout(voiceSearchTimeoutRef.current);
        voiceSearchTimeoutRef.current = null;
      }

      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      setInterimTranscript(prev => prev + transcript);
      
      const finalTranscript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
        
      const executeSearch = (searchText: string) => {
        if (!searchText.trim()) {
            stopVoiceSearch();
            return;
        }
        if (source === 'address' && activeTab) {
          setInputValue(searchText);
          handleNavigation(activeTabId, searchText);
        } else if (source === 'assistant') {
          handleAssistantSubmit(searchText);
        }
        stopVoiceSearch();
      };
      
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        executeSearch(finalTranscript);
      } else {
         voiceSearchTimeoutRef.current = setTimeout(() => {
          executeSearch(finalTranscript);
        }, 2000);
      }
    };

    recognition.start();
  }, [activeTab, activeTabId, handleNavigation, handleAssistantSubmit, stopVoiceSearch, toast]);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('aisha-auth');
    if (authStatus !== 'true') {
        window.location.href = '/welcome';
    } else {
        setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
        toast({ title: "App cannot be installed", description: "This app may already be installed or your browser may not support this feature." });
        return;
    }
    (installPrompt as any).prompt();
  };

  const handleShare = () => {
    if (navigator.share && activeTab && currentUrl !== DEFAULT_URL) {
        navigator.share({
            title: activeTab.title,
            text: `Check out this page: ${activeTab.title}`,
            url: currentUrl,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => toast({ title: "Sharing failed", description: error.message, variant: 'destructive' }));
    } else {
        toast({ title: "Web Share not available", description: "Your browser does not support the Web Share API, or there is nothing to share." });
    }
  };

  const handleAttachment = () => {
    attachmentInputRef.current?.click();
  };

  const handleAttachmentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const fileName = event.target.files[0].name;
        toast({
            title: "File selected",
            description: `${fileName} is ready. Attaching files is a conceptual feature in this prototype.`,
        });
    }
    event.target.value = '';
  };
  
  const handleAssistantSearch = () => {
    if (assistantInput.trim()) {
        handleNavigation(activeTabId, assistantInput.trim());
        setIsAssistantOpen(false);
    } else {
        toast({ title: "Nothing to search", description: "Please type something in the assistant box to search." });
    }
  }

  const retryVoiceSearch = () => {
    if (voiceSearchSource) {
      startVoiceSearch(voiceSearchSource);
    }
  };


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'navigate' && event.data.url) {
        handleNavigation(activeTabId, event.data.url);
      }
      if (event.data.type === 'clear-history') {
        setTabs(prevTabs => 
            prevTabs.map(tab => ({
                ...tab,
                history: [DEFAULT_URL],
                currentIndex: 0,
            }))
        );
        handleNavigation(activeTabId, DEFAULT_URL);
      }
      if (event.data.type === 'reset') {
        setTabs(prevTabs => 
            prevTabs.map(tab => ({
                ...tab,
                history: [DEFAULT_URL],
                currentIndex: 0,
                title: "New Tab"
            }))
        );
        if (tabs.length > 0) {
            setActiveTabId(tabs[0].id);
            handleNavigation(tabs[0].id, DEFAULT_URL);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    
    const searchParams = new URLSearchParams(window.location.search);
    const incognitoParam = searchParams.get('incognito');
    if (incognitoParam === 'true') {
        setIsIncognito(true);
        setShortcuts([]);
        setBookmarks([]);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [activeTabId, tabs, handleNavigation]);

  useEffect(() => {
    const handleStorageChange = (e?: StorageEvent) => {
      const savedEngine = localStorage.getItem('aisha-search-engine') || 'google';
      setSearchEngine(savedEngine);
      
      if (!e || e.key === 'aisha-show-home-button') {
        const savedShowHome = localStorage.getItem('aisha-show-home-button');
        setShowHomeButton(savedShowHome ? JSON.parse(savedShowHome) : true);
      }
      if (!e || e.key === 'aisha-show-bookmarks-bar') {
        const savedShowBookmarks = localStorage.getItem('aisha-show-bookmarks-bar');
        setShowBookmarksButton(savedShowBookmarks ? JSON.parse(savedShowBookmarks) : true);
      }
      if (!e || e.key === 'aisha-font-size') {
        const savedFontSize = localStorage.getItem('aisha-font-size');
        setFontSize(savedFontSize ? JSON.parse(savedFontSize) : 'medium');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial load

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    if (isIncognito) return;

    const savedBookmarks = localStorage.getItem('aisha-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    const savedShortcutsString = localStorage.getItem('aisha-shortcuts');
    if (savedShortcutsString) {
        try {
            const savedShortcuts: Shortcut[] = JSON.parse(savedShortcutsString);
            const initialShortcutMap = new Map(initialShortcuts.map(s => [s.name, s]));
            
            const finalShortcuts = initialShortcuts.map(is => {
                const savedVersion = savedShortcuts.find(ss => ss.name === is.name);
                return savedVersion ? { ...is, url: savedVersion.url || is.url } : is;
            });
            
            const userAddedShortcuts = savedShortcuts.filter(ss => !initialShortcutMap.has(ss.name));

            setShortcuts([...finalShortcuts, ...userAddedShortcuts]);
        } catch (e) {
            console.error("Failed to parse shortcuts from localStorage", e);
            setShortcuts(initialShortcuts);
        }
    } else {
        setShortcuts(initialShortcuts);
    }
  }, [isIncognito]);

  useEffect(() => {
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


  const goBack = () => {
    if (!activeTab) return;
    if (activeTab.currentIndex > 0) {
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex - 1, isLoading: !activeTab.history[activeTab.currentIndex - 1].startsWith('about:'), loadFailed: false });
    }
  };

  const goForward = () => {
    if (!activeTab) return;
    if (activeTab.currentIndex < activeTab.history.length - 1) {
      updateTab(activeTabId, { currentIndex: activeTab.currentIndex + 1, isLoading: !activeTab.history[activeTab.currentIndex + 1].startsWith('about:'), loadFailed: false });
    }
  };

  const reload = () => {
    if (!activeTab) return;

    const currentUrl = activeTab.history[activeTab.currentIndex];
    
    if (currentUrl.startsWith('about:')) {
      const currentTabId = activeTabId;
      setActiveTabId('');
      setTimeout(() => setActiveTabId(currentTabId), 0);
      toast({ title: "Page reloaded." });
      return;
    }
    
    const iframe = iframeRefs.current[activeTabId];
    if (iframe) {
        iframe.src = 'about:blank';
        setTimeout(() => {
            iframe.src = currentUrl;
            updateTab(activeTabId, { isLoading: true, loadFailed: false });
        }, 100);
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

    const iframe = iframeRefs.current[tabId];
    let title = "Untitled";
    let loadFailed = false;

    try {
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
            title = iframe.contentWindow.document.title || new URL(tab.history[tab.currentIndex]).hostname;
        }
    } catch (e) {
        try {
            title = new URL(tab.history[tab.currentIndex]).hostname;
        } catch {
            title = "Invalid URL";
        }
    }
    
    // A crude way to check for blocked content without triggering cross-origin errors
    // by checking if we can access *anything*.
    setTimeout(() => {
        try {
            // Accessing document will throw if it's a cross-origin iframe that's been blocked.
            // If the body is empty, it might also mean it was blocked.
            if (iframe && iframe.contentWindow && (!iframe.contentWindow.document || iframe.contentWindow.document.body.innerHTML === '')) {
                loadFailed = true;
            }
        } catch (e) {
            // Can't access, which is expected for cross-origin. Let's assume it loaded okay.
            loadFailed = false;
        }

        // Another check for Chrome's specific "refused to connect" page
        if (iframe?.contentDocument?.title === '') {
            const currentUrl = tab.history[tab.currentIndex];
            if (!currentUrl.startsWith('about:')) {
                loadFailed = true;
            }
        }
        
        updateTab(tabId, { isLoading: false, title, loadFailed });
    }, 100);
};
  
  const addTab = () => {
    const newTabId = `tab-${Date.now()}`;
    const newTab: Tab = {
      id: newTabId,
      history: [DEFAULT_URL],
      currentIndex: 0,
      title: "New Tab",
      isLoading: false,
      loadFailed: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTabId);
  };

  const closeTab = (tabIdToClose: string) => {
    const tabIndex = tabs.findIndex(t => t.id === tabIdToClose);
    if (tabIndex === -1) return;

    if (tabs.length === 1) {
      if (isIncognito) {
          window.close();
          return;
      }
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
    if (isIncognito) {
        toast({ title: "Can't add bookmarks in Incognito mode." });
        return;
    }
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
        output = window.eval(consoleInput);
      } else {
         if (!iframe || !iframe.contentWindow) {
            throw new Error("Cannot access the content of the current tab. External pages run in a separate context.");
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
  
  const handleAddShortcut = () => {
    if (isIncognito) {
        toast({ title: "Can't add shortcuts in Incognito mode." });
        return;
    }
    if (shortcuts.length >= 100) {
      toast({ title: 'You have reached the shortcut limit of 100.', variant: 'destructive' });
      return;
    }
    if (!newShortcutName.trim() || !newShortcutUrl.trim()) {
      toast({ title: 'Please fill out both name and URL.', variant: 'destructive' });
      return;
    }
    let url = newShortcutUrl.trim();
    if (!/^(https?:\/\/)/i.test(url)) {
      url = `https://${url}`;
    }

    const newShortcut: Shortcut = {
      name: newShortcutName,
      url: url,
      icon: `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`,
      color: 'bg-secondary',
    };

    const newShortcuts = [...shortcuts, newShortcut];
    setShortcuts(newShortcuts);
    localStorage.setItem('aisha-shortcuts', JSON.stringify(newShortcuts));
    
    setNewShortcutName('');
    setNewShortcutUrl('');
    setIsAddShortcutOpen(false);
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageDataUri = e.target?.result as string;
        if (!imageDataUri) {
          toast({
            title: 'Could not read image',
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: 'Analyzing image...',
          description: 'AI is generating a search query for your image.',
        });
        
        try {
          const result = await describeImage({ imageDataUri });
          if (result.description) {
            handleNavigation(activeTabId, result.description);
          } else {
            throw new Error("AI could not describe the image.");
          }
        } catch (error) {
          console.error("Image search error:", error);
          toast({
            title: "Image Search Failed",
            description: "Could not get a description from the AI.",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleFind = () => {
    if(!isFindOpen) {
      setIsFindOpen(true);
      return;
    }
    if (!findInput) return;
    
    if (currentUrl.startsWith('about:')) {
      window.find(findInput);
    } else {
      toast({ title: "Find on page is only available for internal pages."});
    }
  };
  
  const createQRCode = () => {
    if (currentUrl && currentUrl !== DEFAULT_URL && !currentUrl.startsWith('about:')) {
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`);
    } else {
      toast({ title: "Can't create QR code for this page." });
    }
  };

  const mobileNavItems = [
    { icon: Share, label: 'Share', action: handleShare },
    { icon: Search, label: 'Find in page', action: handleFind },
    { icon: Languages, label: 'Translate', action: () => toast({title: 'Translate is not implemented on mobile yet.'}) },
    { icon: PlusSquare, label: 'Add to Home', action: handleInstallClick },
    { icon: Laptop, label: 'Recent tabs', action: () => toast({title: 'Recent tabs are not implemented.'}) },
    { icon: HelpCircle, label: 'Help & feedback', action: () => setIsFeedbackOpen(true) },
    { icon: Settings, label: 'Settings', action: () => handleNavigation(activeTabId, 'about:settings') },
  ];

  const navItems = [
    { icon: DotCircleIcon, label: 'U', action: () => handleNavigation(activeTabId, 'https://utru.vercel.app/') },
    { icon: CustomCommunityIcon, label: 'W', action: () => handleNavigation(activeTabId, 'https://mahila-suraksha.vercel.app/') },
    { icon: CustomBookReaderIcon, label: 'R', action: () => handleNavigation(activeTabId, 'https://www.goodreads.com/') },
    { icon: CustomAiToolIcon, label: 'M', action: () => handleNavigation(activeTabId, 'https://mahadev-eight.vercel.app/') },
    { icon: ShoppingCart, label: 'S', action: () => handleNavigation(activeTabId, 'https://play.google.com/store') },
    { icon: CustomAboutIcon, label: 'About', action: () => handleNavigation(activeTabId, 'about:about') },
    { icon: Settings, label: 'Settings', action: () => handleNavigation(activeTabId, 'about:settings') },
  ];

  const isInternalPage = currentUrl.startsWith('about:');

  const NewTabPage = () => (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-8xl font-bold mb-8" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
        <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
                type="text"
                placeholder={`Search with ${searchEngines[searchEngine]?.name || 'Google'} or type a URL`}
                className="w-full h-12 pl-12 pr-48 rounded-full bg-secondary border-none focus-visible:ring-0"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className={`w-8 h-8 ${listeningState === 'listening' && voiceSearchSource === 'address' ? 'bg-red-500/20 text-red-500' : ''}`} onClick={() => startVoiceSearch('address')}>
                  <Mic className="w-5 h-5" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8"><Camera className="w-5 h-5" /></Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                       <DialogTitle className="flex items-center gap-2"><Camera className="w-5 h-5" /> Search by Image</DialogTitle>
                      <DialogDescription>
                        Search using an image instead of text.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 text-center border-2 border-dashed border-muted rounded-lg h-40 flex flex-col justify-center items-center">
                      <p className="text-sm text-muted-foreground">Drag and drop an image here</p>
                      <p className="text-xs text-muted-foreground my-2">or</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Upload a file</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => toast({title: "AI Mode activated!"})}>
                          <Sparkles className="w-5 h-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>AI Mode</p>
                    </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8"><MoreVertical className="w-5 h-5"/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                         <ScrollArea className="h-96">
                            {Object.entries(aiTools).map(([category, tools]) => (
                                <React.Fragment key={category}>
                                    <DropdownMenuLabel>{category}</DropdownMenuLabel>
                                    {tools.map(tool => (
                                        <DropdownMenuItem key={tool.name} onSelect={() => handleNavigation(activeTabId, tool.url)}>
                                            <Image 
                                                src={`https://www.google.com/s2/favicons?sz=32&domain_url=${tool.url}`} 
                                                alt={`${tool.name} logo`}
                                                width={16}
                                                height={16}
                                                className="mr-2"
                                            />
                                            <span>{tool.name}</span>
                                        </DropdownMenuItem>
                                    ))}
                                    <DropdownMenuSeparator />
                                </React.Fragment>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div className="max-w-3xl w-full mt-8 flex flex-col items-center">
        <ScrollArea className="w-full max-w-lg h-40">
          <div className="grid grid-cols-5 gap-x-8 gap-y-4">
              {shortcuts.map((shortcut, index) => (
                  <div key={`${shortcut.name}-${index}`} className="flex flex-col items-center gap-2 text-center cursor-pointer group" onClick={() => handleNavigation(activeTabId, shortcut.url || shortcut.name)}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl ${shortcut.color}`}>
                          {renderShortcutIcon(shortcut)}
                      </div>
                      <span className="text-xs truncate w-20">{shortcut.name}</span>
                  </div>
              ))}
          </div>
        </ScrollArea>
        {shortcuts.length < 100 && !isIncognito && (
            <Dialog open={isAddShortcutOpen} onOpenChange={setIsAddShortcutOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Shortcut
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add shortcut</DialogTitle>
                  <DialogDescription>
                    Enter a name and URL for your new shortcut.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" value={newShortcutName} onChange={e => setNewShortcutName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      URL
                    </Label>
                    <Input id="url" value={newShortcutUrl} onChange={e => setNewShortcutUrl(e.target.value)} className="col-span-3" placeholder="https://example.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddShortcut}>Add Shortcut</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
    </div>
  );

  const SettingsPage = () => {
    try {
      const SettingsContent = require('@/app/settings/page').default;
      return <SettingsContent />;
    } catch (error) {
       console.error("Failed to load settings page:", error);
       return <GenericInternalPage title="Settings" icon={Settings}><p>Could not load the settings page. This might be due to a compilation error.</p></GenericInternalPage>;
    }
  };

  const StartupChecklistPage = () => {
    try {
      const ChecklistContent = require('@/app/startup-checklist/page').default;
      return <ChecklistContent />;
    } catch (error) {
      return <GenericInternalPage title="Startup Checklist" icon={ListTodo}><p>Could not load the startup checklist page.</p></GenericInternalPage>;
    }
  };

  const GenericInternalPage = ({title, icon: Icon, children}: {title: string, icon: React.ElementType, children: React.ReactNode}) => (
    <div className="flex-1 flex flex-col bg-background text-foreground p-8 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8">
        <Icon className="w-8 h-8 text-muted-foreground"/>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <Card className="flex-1">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
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
                <div key={`${item}-${index}`} className="p-3 flex items-center justify-between rounded-md hover:bg-muted/50">
                  <span className="truncate cursor-pointer hover:underline" onClick={() => handleNavigation(activeTabId, item)}>{item}</span>
                  <Button variant="ghost" size="icon" onClick={() => toast({title: "Clearing specific history item is not implemented."})}>
                    <Trash2 className="w-4 h-4 text-muted-foreground"/>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
              <HistoryIcon className="w-16 h-16 mb-4"/>
              <p>Your browsing history is empty.</p>
            </div>
          )}
        </GenericInternalPage>
    );
  };
  
  const BookmarksPage = () => (
      <GenericInternalPage title="Bookmarks" icon={BookMarked}>
        {bookmarks.length > 0 ? (
           <div className="space-y-2">
           {bookmarks.map((bookmark, index) => (
             <div key={`${bookmark.url}-${index}`} className="p-3 flex items-center justify-between rounded-md hover:bg-muted/50">
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
             </div>
           ))}
         </div>
        ) : (
          <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
            <BookMarked className="w-16 h-16 mb-4"/>
            <p>You have no bookmarks saved.</p>
          </div>
        )}
      </GenericInternalPage>
  );

  const DeveloperConsole = () => (
    <Sheet open={isConsoleOpen} onOpenChange={setIsConsoleOpen}>
      <SheetContent side="bottom" className="h-1/2 flex flex-col p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Developer Console</SheetTitle>
        </SheetHeader>
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

  const LoadFailedContent = ({ url }: { url: string }) => (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <MessageSquareWarning className="w-16 h-16 text-destructive mb-4" />
      <h2 className="text-2xl font-bold mb-2">This page can't be displayed</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        The website at <span className="font-mono bg-muted p-1 rounded-md text-sm">{url}</span> may not allow itself to be embedded. Some sites use this for security.
      </p>
      <Button onClick={() => window.open(url, '_blank')}>
        <ExternalLink className="w-4 h-4 mr-2" />
        Open in New Tab
      </Button>
    </div>
  );

  const renderCurrentPage = () => {
    if (!activeTab) return <NewTabPage />;
    const url = activeTab.history[activeTab.currentIndex];

    if (activeTab.loadFailed) {
      return <LoadFailedContent url={url} />;
    }

    switch (url) {
        case DEFAULT_URL:
            return <NewTabPage />;
        case 'about:settings':
            return <SettingsPage />;
        case 'about:startup-checklist':
            return <StartupChecklistPage />;
        case 'about:history':
            return <HistoryPage />;
        case 'about:bookmarks':
            return <BookmarksPage />;
        case 'about:downloads':
            return <GenericInternalPage title="Downloads" icon={Download}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Download className="w-16 h-16 mb-4"/><p>There are no downloads to show.</p></div></GenericInternalPage>;
        case 'about:media':
            return <GenericInternalPage title="Media" icon={Play}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Play className="w-16 h-16 mb-4"/><p>There is no media content to show.</p></div></GenericInternalPage>;
        case 'about:passwords':
            return <GenericInternalPage title="Password Manager" icon={KeyRound}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><KeyRound className="w-16 h-16 mb-4"/><p>A full password manager is not implemented in this prototype.</p><p className="text-sm mt-2">In a real browser, this page would list your saved credentials.</p></div></GenericInternalPage>;
        case 'about:performance':
            return <GenericInternalPage title="Performance" icon={Gauge}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Gauge className="w-16 h-16 mb-4"/><p>Performance settings are conceptual in this prototype.</p><p className="text-sm mt-2">Here you would manage memory and energy saver modes.</p></div></GenericInternalPage>;
        case 'about:about':
            return <GenericInternalPage title="About Aisha" icon={Info}>
                <div className="flex flex-col h-full items-center justify-center text-center">
                    <h1 className="text-6xl font-bold mb-4" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
                    <p className="text-muted-foreground">Version 1.0 (Prototype)</p>
                    <p className="text-muted-foreground mt-2">Copyright © 2024. All rights reserved.</p>
                </div>
            </GenericInternalPage>;
        default:
            return (
              <iframe
                  ref={(el) => {
                    if (el && activeTab) {
                      iframeRefs.current[activeTab.id] = el;
                    }
                  }}
                  src={url}
                  className="w-full h-full border-0"
                  onLoad={() => handleIframeLoad(activeTab.id)}
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
                  allow="geolocation; microphone; camera; midi; encrypted-media; fullscreen; display-capture"
                />
            );
    }
  };

  const ChatHistorySidebarContent = () => (
    <>
      <SidebarHeader>
        <div className="flex h-12 w-full items-center gap-2 p-2 justify-center data-[state=open]:justify-start">
            <Sparkles className="h-7 w-7 text-purple-400 shrink-0" />
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">Chat History</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="p-2 flex flex-col h-full">
          <Button variant="outline" className="w-full justify-center data-[state=open]:justify-start">
              <Plus className="h-4 w-4" />
              <span className="ml-2 group-data-[collapsible=icon]:hidden">New Chat</span>
          </Button>
          <ScrollArea className="flex-1 mt-4 group-data-[collapsible=icon]:hidden">
              <div className="space-y-1">
                  <p className="px-2 text-xs font-semibold text-muted-foreground/80">Today</p>
                  <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Summarize recent news about AI</Button>
                  <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Help me debug a React component</Button>
                  <p className="px-2 pt-4 text-xs font-semibold text-muted-foreground/80">Yesterday</p>
                  <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Brainstorm ideas for a new side project</Button>
                  <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Translate 'Hello World' to Japanese</Button>
              </div>
          </ScrollArea>
        </div>
      </SidebarContent>
    </>
  );

  const NavigationSidebarContent = () => (
    <>
      <SidebarHeader>
          <SidebarMenuButton
              onClick={() => handleNavigation(activeTabId, 'about:newtab')}
              tooltip={{ children: 'Browse', side: 'right' }}
              className="w-full justify-center data-[state=open]:justify-start h-12"
          >
              <Globe className="h-7 w-7 text-cyan-400 shrink-0" />
              <span className="font-semibold text-lg">Browse</span>
          </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
          <SidebarMenu>
              {navItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                          onClick={item.action}
                          tooltip={{ children: item.label, side: 'right' }}
                          className="w-full justify-center data-[state=open]:justify-start h-12"
                      >
                          <item.icon className="size-6" />
                          <span>{item.label}</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              ))}
          </SidebarMenu>
      </SidebarContent>
    </>
  );
  
  const ChatHistorySheetContent = () => (
    <div className="flex flex-col h-full py-4">
        <div className="mb-4 px-4">
            <div className="flex items-center justify-start w-full p-2 rounded-lg">
                <Sparkles className="h-7 w-7 text-purple-400" />
                <span className="ml-4 font-semibold text-lg">Chat History</span>
            </div>
        </div>
        <div className="px-4 mb-4">
            <Button variant="outline" className="w-full justify-center">
                <Plus className="h-4 w-4 mr-2" />
                New Chat
            </Button>
        </div>
        <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 px-2">
                <p className="px-2 text-xs font-semibold text-muted-foreground/80">Today</p>
                <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Summarize recent news about AI</Button>
                <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Help me debug a React component</Button>
                <p className="px-2 pt-4 text-xs font-semibold text-muted-foreground/80">Yesterday</p>
                <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Brainstorm ideas for a new side project</Button>
                <Button variant="ghost" className="w-full h-auto py-2 justify-start text-sm truncate text-left">Translate 'Hello World' to Japanese</Button>
            </div>
        </ScrollArea>
        <div className="mt-auto px-4">
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => toast({ title: 'Logout is not implemented in this prototype.' })}>
                <LogOut className="h-6 w-6" />
                <span className="ml-4">Logout</span>
            </button>
        </div>
    </div>
  );

  const NavigationSheetContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="mb-8 px-4">
          <button onClick={() => { handleNavigation(activeTabId, 'about:about'); setMobileMenuOpen(false); }} className="flex items-center justify-start w-full p-2 rounded-lg hover:bg-sidebar-accent">
              <AishaLogo width={28} height={28} />
              <span className="ml-4 font-semibold text-lg">Aisha</span>
          </button>
      </div>
      <nav className="flex flex-col items-start w-full px-2 space-y-2 flex-1">
          {mobileNavItems.map((item, index) => (
              <button key={index} onClick={() => { item.action(); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <item.icon className="h-6 w-6" />
                  <span className="ml-4">{item.label}</span>
              </button>
          ))}
      </nav>
      <div className="mt-auto px-4">
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => toast({ title: 'Logout is not implemented in this prototype.' })}>
              <LogOut className="h-6 w-6" />
              <span className="ml-4">Logout</span>
          </button>
      </div>
    </div>
  );
  
  if (isAuthenticated === null) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
  }

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[fontSize] || 'text-base';

  return (
    <div className={cn("flex h-screen bg-background text-foreground overflow-hidden", fontSizeClass)}>
      <Sidebar collapsible="icon">
          {isAssistantOpen ? <ChatHistorySidebarContent/> : <NavigationSidebarContent />}
          <SidebarFooter>
              <SidebarMenu>
                  <SidebarMenuItem>
                      <SidebarTrigger asChild>
                          <SidebarMenuButton
                              tooltip={{ children: 'Toggle sidebar', side: 'right' }}
                              className="w-full justify-center data-[state=open]:justify-start h-12"
                          >
                              <PanelLeft className="size-6" />
                              <span className="group-data-[collapsible=icon]:hidden">Collapse</span>
                          </SidebarMenuButton>
                      </SidebarTrigger>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                      <SidebarMenuButton
                          tooltip={{ children: 'Logout', side: 'right' }}
                           onClick={() => toast({ title: 'Logout is not implemented in this prototype.' })}
                          className="w-full justify-center data-[state=open]:justify-start h-12"
                      >
                          <LogOut className="size-6" />
                          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
      </Sidebar>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex-shrink-0">
          <div className="flex items-end h-10 pt-1 px-1 bg-background draggable">
            <div className="flex items-end non-draggable">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        onClick={() => setActiveTabId(tab.id)}
                        className={cn(`relative flex items-center font-medium h-9 px-4 rounded-t-lg cursor-pointer`,
                          activeTabId === tab.id
                            ? `z-10 ${isIncognito ? 'bg-gray-800 text-white' : 'bg-card'}`
                            : `${isIncognito ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-secondary text-secondary-foreground hover:bg-card/80'} border-r border-border`
                        )}
                    >
                        {isIncognito ? <ShieldOff className="w-4 h-4 mr-2 text-gray-400" /> : <Globe className="w-4 h-4 mr-2 text-muted-foreground" />}
                        <span className="truncate max-w-[150px]">
                            {tab.isLoading ? "Loading..." : tab.title}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 rounded-full hover:bg-muted-foreground/20" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                <Button variant="ghost" size="icon" className="h-9 w-9 ml-1 self-center" onClick={addTab}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex-grow h-full" />
          </div>
          <div className={cn(`flex items-center gap-2 p-2 rounded-none`, isIncognito ? 'bg-gray-800' : 'bg-card')}>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={goBack} disabled={!activeTab || activeTab.currentIndex === 0}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={goForward} disabled={!activeTab || activeTab.currentIndex >= activeTab.history.length - 1}>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={reload}>
                {activeTab?.isLoading ? <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div> : <RefreshCw className="w-5 h-5" />}
              </Button>
              {showHomeButton && (<Button variant="ghost" size="icon" onClick={goHome}>
                <Home className="w-5 h-5" />
              </Button>)}
            </div>
            <div className="flex items-center bg-secondary focus-within:bg-card focus-within:shadow-md transition-all rounded-full w-full px-4 py-1.5">
              {isInternalPage ? (
                  <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-0.5">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Aisha</span>
                      </div>
                  </div>
              ) : (
                  isIncognito ? <ShieldOff className="w-4 h-4 mr-2 text-muted-foreground" /> : <Lock className="w-4 h-4 mr-2 text-muted-foreground" />
              )}
              <Input
                type="text"
                value={isInternalPage ? inputValue.replace('about:', 'aisha://') : inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
                className="bg-transparent border-none h-auto p-0 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Ask anything or navigate..."
              />
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={copyLink}>
                      <LinkIcon className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Copy link</p></TooltipContent>
                </Tooltip>
                <Tooltip>
                   <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleBookmark}>
                      <Star className={`w-5 h-5 text-muted-foreground transition-colors ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'hover:text-yellow-400'}`} />
                    </Button>
                   </TooltipTrigger>
                   <TooltipContent><p>Bookmark this tab</p></TooltipContent>
                </Tooltip>
                 <Popover open={isTranslateOpen} onOpenChange={setIsTranslateOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7" 
                        onClick={() => {
                          if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith('about:')) {
                            setIsTranslateOpen(v => !v);
                          } else {
                            toast({ title: "Can't translate internal pages." });
                          }
                        }}>
                        <Languages className="w-5 h-5 text-muted-foreground"/>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-auto p-0">
                      <div className="flex items-center gap-1 p-1">
                          <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-auto px-3 py-1 text-sm border-primary"
                              onClick={() => {
                                   const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(currentUrl)}`;
                                   handleNavigation(activeTabId, googleTranslateUrl);
                                   setIsTranslateOpen(false);
                              }}
                          >
                              English
                          </Button>
                          <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-auto px-3 py-1 text-sm"
                               onClick={() => {
                                   const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=hi&u=${encodeURIComponent(currentUrl)}`;
                                   handleNavigation(activeTabId, googleTranslateUrl);
                                   setIsTranslateOpen(false);
                              }}
                          >
                              Hindi
                          </Button>
                          
                          <div className='flex-grow' />

                          <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <MoreVertical className="w-4 h-4" />
                                  </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Choose another language</DropdownMenuItem>
                                  <DropdownMenuItem>Never translate this site</DropdownMenuItem>
                              </DropdownMenuContent>
                          </DropdownMenu>

                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsTranslateOpen(false)}>
                              <X className="w-4 h-4" />
                          </Button>
                      </div>
                      <Separator />
                      <div className="p-2">
                           <p className="text-xs text-muted-foreground">Google Translate</p>
                      </div>
                  </PopoverContent>
                 </Popover>
              </div>
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant={isAssistantOpen ? "secondary" : "ghost"} size="sm" className="h-7" onClick={() => setIsAssistantOpen(!isAssistantOpen)}>
                {isAssistantOpen ? <X className="w-4 h-4 mr-2"/> : <Sparkles className="w-4 h-4 mr-2" />}
                Assistant
              </Button>
            </div>
            
            <div className="flex items-center gap-2 ml-2">
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => window.print()}>
                          <Download className="w-5 h-5"/>
                      </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Download page</p>
                  </TooltipContent>
              </Tooltip>
              {showBookmarksButton && <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:inline-flex" onClick={() => handleNavigation(activeTabId, 'about:bookmarks')}><BookMarked className="w-5 h-5"/></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Bookmarks</p>
                  </TooltipContent>
              </Tooltip>}
              <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:inline-flex" onClick={() => handleNavigation(activeTabId, 'about:downloads')}><Download className="w-5 h-5"/></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Downloads</p>
                  </TooltipContent>
              </Tooltip>
               <Tooltip>
                  <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 hidden md:inline-flex" onClick={() => handleNavigation(activeTabId, 'about:history')}><HistoryIcon className="w-5 h-5"/></Button>
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>History</p>
                  </TooltipContent>
              </Tooltip>
              <Separator orientation="vertical" className="h-6 mx-1 hidden md:block" />
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                      <AppGridIcon className="w-5 h-5" />
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                  <ScrollArea className="h-96">
                      <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-4">
                      {companyApps.map((app) => (
                          <button
                          key={app.name}
                          onClick={() => window.open(app.url, '_blank')}
                          className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent text-center"
                          >
                          <div className="w-12 h-12 flex items-center justify-center bg-secondary rounded-full">
                              <app.icon className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <span className="text-xs">{app.name}</span>
                          </button>
                      ))}
                      </div>
                  </ScrollArea>
                  </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                      <Avatar className="w-7 h-7">
                      <AvatarImage src="https://picsum.photos/seed/avatar/32/32" />
                      <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                  </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => toast({title: 'Profile management is a concept for this prototype.'})}>
                          <User className="mr-2 h-4 w-4"/>
                          <span>Manage Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toast({title: 'Signing out is not implemented in this prototype.'})}>
                          <LogOut className="mr-2 h-4 w-4"/>
                          <span>Sign Out</span>
                      </DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="hidden md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
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
                        <DropdownMenuItem onSelect={() => window.open(window.location.href + '?incognito=true')}>
                            <ShieldOff className="mr-2 h-4 w-4" />
                            <span>New Incognito window</span>
                            <DropdownMenuShortcut>Ctrl+Shift+N</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:history')}>
                            <HistoryIcon className="mr-2 h-4 w-4" />
                            <span>History</span>
                            <DropdownMenuShortcut>Ctrl+H</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:downloads')}>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Downloads</span>
                            <DropdownMenuShortcut>Ctrl+J</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
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
                                <DropdownMenuItem onSelect={() => toast({title: "Tab groups are not implemented in this prototype."})}>
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
                                <DropdownMenuItem onSelect={() => toast({title: "Extensions are not supported in this prototype."})}>
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
                        <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:passwords')}>
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>Passwords and autofill</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => toast({title: "Clearing browsing data is not implemented."})}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Clear browsing data...</span>
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
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setZoomLevel(100)}><Square className="w-4 h-4"/></Button>
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
                        <DropdownMenuItem onSelect={() => {
                            if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith('about:')) {
                                const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(currentUrl)}`;
                                handleNavigation(activeTabId, googleTranslateUrl);
                            } else {
                                toast({ title: "Can't translate internal pages." });
                            }
                        }}>
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
                                    <DropdownMenuItem onSelect={handleFind}>
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
                                <DropdownMenuItem onSelect={() => toast({title: "Casting is not supported in this prototype."})}>
                                    <Cast className="mr-2 h-4 w-4" />
                                    <span>Cast...</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => window.print()}>
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Save page as...</span>
                                    <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsAddShortcutOpen(true)}>
                                    <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                                    <span>Create shortcut...</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={copyLink}>
                                    <LinkIcon className="mr-2 h-4 w-4" />
                                    <span>Copy link</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => toast({title: "Sending to other devices is not implemented in this prototype."})}>
                                    <Computer className="mr-2 h-4 w-4" />
                                    <span>Send to your devices</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={createQRCode}>
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
                            <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:settings')}>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Customize Aisha</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:performance')}>
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
                                <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:about')}>
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

                        <DropdownMenuItem onSelect={() => toast({title: "Exit is not available in a web application."})}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Exit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="block md:hidden">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9">
                              <MoreVertical className="w-5 h-5" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                          <DropdownMenuItem onSelect={addTab}>
                              <Plus className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>New tab</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => window.open(window.location.href + '?incognito=true')}>
                              <ShieldOff className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>New Incognito window</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:history')}>
                              <HistoryIcon className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>History</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:downloads')}>
                              <Download className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Downloads</span>
                          </DropdownMenuItem>
                           <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:bookmarks')}>
                              <Star className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Bookmarks</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => toast({ title: "Recent tabs are not implemented in this prototype." })}>
                              <Laptop className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Recent tabs</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={handleShare}>
                              <Share className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Share...</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={handleFind}>
                              <Search className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Find in page</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => {
                              if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith('about:')) {
                                  const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(currentUrl)}`;
                                  handleNavigation(activeTabId, googleTranslateUrl);
                              } else {
                                  toast({ title: "Can't translate internal pages." });
                              }
                          }}>
                              <Languages className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Translate...</span>
                          </DropdownMenuItem>
                           <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={handleInstallClick}>
                              <PlusSquare className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Add to Home screen</span>
                          </DropdownMenuItem>
                          <DropdownMenuCheckboxItem
                              checked={isDesktopSite}
                              onCheckedChange={(checked) => {
                                  setIsDesktopSite(checked as boolean);
                                  toast({ title: `Desktop site ${checked ? 'enabled' : 'disabled'}. Page reload may be required.` });
                              }}
                          >
                              <div className="flex items-center">
                                  <Laptop className="mr-4 h-5 w-5 text-muted-foreground" />
                                  <span>Desktop site</span>
                              </div>
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:settings')}>
                              <Settings className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Settings</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setIsFeedbackOpen(true)}>
                              <HelpCircle className="mr-4 h-5 w-5 text-muted-foreground" />
                              <span>Help & feedback</span>
                          </DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <main id="browser-content-area" className="flex-1 bg-card rounded-lg overflow-auto relative transition-all duration-300">
              {tabs.map(tab => (
                  <div key={tab.id} className={`w-full h-full flex flex-col ${activeTabId === tab.id ? 'block' : 'hidden'}`}>
                      {renderCurrentPage()}
                  </div>
              ))}
               {isFindOpen && (
                  <Card className="absolute top-2 right-2 w-80 p-2 shadow-lg z-50">
                      <div className="flex items-center gap-2">
                          <Input 
                              placeholder="Find in page" 
                              value={findInput}
                              onChange={e => setFindInput(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleFind()}
                              className="h-8"
                              autoFocus
                          />
                          <Button size="sm" onClick={handleFind}>Find</Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsFindOpen(false)}><X className="w-4 h-4"/></Button>
                      </div>
                  </Card>
              )}
          </main>
          {!isMobile && isAssistantOpen && <AishaAssistant 
            isMobile={false}
            assistantMessages={assistantMessages}
            setAssistantMessages={setAssistantMessages}
            isAssistantLoading={isAssistantLoading}
            assistantInput={assistantInput}
            setAssistantInput={setAssistantInput}
            handleAssistantSubmit={() => handleAssistantSubmit()}
            toast={toast}
            startVoiceSearch={startVoiceSearch}
            listeningState={listeningState}
            voiceSearchSource={voiceSearchSource}
            setIsAssistantOpen={setIsAssistantOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            toggleMainSidebar={toggleMainSidebar}
            setMobileSheetContent={setMobileSheetContent}
            handleInstallClick={handleInstallClick}
            handleAssistantSearch={handleAssistantSearch}
            handleAttachment={handleAttachment}
          />}
        </div>
      </div>

      <Dialog open={!!qrCodeUrl} onOpenChange={(isOpen) => !isOpen && setQrCodeUrl('')}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code for this page</DialogTitle>
            <DialogDescription>
              Scan this code to open <span className="font-bold">{currentUrl}</span> on another device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4">
            {qrCodeUrl && <Image src={qrCodeUrl} alt="QR Code" width={150} height={150} />}
          </div>
        </DialogContent>
      </Dialog>
      
      <input
        type="file"
        ref={attachmentInputRef}
        onChange={handleAttachmentFileChange}
        className="hidden"
      />

      <DeveloperConsole />
      <FeedbackSheet />
      <VoiceSearchOverlay 
        state={listeningState}
        onClose={stopVoiceSearch}
        onRetry={retryVoiceSearch}
        transcript={interimTranscript}
      />
      <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-[280px] p-0 bg-sidebar text-sidebar-foreground">
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  {mobileSheetContent === 'chat' ? 'Chat History and options' : 'Main navigation and options'}
                </SheetDescription>
              </SheetHeader>
              {mobileSheetContent === 'chat' ? <ChatHistorySheetContent /> : <NavigationSheetContent />}
          </SheetContent>
      </Sheet>
      {isMobile && (
          <Dialog open={isAssistantOpen} onOpenChange={setIsAssistantOpen}>
              <DialogContent className="h-screen w-screen max-w-full p-0 flex flex-col gap-0 border-0 rounded-none">
                  <DialogHeader className="sr-only">
                    <DialogTitle>AI Assistant</DialogTitle>
                    <DialogDescription>
                      This is the AI assistant panel. You can ask it anything.
                    </DialogDescription>
                  </DialogHeader>
                  <AishaAssistant 
                    isMobile={true}
                    assistantMessages={assistantMessages}
                    setAssistantMessages={setAssistantMessages}
                    isAssistantLoading={isAssistantLoading}
                    assistantInput={assistantInput}
                    setAssistantInput={setAssistantInput}
                    handleAssistantSubmit={() => handleAssistantSubmit()}
                    toast={toast}
                    startVoiceSearch={startVoiceSearch}
                    listeningState={listeningState}
                    voiceSearchSource={voiceSearchSource}
                    setIsAssistantOpen={setIsAssistantOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                    toggleMainSidebar={toggleMainSidebar}
                    setMobileSheetContent={setMobileSheetContent}
                    handleInstallClick={handleInstallClick}
                    handleAssistantSearch={handleAssistantSearch}
                    handleAttachment={handleAttachment}
                  />
              </DialogContent>
          </Dialog>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="md:hidden fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        onClick={() => { setMobileSheetContent('nav'); setMobileMenuOpen(true); }}
      >
        <Menu className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default function BrowserPage() {
  return (
    <SidebarProvider>
      <BrowserApp />
    </SidebarProvider>
  )
}
    

    

    

    

    

    



    



    

    

    






    




      










    
