

"use client";

import React, { useState, useRef, useEffect, KeyboardEvent, useCallback, useMemo } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Link from 'next/link';
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
  Upload,
  Check,
  ChevronDown,
  Circle as CircleIcon,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { CustomGroupIcon } from "@/components/icons/CustomGroupIcon";
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"


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

const initialToolbarSettings = {
  showPayments: true,
  showAddresses: true,
  showBookmarks: true,
  showReadingList: true,
  showHistory: true,
  showDownloads: true,
  showDeleteData: true,
  showPrint: true,
  showGoogleLens: true,
  showTranslate: true,
  showQRCode: true,
  showCast: true,
  showReadingMode: true,
  showCopyLink: true,
  showSendToDevices: true,
  showTaskManager: true,
  showDevTools: true,
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
  group?: {
    name: string;
    color: string;
  };
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

type SearchHistoryItem = {
  query: string;
};

const groupColors = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#22c55e", // green-500
  "#eab308", // yellow-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#f97316", // orange-500
];

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
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white focus-visible:outline-none">
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
  setActivePanel,
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
  setActivePanel: (panel: string | null) => void;
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
      : "h-full w-full border-l border-border bg-background/80 backdrop-blur-sm"
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
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Link href="/assistant">
                <SquareArrowOutUpRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Open as page</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button variant="ghost" size="icon" className={cn("h-8 w-8 rounded-full", isMobile && "mr-10")} onClick={() => {
        setAssistantMessages([]);
        toast({ title: "New chat started." });
      }}>
          <PlusSquare className="w-5 h-5 text-muted-foreground" />
      </Button>
    </div>
     <ScrollArea className="flex-1 pr-2 scrollbar-hide">
      <div className="p-2 space-y-4">
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
                className={`max-w-[80%] rounded-lg px-3 py-2 text-xs font-light ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                {message.content}
              </div>
               {message.role === 'user' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://picsum.photos/seed/prakashbabu/100/100" />
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
    <div className="p-2 bg-background/70 rounded-lg mt-2">
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

const ToolbarSettingsPanel = ({
  setCustomizeView,
  setIsOpen,
  isMobile = false,
  toolbarSettings,
  onSettingChange,
}: {
  setCustomizeView: (view: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
  toolbarSettings: any;
  onSettingChange: (key: string, value: boolean) => void;
}) => {
  return (
    <div className={cn(
        "flex flex-col bg-background/95 backdrop-blur-sm",
        isMobile ? "flex-1 h-full" : "h-full w-full border-l border-border"
    )}>
      <div className="flex items-center p-3 border-b shrink-0">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full mr-2" onClick={() => setCustomizeView('main')}>
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Button>
        <h2 className="text-base font-semibold">Toolbar</h2>
        <div className="flex-grow" />
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
      <ScrollArea className="flex-1 scrollbar-hide">
        <div className="p-4 space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Your Aisha</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-payments" className="text-sm font-normal flex items-center gap-3"><CreditCard className="w-5 h-5 text-muted-foreground"/> Payment methods</Label>
                <Switch id="show-payments" checked={toolbarSettings.showPayments} onCheckedChange={(val) => onSettingChange('showPayments', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-addresses" className="text-sm font-normal flex items-center gap-3"><MapPin className="w-5 h-5 text-muted-foreground"/> Addresses and more</Label>
                <Switch id="show-addresses" checked={toolbarSettings.showAddresses} onCheckedChange={(val) => onSettingChange('showAddresses', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-bookmarks" className="text-sm font-normal flex items-center gap-3"><BookMarked className="w-5 h-5 text-muted-foreground"/> Bookmarks</Label>
                <Switch id="show-bookmarks" checked={toolbarSettings.showBookmarks} onCheckedChange={(val) => onSettingChange('showBookmarks', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-reading-list" className="text-sm font-normal flex items-center gap-3"><BookCopy className="w-5 h-5 text-muted-foreground"/> Reading list</Label>
                <Switch id="show-reading-list" checked={toolbarSettings.showReadingList} onCheckedChange={(val) => onSettingChange('showReadingList', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-history" className="text-sm font-normal flex items-center gap-3"><HistoryIcon className="w-5 h-5 text-muted-foreground"/> History</Label>
                <Switch id="show-history" checked={toolbarSettings.showHistory} onCheckedChange={(val) => onSettingChange('showHistory', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-downloads" className="text-sm font-normal flex items-center gap-3"><Download className="w-5 h-5 text-muted-foreground"/> Downloads</Label>
                <Switch id="show-downloads" checked={toolbarSettings.showDownloads} onCheckedChange={(val) => onSettingChange('showDownloads', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-delete-data" className="text-sm font-normal flex items-center gap-3"><Trash2 className="w-5 h-5 text-muted-foreground"/> Delete browsing data</Label>
                <Switch id="show-delete-data" checked={toolbarSettings.showDeleteData} onCheckedChange={(val) => onSettingChange('showDeleteData', val)} />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader><CardTitle className="text-base">Tools and actions</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-print" className="text-sm font-normal flex items-center gap-3"><Printer className="w-5 h-5 text-muted-foreground"/> Print</Label>
                <Switch id="show-print" checked={toolbarSettings.showPrint} onCheckedChange={(val) => onSettingChange('showPrint', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-google-lens" className="text-sm font-normal flex items-center gap-3"><Camera className="w-5 h-5 text-muted-foreground"/> Search with Google Lens</Label>
                <Switch id="show-google-lens" checked={toolbarSettings.showGoogleLens} onCheckedChange={(val) => onSettingChange('showGoogleLens', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-translate" className="text-sm font-normal flex items-center gap-3"><Languages className="w-5 h-5 text-muted-foreground"/> Translate</Label>
                <Switch id="show-translate" checked={toolbarSettings.showTranslate} onCheckedChange={(val) => onSettingChange('showTranslate', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-qr-code" className="text-sm font-normal flex items-center gap-3"><QrCode className="w-5 h-5 text-muted-foreground"/> Create QR Code</Label>
                <Switch id="show-qr-code" checked={toolbarSettings.showQRCode} onCheckedChange={(val) => onSettingChange('showQRCode', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-cast" className="text-sm font-normal flex items-center gap-3"><Cast className="w-5 h-5 text-muted-foreground"/> Cast</Label>
                <Switch id="show-cast" checked={toolbarSettings.showCast} onCheckedChange={(val) => onSettingChange('showCast', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-reading-mode" className="text-sm font-normal flex items-center gap-3"><BookOpen className="w-5 h-5 text-muted-foreground"/> Reading mode</Label>
                <Switch id="show-reading-mode" checked={toolbarSettings.showReadingMode} onCheckedChange={(val) => onSettingChange('showReadingMode', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-copy-link" className="text-sm font-normal flex items-center gap-3"><LinkIcon className="w-5 h-5 text-muted-foreground"/> Copy link</Label>
                <Switch id="show-copy-link" checked={toolbarSettings.showCopyLink} onCheckedChange={(val) => onSettingChange('showCopyLink', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-send-to-devices" className="text-sm font-normal flex items-center gap-3"><Computer className="w-5 h-5 text-muted-foreground"/> Send to your devices</Label>
                <Switch id="show-send-to-devices" checked={toolbarSettings.showSendToDevices} onCheckedChange={(val) => onSettingChange('showSendToDevices', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-task-manager" className="text-sm font-normal flex items-center gap-3"><Gauge className="w-5 h-5 text-muted-foreground"/> Task manager</Label>
                <Switch id="show-task-manager" checked={toolbarSettings.showTaskManager} onCheckedChange={(val) => onSettingChange('showTaskManager', val)} />
              </div>
              <div className="flex items-center justify-between py-2">
                <Label htmlFor="show-dev-tools" className="text-sm font-normal flex items-center gap-3"><Code className="w-5 h-5 text-muted-foreground"/> Developer tools</Label>
                <Switch id="show-dev-tools" checked={toolbarSettings.showDevTools} onCheckedChange={(val) => onSettingChange('showDevTools', val)} />
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 bg-secondary">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-normal text-muted-foreground">To rearrange buttons on the toolbar, drag them</span>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}


const CustomizePanelMain = ({
  setIsOpen,
  setCustomizeView,
  handleThemeChange,
  theme,
  isMobile = false,
  showShortcuts,
  setShowShortcuts,
  shortcutSetting,
  setShortcutSetting,
  showCards,
  setShowCards,
  showContinueWithTabs,
  setShowContinueWithTabs,
  handleResetToDefault,
  followDeviceTheme,
  setFollowDeviceTheme,
  toast,
}) => {
  const handleModeChange = (mode) => {
    if (!followDeviceTheme) {
      handleThemeChange(mode);
    }
  };
  
  const handleDeviceModeChange = (checked) => {
    setFollowDeviceTheme(checked);
    handleThemeChange(checked ? 'device' : theme);
  };

  const handleShortcutSettingChange = (value: string) => {
    setShortcutSetting(value);
  };

  const handleShowCardsChange = (checked: boolean) => {
    setShowCards(checked);
  };
  
  const colors = [
    { bg: '#fdd663', selected: false }, { bg: '#f28b82', selected: false }, { bg: '#d4e1f5', selected: false }, { bg: '#e8daef', selected: false },
    { bg: '#a3d1b0', selected: false }, { bg: '#fde293', selected: false }, { bg: '#e9a18d', selected: false }, { bg: '#d3bde0', selected: false },
    { bg: '#4274e0', selected: false }, { bg: '#e8eaed', selected: true }, { bg: '#202124', selected: false },
  ];

  return (
    <div className={cn(
        "flex flex-col bg-background/95 backdrop-blur-sm",
        isMobile ? "flex-1 h-full" : "h-full w-full border-l border-border"
    )}>
      <div className="flex items-center p-3 border-b shrink-0">
        <h2 className="text-base font-semibold">Customize Aisha</h2>
        <div className="flex-grow" />
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
      <ScrollArea className="flex-1 scrollbar-hide">
        <div className="p-4 space-y-4">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-center text-sm font-normal" onClick={() => toast({ title: "Theme marketplace is not implemented." })}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Change theme
              </Button>

              <div className="flex justify-between items-center p-1 rounded-full bg-secondary">
                 <Button variant={!followDeviceTheme && theme === 'light' ? 'secondary' : 'ghost'} size="sm" className="flex-1 h-8 rounded-full shadow-sm data-[variant=secondary]:bg-background" onClick={() => handleModeChange('light')}>
                  <Sun className="mr-2 h-4 w-4" /> Light
                </Button>
                <Button variant={!followDeviceTheme && theme === 'dark' ? 'secondary' : 'ghost'} size="sm" className="flex-1 h-8 rounded-full shadow-sm data-[variant=secondary]:bg-background" onClick={() => handleModeChange('dark')}>
                  <Moon className="mr-2 h-4 w-4" /> Dark
                </Button>
                <Button variant={followDeviceTheme ? 'secondary' : 'ghost'} size="sm" className="flex-1 h-8 rounded-full" onClick={() => handleDeviceModeChange(true)}>
                  <Laptop className="mr-2 h-4 w-4" /> Device
                </Button>
              </div>

              <div className="grid grid-cols-6 gap-2 pt-2 justify-items-center">
                {colors.map((color, i) => (
                  <TooltipProvider key={i}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="w-10 h-10 rounded-full border-2 border-transparent focus-visible:border-primary flex items-center justify-center relative group"
                          onClick={() => toast({ title: "Custom color themes are not implemented." })}>
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color.bg }} />
                          {color.selected && (
                            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                              <Check className="text-white" />
                            </div>
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent><p>Default</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                 <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center" onClick={() => toast({ title: "Custom color picker is not implemented." })}>
                        <Pencil className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent><p>Custom Color</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Separator />
              
              <div className="flex items-center justify-between">
                <Label htmlFor="follow-device" className="text-sm font-normal">Follow device colors</Label>
                <Switch id="follow-device" checked={followDeviceTheme} onCheckedChange={handleDeviceModeChange} />
              </div>
              
              <Separator />

              <Button variant="ghost" className="w-full justify-start text-sm font-normal h-9" onClick={handleResetToDefault}>
                 <RefreshCw className="mr-2 h-4 w-4"/>
                 Reset to Default
              </Button>
            </CardContent>
          </Card>

          <Card>
             <CardContent className="p-2">
                <Button variant="ghost" className="w-full justify-between text-sm font-normal h-10" onClick={() => setCustomizeView('toolbar')}>
                    <span>Toolbar</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
             </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Shortcuts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                  <Label htmlFor="show-shortcuts" className="text-sm font-normal">Show shortcuts</Label>
                  <Switch id="show-shortcuts" checked={showShortcuts} onCheckedChange={setShowShortcuts} />
               </div>
               <RadioGroup disabled={!showShortcuts} value={shortcutSetting} onValueChange={handleShortcutSettingChange}>
                  <div className="flex items-start space-x-3 py-2">
                    <RadioGroupItem value="my-shortcuts" id="my-shortcuts" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="my-shortcuts" className="font-normal cursor-pointer">My shortcuts</Label>
                      <p className="text-xs text-muted-foreground">Shortcuts are curated by you</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 py-2">
                     <RadioGroupItem value="most-visited" id="most-visited" />
                     <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="most-visited" className="font-normal cursor-pointer">Most visited sites</Label>
                        <p className="text-xs text-muted-foreground">Shortcuts are suggested based on websites you visit often</p>
                     </div>
                  </div>
               </RadioGroup>
            </CardContent>
          </Card>
          
           <Card>
              <CardHeader>
                <CardTitle className="text-base">Cards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-cards" className="text-sm font-normal">Show cards</Label>
                  <Switch id="show-cards" checked={showCards} onCheckedChange={handleShowCardsChange} />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="continue-tabs" 
                      disabled={!showCards}
                      checked={showContinueWithTabs} 
                      onCheckedChange={(val) => setShowContinueWithTabs(val as boolean)}
                    />
                    <Label htmlFor="continue-tabs" className="text-sm font-normal">Continue with these tabs</Label>
                </div>
              </CardContent>
           </Card>
        </div>
      </ScrollArea>
    </div>
  );
};


const CustomizePanel = ({
  setIsOpen,
  handleThemeChange,
  theme,
  isMobile = false,
  showShortcuts,
  setShowShortcuts,
  shortcutSetting,
  setShortcutSetting,
  showCards,
  setShowCards,
  showContinueWithTabs,
  setShowContinueWithTabs,
  handleResetToDefault,
  followDeviceTheme,
  setFollowDeviceTheme,
  toast,
  toolbarSettings,
  onToolbarSettingChange,
}: {
  setIsOpen: (isOpen: boolean) => void;
  handleThemeChange: (theme: 'light' | 'dark' | 'device') => void;
  theme: string;
  isMobile?: boolean;
  showShortcuts: boolean;
  setShowShortcuts: (show: boolean) => void;
  shortcutSetting: string;
  setShortcutSetting: (setting: string) => void;
  showCards: boolean;
  setShowCards: (show: boolean) => void;
  showContinueWithTabs: boolean;
  setShowContinueWithTabs: (show: boolean) => void;
  handleResetToDefault: () => void;
  followDeviceTheme: boolean;
  setFollowDeviceTheme: (follow: boolean) => void;
  toast: (options: any) => void;
  toolbarSettings: any;
  onToolbarSettingChange: (key: string, value: boolean) => void;
}) => {
  const [customizeView, setCustomizeView] = useState('main');

  if (customizeView === 'toolbar') {
    return (
      <ToolbarSettingsPanel
        setCustomizeView={setCustomizeView}
        setIsOpen={setIsOpen}
        isMobile={isMobile}
        toolbarSettings={toolbarSettings}
        onSettingChange={onToolbarSettingChange}
      />
    );
  }

  return (
    <CustomizePanelMain
      setCustomizeView={setCustomizeView}
      setIsOpen={setIsOpen}
      handleThemeChange={handleThemeChange}
      theme={theme}
      isMobile={isMobile}
      showShortcuts={showShortcuts}
      setShowShortcuts={setShowShortcuts}
      shortcutSetting={shortcutSetting}
      setShortcutSetting={setShortcutSetting}
      showCards={showCards}
      setShowCards={setShowCards}
      showContinueWithTabs={showContinueWithTabs}
      setShowContinueWithTabs={setShowContinueWithTabs}
      handleResetToDefault={handleResetToDefault}
      followDeviceTheme={followDeviceTheme}
      setFollowDeviceTheme={setFollowDeviceTheme}
      toast={toast}
    />
  );
};


const renderShortcutIcon = (shortcut: Shortcut) => {
    if (typeof shortcut.icon === 'string' && shortcut.icon.startsWith('https://')) {
        return <Image src={shortcut.icon} alt={shortcut.name} width={24} height={24} className="rounded-full"/>;
    }
    if (shortcut.icon === 'Sparkles') return <Sparkles className="w-5 h-5" />;
    if (shortcut.icon === 'Book') return <Book className="w-5 h-5" />;
    if (shortcut.icon === 'Youtube') return <Youtube className="w-5 h-5" />;
    if (shortcut.icon === 'Globe') return <Globe className="w-5 h-5" />;
    return shortcut.icon;
};

const ShortcutItem = ({ shortcut, onNavigate, onEdit, onRemove, isIncognito }: {
  shortcut: Shortcut;
  onNavigate: (url: string) => void;
  onEdit: (shortcut: Shortcut) => void;
  onRemove: (shortcut: Shortcut) => void;
  isIncognito: boolean;
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleNavigation = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('[data-popover-trigger]')) {
      onNavigate(shortcut.url || shortcut.name);
    }
  };

  return (
    <div
      className="relative w-28 h-28 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={handleNavigation}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--secondary)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onNavigate(shortcut.url || shortcut.name);
        }
      }}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-medium text-xl mb-2 ${shortcut.color}`}>
        {renderShortcutIcon(shortcut)}
      </div>
      <span className="text-sm font-light text-foreground w-full truncate">{shortcut.name}</span>

      {!isIncognito && (
        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full bg-transparent hover:bg-black/10 dark:hover:bg-white/10"
                data-popover-trigger
                onClick={(e) => e.stopPropagation()} // Prevent navigation
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1" onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal h-8" onClick={() => { onEdit(shortcut); setPopoverOpen(false); }}>
                <Pencil className="mr-2 h-4 w-4" /> Edit shortcut
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm font-normal h-8 text-destructive hover:text-destructive" onClick={() => { onRemove(shortcut); setPopoverOpen(false); }}>
                <Trash2 className="mr-2 h-4 w-4" /> Remove
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};


const NewTabPage = ({
    searchContainerRef,
    isSearchFocused,
    searchEngines,
    searchEngine,
    ntpInputValue,
    setNtpInputValue,
    handleNtpInputKeyDown,
    setIsSearchFocused,
    listeningState,
    voiceSearchSource,
    startVoiceSearch,
    setIsImageSearchOpen,
    setActivePanel,
    aiTools,
    activeTabId,
    handleNavigation,
    searchHistory,
    shortcuts,
    shortcutSetting,
    isIncognito,
    handleOpenAddShortcut,
    handleOpenEditShortcut,
    handleRemoveShortcut,
    setIsCustomizeOpen,
    showShortcuts,
    showCards,
    showContinueWithTabs,
} : {
    searchContainerRef: React.RefObject<HTMLDivElement>;
    isSearchFocused: boolean;
    searchEngines: { [key: string]: { name: string; url: string } };
    searchEngine: string;
    ntpInputValue: string;
    setNtpInputValue: (value: string) => void;
    handleNtpInputKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    setIsSearchFocused: (value: boolean) => void;
    listeningState: 'listening' | 'error' | 'inactive';
    voiceSearchSource: 'address' | 'assistant' | null;
    startVoiceSearch: (source: 'address' | 'assistant') => void;
    setIsImageSearchOpen: (value: boolean) => void;
    setActivePanel: (panel: string | null) => void;
    setIsCustomizeOpen: (value: boolean) => void;
    aiTools: any;
    activeTabId: string;
    handleNavigation: (tabId: string, url: string) => void;
    searchHistory: SearchHistoryItem[];
    shortcuts: Shortcut[];
    shortcutSetting: string;
    isIncognito: boolean;
    handleOpenAddShortcut: () => void;
    handleOpenEditShortcut: (shortcut: Shortcut) => void;
    handleRemoveShortcut: (shortcut: Shortcut) => void;
    showShortcuts: boolean;
    showCards: boolean;
    showContinueWithTabs: boolean;
}) => {
    const isMobile = useIsMobile();
    const mostVisitedSites = [
        { name: "Wikipedia", icon: 'Globe', color: 'bg-gray-200 text-black', url: 'https://wikipedia.org' },
        { name: "Reddit", icon: 'Globe', color: 'bg-orange-500', url: 'https://reddit.com' },
        { name: "Twitter / X", icon: 'Globe', color: 'bg-black', url: 'https://x.com' },
        { name: "Amazon", icon: 'Globe', color: 'bg-yellow-400 text-black', url: 'https://amazon.com' },
        { name: "LinkedIn", icon: 'Globe', color: 'bg-blue-600', url: 'https://linkedin.com' },
    ];
    const shortcutsToDisplay = shortcutSetting === 'most-visited' ? mostVisitedSites : shortcuts;

    return (
    <div className="flex-1 flex flex-col items-center justify-start pt-16 bg-background text-foreground p-4 overflow-y-auto scrollbar-hide">
        <h1 className="text-8xl font-bold mb-8" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
        <div ref={searchContainerRef} className="w-full max-w-2xl relative">
            <div className={cn(
                "relative w-full",
                isSearchFocused ? "rounded-t-3xl bg-card shadow-lg" : ""
            )}>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-20" />
                <Input 
                    type="text"
                    placeholder={`Search with ${searchEngines[searchEngine]?.name || 'Google'} or type a URL`}
                    className={cn(
                        "w-full h-12 pl-12 pr-48 border-none focus-visible:ring-0 relative z-10 font-light placeholder:font-light text-sm",
                        isSearchFocused 
                            ? "bg-card rounded-t-3xl" 
                            : "bg-secondary rounded-full"
                    )}
                    value={ntpInputValue}
                    onChange={(e) => setNtpInputValue(e.target.value)}
                    onKeyDown={handleNtpInputKeyDown}
                    onFocus={() => setIsSearchFocused(true)}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
                    <Button variant="ghost" size="icon" className={`w-8 h-8 rounded-full ${listeningState === 'listening' && voiceSearchSource === 'address' ? 'bg-red-500/20 text-red-500' : ''}`} onClick={() => startVoiceSearch('address')}>
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => setIsImageSearchOpen(true)}><Camera className="w-5 h-5" /></Button>
                    <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full" onClick={() => { setActivePanel('assistant'); }}>
                                <Sparkles className="w-5 h-5" />
                              </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>Open AI Assistant</p>
                          </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full"><MoreVertical className="w-5 h-5"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                             <ScrollArea className="h-96 scrollbar-hide">
                                {Object.entries(aiTools).map(([category, tools]) => (
                                    <React.Fragment key={category}>
                                        <DropdownMenuLabel>{category}</DropdownMenuLabel>
                                        {(tools as {name: string, url: string}[]).map(tool => (
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
            {isSearchFocused && (
                <Card className="absolute top-full w-full bg-card rounded-b-3xl shadow-lg z-0 border-t">
                    <CardContent className="p-0">
                         <div className="max-h-[60vh] overflow-y-auto scrollbar-hide">
                            {searchHistory.length > 0 && (
                                <>
                                    <ul className="py-2">
                                        {searchHistory.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-4 px-4 py-2.5 cursor-pointer hover:bg-secondary"
                                                onClick={() => {
                                                    handleNavigation(activeTabId, item.query);
                                                    setIsSearchFocused(false);
                                                }}
                                            >
                                                <HistoryIcon className="w-5 h-5 text-muted-foreground" />
                                                <div className="flex-1 truncate">
                                                    <p className="truncate text-sm font-light">
                                                        {item.query}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <Separator />
                                </>
                            )}
                            <div className="p-4">
                              <div className="grid grid-cols-5 gap-4">
                                  {shortcuts.map((shortcut, index) => (
                                      <ShortcutItem 
                                        key={`${shortcut.name}-${index}`}
                                        shortcut={shortcut}
                                        onNavigate={(url) => { handleNavigation(activeTabId, url); setIsSearchFocused(false); }}
                                        onEdit={handleOpenEditShortcut}
                                        onRemove={handleRemoveShortcut}
                                        isIncognito={isIncognito}
                                      />
                                  ))}
                                  {shortcuts.length < 100 && !isIncognito && (
                                    <div className="w-28 h-28 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-secondary" onClick={handleOpenAddShortcut}>
                                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/50 mb-2">
                                            <Plus className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <span className="text-sm font-light text-foreground">Add shortcut</span>
                                    </div>
                                  )}
                              </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
        {showShortcuts ? (
            <div className="w-full max-w-2xl mt-12 p-4">
                <div className="grid grid-cols-5 gap-4">
                    {shortcutsToDisplay.map((shortcut, index) => (
                        <ShortcutItem
                            key={`main-shortcut-${shortcut.name}-${index}`}
                            shortcut={shortcut}
                            onNavigate={(url) => handleNavigation(activeTabId, url)}
                            onEdit={handleOpenEditShortcut}
                            onRemove={handleRemoveShortcut}
                            isIncognito={isIncognito}
                        />
                    ))}
                    {shortcutSetting === 'my-shortcuts' && shortcuts.length < 100 && !isIncognito && (
                      <div className="w-28 h-28 p-2 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-secondary" onClick={handleOpenAddShortcut}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary/50 mb-2">
                              <Plus className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-light text-foreground">Add shortcut</span>
                      </div>
                    )}
                </div>
            </div>
        ) : (
             <div className="w-full max-w-2xl mt-12 p-4 text-center">
                <p className="text-muted-foreground text-sm">Shortcuts are hidden.</p>
                <Button variant="link" onClick={() => setIsCustomizeOpen(true)}>
                    Show shortcuts
                </Button>
            </div>
        )}
        {showCards && showContinueWithTabs && (
          <div className="w-full max-w-2xl mt-8">
              <Card>
                  <CardHeader>
                      <CardTitle className="text-base font-semibold">Continue browsing</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="p-4 text-center text-sm text-muted-foreground">
                          Your recent tabs will appear here when you have them.
                      </div>
                  </CardContent>
              </Card>
          </div>
        )}
    </div>
  );
}

const BrowserApp = () => {
  const router = useRouter();
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
  const [ntpInputValue, setNtpInputValue] = useState("");
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
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  
  const [isAddOrEditShortcutOpen, setIsAddOrEditShortcutOpen] = useState(false);
  const [shortcutToEdit, setShortcutToEdit] = useState<Shortcut | null>(null);
  const [newShortcutName, setNewShortcutName] = useState('');
  const [newShortcutUrl, setNewShortcutUrl] = useState('');

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantLoading, setIsAssistantLoading] = useState(false);
  const [isIncognito, setIsIncognito] = useState(false);
  const [searchEngine, setSearchEngine] = useState('google');
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [findInput, setFindInput] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isClearDataOpen, setIsClearDataOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);
  const [isReadingModeOpen, setIsReadingModeOpen] = useState(false);
  
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);
  const voiceSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentInputRef = useRef<HTMLInputElement | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSheetContent, setMobileSheetContent] = useState<'nav' | 'chat'>('nav');
  const isMobile = useIsMobile();
  const [isDesktopSite, setIsDesktopSite] = useState(true);
  
  const [showHomeButton, setShowHomeButton] = useState(true);
  
  const [listeningState, setListeningState] = useState<'listening' | 'error' | 'inactive'>('inactive');
  const [voiceSearchSource, setVoiceSearchSource] = useState<'address' | 'assistant' | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isBookmarkAlertOpen, setIsBookmarkAlertOpen] = useState(false);
  const [isCloseLastTabAlertOpen, setIsCloseLastTabAlertOpen] = useState(false);
  const [groupPopoverAnchor, setGroupPopoverAnchor] = useState<HTMLElement | null>(null);
  const [activeTabForGrouping, setActiveTabForGrouping] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupColor, setNewGroupColor] = useState(groupColors[0]);

  const { toggleSidebar: toggleMainSidebar } = useSidebar();
  
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [fontSize, setFontSize] = useState('medium');

  const [fabPosition, setFabPosition] = useState({ x: 0, y: 0 });
  const [isFabDragging, setIsFabDragging] = useState(false);
  const fabReturnTimer = useRef<NodeJS.Timeout | null>(null);
  const dragStart = useRef({ x: 0, y: 0, initialButtonX: 0, initialButtonY: 0 });

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const currentUrl = activeTab?.history[activeTab.currentIndex] || DEFAULT_URL;

  // Customization State
  const [showShortcutsOnNtp, setShowShortcutsOnNtp] = useState(true);
  const [shortcutSetting, setShortcutSetting] = useState("my-shortcuts");
  const [showCardsOnNtp, setShowCardsOnNtp] = useState(true);
  const [showContinueWithTabsCard, setShowContinueWithTabsCard] = useState(true);
  const [followDeviceTheme, setFollowDeviceTheme] = useState(true);
  const [showBookmarksBar, setShowBookmarksBar] = useState(true);
  const [isBookmarksBarHovered, setIsBookmarksBarHovered] = useState(false);

  const [toolbarSettings, setToolbarSettings] = useState(initialToolbarSettings);

  const [panelWidth, setPanelWidth] = useState(400);
  const isResizingPanel = useRef(false);

  const [bookmarksBarHeight, setBookmarksBarHeight] = useState(300);
  const isResizingBookmarksBar = useRef(false);

  const handleBookmarksBarResizePointerMove = useCallback((e: PointerEvent) => {
    if (!isResizingBookmarksBar.current) return;
    let newHeight = e.clientY - 84; // 84px is approx height of header part.
    const minHeight = 150;
    const maxHeight = window.innerHeight * 0.7; // Max 70% of viewport height.
    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;
    setBookmarksBarHeight(newHeight);
  }, []);

  const handleBookmarksBarResizePointerUp = useCallback(() => {
    if (!isResizingBookmarksBar.current) return;
    isResizingBookmarksBar.current = false;
    document.body.style.cursor = 'default';
    document.body.classList.remove('select-none');
    window.removeEventListener('pointermove', handleBookmarksBarResizePointerMove);
    window.removeEventListener('pointerup', handleBookmarksBarResizePointerUp);
  }, [handleBookmarksBarResizePointerMove]);
  
  const handleBookmarksBarResizePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isResizingBookmarksBar.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.classList.add('select-none');
    window.addEventListener('pointermove', handleBookmarksBarResizePointerMove);
    window.addEventListener('pointerup', handleBookmarksBarResizePointerUp);
  }, [handleBookmarksBarResizePointerMove, handleBookmarksBarResizePointerUp]);

  const handlePanelResizePointerMove = useCallback((e: PointerEvent) => {
    if (!isResizingPanel.current) return;
    let newWidth = window.innerWidth - e.clientX;
    const minWidth = 300;
    const maxWidth = window.innerWidth * 0.6; // 60% of screen
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    setPanelWidth(newWidth);
  }, []);
  
  const handlePanelResizePointerUp = useCallback(() => {
    isResizingPanel.current = false;
    document.body.style.cursor = 'default';
    document.body.classList.remove('select-none');
    window.removeEventListener('pointermove', handlePanelResizePointerMove);
    window.removeEventListener('pointerup', handlePanelResizePointerUp);
  }, [handlePanelResizePointerMove]);
  
  const handlePanelResizePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isResizingPanel.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.classList.add('select-none');
    window.addEventListener('pointermove', handlePanelResizePointerMove);
    window.addEventListener('pointerup', handlePanelResizePointerUp);
  }, [handlePanelResizePointerMove, handlePanelResizePointerUp]);

  const tabGroups = useMemo(() => {
    const groups = new Map<string, { name: string; color: string; tabs: Tab[] }>();
    tabs.forEach(tab => {
      if (tab.group) {
        if (groups.has(tab.group.name)) {
          groups.get(tab.group.name)!.tabs.push(tab);
        } else {
          groups.set(tab.group.name, { ...tab.group, tabs: [tab] });
        }
      }
    });
    return Array.from(groups.values());
  }, [tabs]);

  const copyLink = useCallback(() => {
    if (currentUrl !== DEFAULT_URL) {
      navigator.clipboard.writeText(currentUrl).then(() => {
        toast({ title: "Copied to clipboard!" });
      }).catch(err => {
        console.error("Failed to copy:", err);
        toast({ title: "Failed to copy link", variant: "destructive" });
      });
    }
  }, [currentUrl, toast]);

  const createQRCode = useCallback(() => {
    if (currentUrl && currentUrl !== DEFAULT_URL && !currentUrl.startsWith('about:')) {
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`);
    } else {
      toast({ title: "Can't create QR code for this page." });
    }
  }, [currentUrl, toast]);

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

  const panelQuickTools = [
    { icon: BookOpen, label: 'Reading mode', action: () => setIsReadingModeOpen(true) },
    { icon: Languages, label: 'Translate', action: () => { if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith("about:")) { setIsTranslateOpen(true) } else { toast({title: "Can't translate this page."}) } } },
    { icon: Printer, label: 'Print', action: () => window.print() },
    { icon: Share, label: 'Share', action: handleShare },
    { icon: QrCode, label: 'Create QR Code', action: createQRCode },
    { icon: Cast, label: 'Cast', action: () => toast({ title: "Casting is not supported in this prototype." }) },
    { icon: Code, label: 'Developer tools', action: () => setIsConsoleOpen(true) },
    { icon: Gauge, label: 'Performance', action: () => handleNavigation(activeTabId, 'about:performance') },
    { icon: Trash2, label: 'Clear browsing data', action: () => setIsClearDataOpen(true) },
    { icon: Puzzle, label: 'Extensions', action: () => handleNavigation(activeTabId, 'about:extensions') },
    { icon: Settings, label: 'Settings', action: () => handleNavigation(activeTabId, 'about:settings') },
    { icon: HelpCircle, label: 'Help', action: () => setIsFeedbackOpen(true) },
  ];

  const handleToolbarSettingsChange = (key: keyof typeof toolbarSettings, value: boolean) => {
    const newSettings = { ...toolbarSettings, [key]: value };
    setToolbarSettings(newSettings);
    if (!isIncognito) {
      localStorage.setItem('aisha-toolbar-settings', JSON.stringify(newSettings));
    }
  };

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
        setInputValue(newUrl);
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
      if (!isIncognito) {
          setSearchHistory(prevHistory => {
              const updatedHistory = [{ query: newUrl }, ...prevHistory.filter(item => item.query.toLowerCase() !== newUrl.toLowerCase())].slice(0, 8);
              localStorage.setItem('aisha-search-history', JSON.stringify(updatedHistory));
              return updatedHistory;
          });
      }
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
    setNtpInputValue("");
  }, [tabs, isIncognito, searchEngine, toast, activeTabId]);

  const yourAishaToolsList = [
    { key: 'showPayments', icon: CreditCard, label: 'Payment methods', action: () => setActivePanel('payments') },
    { key: 'showAddresses', icon: MapPin, label: 'Addresses', action: () => setActivePanel('addresses') },
    { key: 'showBookmarks', icon: BookMarked, label: 'Bookmarks', action: () => setActivePanel('bookmarks') },
    { key: 'showReadingList', icon: BookCopy, label: 'Reading list', action: () => setActivePanel('reading-list') },
    { key: 'showHistory', icon: HistoryIcon, label: 'History', action: () => setActivePanel('history') },
    { key: 'showDownloads', icon: Download, label: 'Downloads', action: () => setActivePanel('downloads') },
    { key: 'showDeleteData', icon: Trash2, label: 'Delete browsing data', action: () => setIsClearDataOpen(true) },
  ];

  const otherToolsList = [
    { key: 'showPrint', icon: Printer, label: 'Print', action: () => window.print() },
    { key: 'showGoogleLens', icon: Camera, label: 'Search with Google Lens', action: () => setIsImageSearchOpen(true) },
    { key: 'showTranslate', icon: Languages, label: 'Translate', action: () => { if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith("about:")) { setIsTranslateOpen(true) } else { toast({title: "Can't translate this page."}) } } },
    { key: 'showQRCode', icon: QrCode, label: 'Create QR Code', action: createQRCode },
    { key: 'showCast', icon: Cast, label: 'Cast', action: () => toast({ title: "Casting is not supported in this prototype." }) },
    { key: 'showReadingMode', icon: BookOpen, label: 'Reading mode', action: () => setIsReadingModeOpen(true) },
    { key: 'showCopyLink', icon: LinkIcon, label: 'Copy link', action: copyLink },
    { key: 'showSendToDevices', icon: Computer, label: 'Send to your devices', action: () => toast({ title: "Sending to other devices is not implemented in this prototype." }) },
    { key: 'showTaskManager', icon: Gauge, label: 'Task manager', action: () => toast({ title: "Task Manager is not implemented." }) },
    { key: 'showDevTools', icon: Code, label: 'Developer tools', action: () => setIsConsoleOpen(true) },
  ];
  
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
  
  // FAB Handlers
  const handleFabPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (fabReturnTimer.current) {
        clearTimeout(fabReturnTimer.current);
        fabReturnTimer.current = null;
    }
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        initialButtonX: fabPosition.x,
        initialButtonY: fabPosition.y,
    };
  };

  const handleFabPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
        const deltaX = e.clientX - dragStart.current.x;
        const deltaY = e.clientY - dragStart.current.y;

        if (!isFabDragging && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            setIsFabDragging(true);
        }
        
        if (isFabDragging) {
            setFabPosition({
                x: dragStart.current.initialButtonX + deltaX,
                y: dragStart.current.initialButtonY + deltaY,
            });
        }
    }
  };

  const handleFabPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    if (isFabDragging) {
        // fabReturnTimer.current = setTimeout(() => {
        //     setFabPosition({ x: 0, y: 0 });
        // }, 10000);
        setIsFabDragging(false);
    } else {
        setMobileSheetContent('nav');
        setMobileMenuOpen(true);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
            setIsSearchFocused(false);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('aisha-auth');
    if (authStatus !== 'true') {
        router.push('/welcome');
    } else {
        setIsAuthenticated(true);
    }
  }, [router]);

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
        setActivePanel(null);
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
        setToolbarSettings(initialToolbarSettings);
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
      if (isIncognito) return;
      const savedEngine = localStorage.getItem('aisha-search-engine') || 'google';
      setSearchEngine(savedEngine);
      
      if (!e || e.key === 'aisha-show-home-button') {
        const savedShowHome = localStorage.getItem('aisha-show-home-button');
        setShowHomeButton(savedShowHome ? JSON.parse(savedShowHome) : true);
      }
      if (!e || e.key === 'aisha-show-bookmarks-bar') {
        const savedShowBookmarksBar = localStorage.getItem('aisha-show-bookmarks-bar');
        setShowBookmarksBar(savedShowBookmarksBar ? JSON.parse(savedShowBookmarksBar) : true);
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
  }, [isIncognito]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    if (isIncognito) return;

    try {
      const savedHistory = localStorage.getItem('aisha-search-history');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory));
      }
      const savedBookmarks = localStorage.getItem('aisha-bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
      const savedShortcutsString = localStorage.getItem('aisha-shortcuts');
      if (savedShortcutsString) {
          try {
              const savedShortcuts: Shortcut[] = JSON.parse(savedShortcutsString);
              setShortcuts(savedShortcuts);
          } catch (e) {
              console.error("Failed to parse shortcuts from localStorage", e);
              setShortcuts(initialShortcuts);
          }
      } else {
          setShortcuts(initialShortcuts);
      }

      const savedShowShortcuts = localStorage.getItem('aisha-show-shortcuts');
      if (savedShowShortcuts) setShowShortcutsOnNtp(JSON.parse(savedShowShortcuts));
      
      const savedShortcutSetting = localStorage.getItem('aisha-shortcut-setting');
      if (savedShortcutSetting) setShortcutSetting(savedShortcutSetting);
      
      const savedShowCards = localStorage.getItem('aisha-show-cards');
      if (savedShowCards) setShowCardsOnNtp(JSON.parse(savedShowCards));

      const savedContinueTabs = localStorage.getItem('aisha-continue-tabs');
      if (savedContinueTabs) setShowContinueWithTabsCard(JSON.parse(savedContinueTabs));
      
      const savedFollowTheme = localStorage.getItem('aisha-follow-theme');
      if (savedFollowTheme) setFollowDeviceTheme(JSON.parse(savedFollowTheme));

      const savedToolbarSettings = localStorage.getItem('aisha-toolbar-settings');
      if (savedToolbarSettings) {
          setToolbarSettings(prev => ({ ...initialToolbarSettings, ...JSON.parse(savedToolbarSettings)}));
      }
       const savedBookmarksBar = localStorage.getItem('aisha-show-bookmarks-bar');
      if (savedBookmarksBar) {
          setShowBookmarksBar(JSON.parse(savedBookmarksBar));
      }

    } catch (e) {
      console.error("Failed to parse settings from localStorage", e);
    }
  }, [isIncognito]);

  useEffect(() => {
    const activeContent = document.getElementById('browser-content-area');
    if (activeContent) {
      activeContent.style.transform = `scale(${zoomLevel / 100})`;
      activeContent.style.transformOrigin = 'top left';
    }
  }, [zoomLevel, activeTabId]);
  
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.style.colorScheme = newTheme;
    setTheme(newTheme);
    if (!isIncognito) localStorage.setItem('aisha-theme', newTheme);
  };

  useEffect(() => {
    if (!followDeviceTheme) {
      const savedTheme = localStorage.getItem('aisha-theme') as 'light' | 'dark' | null;
      applyTheme(savedTheme || 'dark');
      return;
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches ? 'dark' : 'light');
    };
    
    handleChange({ matches: mediaQuery.matches } as MediaQueryListEvent); // apply initial

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [followDeviceTheme, isIncognito]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'device') => {
    if (newTheme === 'device') {
      setFollowDeviceTheme(true);
      if (!isIncognito) localStorage.setItem('aisha-follow-theme', 'true');
    } else {
      if (followDeviceTheme) {
        setFollowDeviceTheme(false);
        if (!isIncognito) localStorage.setItem('aisha-follow-theme', 'false');
      }
      applyTheme(newTheme);
    }
  };
  
  useEffect(() => {
    if (activeTab) {
        const currentTabUrl = activeTab.history[activeTab.currentIndex];
        if (currentTabUrl !== DEFAULT_URL) {
            setInputValue(currentTabUrl);
        } else {
            setInputValue("");
        }
    }
  }, [activeTab, activeTabId]);


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
      const target = e.target as HTMLInputElement;
      handleNavigation(activeTabId, target.value);
      target.blur();
    }
  };

  const handleNtpInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && activeTab) {
        const target = e.target as HTMLInputElement;
        handleNavigation(activeTabId, target.value);
        target.blur();
        setIsSearchFocused(false);
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
      setIsCloseLastTabAlertOpen(true);
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
  
  const toggleBookmark = () => {
    if (isIncognito) {
        toast({ title: "Can't add bookmarks in Incognito mode." });
        return;
    }
    if (!activeTab || currentUrl === DEFAULT_URL || currentUrl.startsWith("about:")) {
        setIsBookmarkAlertOpen(true);
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
  
  const handleOpenAddShortcut = () => {
    if (isIncognito) {
      toast({ title: "Can't add shortcuts in Incognito mode." });
      return;
    }
    setShortcutToEdit(null);
    setNewShortcutName('');
    setNewShortcutUrl('');
    setIsAddOrEditShortcutOpen(true);
  };
  
  const handleOpenEditShortcut = (shortcut: Shortcut) => {
    setShortcutToEdit(shortcut);
    setNewShortcutName(shortcut.name);
    setNewShortcutUrl(shortcut.url);
    setIsAddOrEditShortcutOpen(true);
  };
  
  const handleRemoveShortcut = (shortcutToRemove: Shortcut) => {
    if (isIncognito) return;
    const newShortcuts = shortcuts.filter(s => s.name !== shortcutToRemove.name);
    setShortcuts(newShortcuts);
    localStorage.setItem('aisha-shortcuts', JSON.stringify(newShortcuts));
    toast({ title: 'Shortcut removed' });
  };
  
  const handleSaveShortcut = () => {
    if (isIncognito) return;
    if (!newShortcutName.trim() || !newShortcutUrl.trim()) {
      toast({ title: 'Please fill out both name and URL.', variant: 'destructive' });
      return;
    }
    let url = newShortcutUrl.trim();
    if (!/^(https?:\/\/)/i.test(url)) {
      url = `https://${url}`;
    }

    let newShortcuts;
    if (shortcutToEdit) {
      // Editing existing shortcut
      newShortcuts = shortcuts.map(s =>
        s.name === shortcutToEdit.name
          ? { ...s, name: newShortcutName, url: url, icon: `https://www.google.com/s2/favicons?sz=64&domain_url=${url}` }
          : s
      );
      toast({ title: "Shortcut updated!" });
    } else {
      // Adding new shortcut
      if (shortcuts.length >= 100) {
        toast({ title: 'You have reached the shortcut limit of 100.', variant: 'destructive' });
        return;
      }
      const newShortcut: Shortcut = {
        name: newShortcutName,
        url: url,
        icon: `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`,
        color: 'bg-secondary',
      };
      newShortcuts = [...shortcuts, newShortcut];
      toast({ title: "Shortcut added!" });
    }

    setShortcuts(newShortcuts);
    localStorage.setItem('aisha-shortcuts', JSON.stringify(newShortcuts));

    setIsAddOrEditShortcutOpen(false);
    setShortcutToEdit(null);
    setNewShortcutName('');
    setNewShortcutUrl('');
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
    setIsImageSearchOpen(false);
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
  
  const bookmarkAllTabs = () => {
    if (isIncognito) {
      toast({ title: "Can't add bookmarks in Incognito mode." });
      return;
    }
    const tabsToBookmark = tabs.filter(tab => tab.history[tab.currentIndex] !== DEFAULT_URL && !tab.history[tab.currentIndex].startsWith('about:'));
    if (tabsToBookmark.length === 0) {
        toast({ title: "No bookmarkable tabs open." });
        return;
    }

    let newBookmarks = [...bookmarks];
    let addedCount = 0;
    
    tabsToBookmark.forEach(tab => {
        const url = tab.history[tab.currentIndex];
        const isAlreadyBookmarked = newBookmarks.some(b => b.url === url);
        if (!isAlreadyBookmarked) {
            newBookmarks.push({
                url: url,
                title: tab.title,
            });
            addedCount++;
        }
    });

    if (addedCount > 0) {
        setBookmarks(newBookmarks);
        localStorage.setItem('aisha-bookmarks', JSON.stringify(newBookmarks));
        toast({ title: "Tabs bookmarked!", description: `${addedCount} new bookmark(s) added.` });
    } else {
        toast({ title: "All tabs already bookmarked." });
    }
  };

  const handleClearBrowsingData = () => {
    if (isIncognito) {
        toast({ title: "Cannot clear data in Incognito mode." });
        setIsClearDataOpen(false);
        return;
    }
    localStorage.removeItem('aisha-bookmarks');
    localStorage.removeItem('aisha-shortcuts');
    localStorage.removeItem('aisha-search-history');
    
    setBookmarks([]);
    setSearchHistory([]);
    setShortcuts(initialShortcuts);
    
    setTabs(prevTabs => 
        prevTabs.map(tab => ({
            ...tab,
            history: [DEFAULT_URL],
            currentIndex: 0,
            title: "New Tab",
        }))
    );
    
    if (tabs.length > 0) {
        setActiveTabId(tabs[0].id);
        handleNavigation(tabs[0].id, DEFAULT_URL);
    }

    toast({ title: "Browsing data cleared", description: "Your bookmarks, shortcuts, and history have been removed." });
    setIsClearDataOpen(false);
  };
  
  const handleResetToDefault = () => {
    if (isIncognito) return;
    
    handleThemeChange('dark');
    setFollowDeviceTheme(true);
    setShowShortcutsOnNtp(true);
    setShortcutSetting("my-shortcuts");
    setShowCardsOnNtp(true);
    setShowContinueWithTabsCard(true);
    setToolbarSettings(initialToolbarSettings);
    setShowBookmarksBar(true);

    localStorage.removeItem('aisha-theme');
    localStorage.removeItem('aisha-follow-theme');
    localStorage.removeItem('aisha-show-shortcuts');
    localStorage.removeItem('aisha-shortcut-setting');
    localStorage.removeItem('aisha-show-cards');
    localStorage.removeItem('aisha-continue-tabs');
    localStorage.removeItem('aisha-toolbar-settings');
    localStorage.removeItem('aisha-show-bookmarks-bar');

    toast({ title: "Customizations reset to default" });
  };


  const handleSignOut = () => {
    sessionStorage.removeItem('aisha-auth');
    router.push('/welcome');
  };
  
  const handleSaveGroup = () => {
    if (activeTabForGrouping) {
      updateTab(activeTabForGrouping, { group: { name: newGroupName, color: newGroupColor } });
    }
    setActiveTabForGrouping(null);
    setGroupPopoverAnchor(null);
    setNewGroupName("");
    setNewGroupColor(groupColors[0]);
  };

  const navItems = [
    { icon: DotCircleIcon, label: 'U', action: () => handleNavigation(activeTabId, 'https://utru.vercel.app/') },
    { icon: CustomBookReaderIcon, label: 'R', action: () => handleNavigation(activeTabId, 'https://www.goodreads.com/') },
    { icon: CustomCommunityIcon, label: 'W', action: () => handleNavigation(activeTabId, 'https://mahila-suraksha.vercel.app/') },
    { icon: CustomGroupIcon, label: 'G', action: () => handleNavigation(activeTabId, 'about:groups') },
    { icon: ShoppingCart, label: 'S', action: () => handleNavigation(activeTabId, 'https://kiraana-pro.vercel.app/') },
    { icon: CustomAiToolIcon, label: 'M', action: () => handleNavigation(activeTabId, 'https://mahadev-eight.vercel.app/') },
    { icon: CustomAboutIcon, label: 'About', action: () => handleNavigation(activeTabId, 'about:about') },
    { icon: Settings, label: 'Settings', action: () => handleNavigation(activeTabId, 'about:settings') },
    { icon: Languages, label: 'Translate', action: () => handleNavigation(activeTabId, 'about:languages') },
    { icon: Pencil, label: 'Customize', action: () => { setActivePanel('customize'); if (isMobile) { setMobileMenuOpen(false); } } },
    { icon: BookOpen, label: 'Editor', action: () => handleNavigation(activeTabId, 'about:editor') },
  ];

  const isInternalPage = currentUrl.startsWith('about:');

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
    <div className="flex-1 flex flex-col bg-background text-foreground py-8 overflow-y-auto px-4 sm:px-8 scrollbar-hide">
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

  const TabsPage = ({ tabs, setActiveTabId }: { tabs: Tab[], setActiveTabId: (id: string) => void }) => (
      <GenericInternalPage title="Recent Tabs" icon={Laptop}>
        {tabs.length > 0 ? (
          <div className="space-y-2">
            {tabs.map((tab) => (
              <div key={tab.id} className="p-3 flex items-center justify-between rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => setActiveTabId(tab.id)}
              >
                <div className="flex items-center gap-4">
                   <Globe className="w-5 h-5 text-muted-foreground" />
                   <div>
                      <p className="font-semibold truncate">{tab.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{tab.history[tab.currentIndex]}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
            <Laptop className="w-16 h-16 mb-4"/>
            <p>No open tabs.</p>
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
        <div className="flex-1 overflow-y-auto p-4 bg-secondary/30 font-mono text-sm scrollbar-hide">
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
              className="col-span-3 scrollbar-hide"
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
        The website at <span className="font-mono bg-muted p-1 rounded-md text-sm">{url}</span> may not allow itself to be embedded in other pages. Try opening it in a new window.
      </p>
      <Button onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}>
        <ExternalLink className="w-4 h-4 mr-2" />
        Open in a new tab
      </Button>
    </div>
  );

  const RightSidePanel = ({ title, icon: Icon, children, panelId, setOpen, isMobile = false }) => (
    <aside className={cn("flex flex-col",
        isMobile
        ? "flex-1 h-full bg-background"
        : "h-full w-full border-l border-border bg-background/80 backdrop-blur-sm"
    )}>
        <div className="flex items-center p-2 border-b shrink-0">
            {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setOpen(null)} className="mr-2">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                </Button>
            )}
            <Icon className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-base font-semibold ml-2">{title}</h2>
            <div className="flex-grow" />
            
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => {
                        handleNavigation(activeTabId, `about:${panelId}`);
                        setOpen(null);
                    }}>
                    <SquareArrowOutUpRight className="w-5 h-5 text-muted-foreground" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                    <p>Open as page</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {!isMobile && (
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setOpen(null)}>
                    <X className="w-5 h-5 text-muted-foreground" />
                </Button>
            )}
        </div>
        <ScrollArea className="flex-1 pr-2 scrollbar-hide">
            <div className="p-2 space-y-4">
                {children}
            </div>
        </ScrollArea>
    </aside>
  );

  const HistoryPanelContent = () => {
    const historyItems = tabs.flatMap(t => t.history).filter(item => item !== DEFAULT_URL && !item.startsWith('about:'));
    const uniqueHistory = [...new Set(historyItems)].reverse();
    return (
        <>
          {uniqueHistory.length > 0 ? (
            <div className="space-y-2">
              {uniqueHistory.map((item, index) => (
                <div key={`${item}-${index}`} className="p-3 flex items-center justify-between rounded-md hover:bg-muted/50">
                  <span className="truncate cursor-pointer hover:underline" onClick={() => { handleNavigation(activeTabId, item); setActivePanel(null); }}>{item}</span>
                  <Button variant="ghost" size="icon" onClick={() => toast({title: "Clearing specific history item is not implemented."})}>
                    <Trash2 className="w-4 h-4 text-muted-foreground"/>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
              <HistoryIcon className="w-16 h-16 mb-4"/>
              <p>Your browsing history is empty.</p>
            </div>
          )}
        </>
    );
  };
  
  const BookmarksPanelContent = () => (
    <>
      {bookmarks.length > 0 ? (
         <div className="space-y-2">
         {bookmarks.map((bookmark, index) => (
           <div key={`${bookmark.url}-${index}`} className="p-3 flex items-center justify-between rounded-md hover:bg-muted/50">
             <div>
                <p className="font-semibold truncate cursor-pointer hover:underline" onClick={() => { handleNavigation(activeTabId, bookmark.url); setActivePanel(null); }}>{bookmark.title}</p>
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
        <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
          <BookMarked className="w-16 h-16 mb-4"/>
          <p>You have no bookmarks saved.</p>
        </div>
      )}
    </>
  );

  const DownloadsPanelContent = () => (
    <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
        <Download className="w-16 h-16 mb-4"/>
        <p>There are no downloads to show.</p>
    </div>
  );

  const PaymentsPanelContent = () => (
    <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
        <CreditCard className="w-16 h-16 mb-4"/>
        <p>Your saved payment methods would appear here.</p>
    </div>
  );

  const AddressesPanelContent = () => (
    <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
        <MapPin className="w-16 h-16 mb-4"/>
        <p>Your saved addresses would appear here.</p>
    </div>
  );

  const ReadingListPanelContent = () => (
    <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center pt-20">
        <BookCopy className="w-16 h-16 mb-4"/>
        <p>Your reading list is empty.</p>
    </div>
  );

  const panelConfig: { [key: string]: { title: string; icon: React.ElementType; content: React.ReactNode; } } = {
    'history': { title: 'History', icon: HistoryIcon, content: <HistoryPanelContent /> },
    'downloads': { title: 'Downloads', icon: Download, content: <DownloadsPanelContent /> },
    'bookmarks': { title: 'Bookmarks', icon: BookMarked, content: <BookmarksPanelContent /> },
    'payments': { title: 'Payment Methods', icon: CreditCard, content: <PaymentsPanelContent /> },
    'addresses': { title: 'Addresses', icon: MapPin, content: <AddressesPanelContent /> },
    'reading-list': { title: 'Reading List', icon: BookCopy, content: <ReadingListPanelContent /> },
  };

  const renderCurrentPage = () => {
    if (!activeTab) return <NewTabPage 
        searchContainerRef={searchContainerRef}
        isSearchFocused={isSearchFocused}
        searchEngines={searchEngines}
        searchEngine={searchEngine}
        ntpInputValue={ntpInputValue}
        setNtpInputValue={setNtpInputValue}
        handleNtpInputKeyDown={handleNtpInputKeyDown}
        setIsSearchFocused={setIsSearchFocused}
        listeningState={listeningState}
        voiceSearchSource={voiceSearchSource}
        startVoiceSearch={startVoiceSearch}
        setIsImageSearchOpen={setIsImageSearchOpen}
        setActivePanel={setActivePanel}
        setIsCustomizeOpen={(open) => setActivePanel(open ? 'customize' : null)}
        aiTools={aiTools}
        activeTabId={activeTabId}
        handleNavigation={handleNavigation}
        searchHistory={searchHistory}
        shortcuts={shortcuts}
        shortcutSetting={shortcutSetting}
        isIncognito={isIncognito}
        handleOpenAddShortcut={handleOpenAddShortcut}
        handleOpenEditShortcut={handleOpenEditShortcut}
        handleRemoveShortcut={handleRemoveShortcut}
        showShortcuts={showShortcutsOnNtp}
        showCards={showCardsOnNtp}
        showContinueWithTabs={showContinueWithTabsCard}
    />;
    const url = activeTab.history[activeTab.currentIndex];

    if (activeTab.loadFailed) {
      return <LoadFailedContent url={url} />;
    }

    switch (url) {
        case DEFAULT_URL:
            return <NewTabPage 
              searchContainerRef={searchContainerRef}
              isSearchFocused={isSearchFocused}
              searchEngines={searchEngines}
              searchEngine={searchEngine}
              ntpInputValue={ntpInputValue}
              setNtpInputValue={setNtpInputValue}
              handleNtpInputKeyDown={handleNtpInputKeyDown}
              setIsSearchFocused={setIsSearchFocused}
              listeningState={listeningState}
              voiceSearchSource={voiceSearchSource}
              startVoiceSearch={startVoiceSearch}
              setIsImageSearchOpen={setIsImageSearchOpen}
              setActivePanel={setActivePanel}
              setIsCustomizeOpen={(open) => setActivePanel(open ? 'customize' : null)}
              aiTools={aiTools}
              activeTabId={activeTabId}
              handleNavigation={handleNavigation}
              searchHistory={searchHistory}
              shortcuts={shortcuts}
              shortcutSetting={shortcutSetting}
              isIncognito={isIncognito}
              handleOpenAddShortcut={handleOpenAddShortcut}
              handleOpenEditShortcut={handleOpenEditShortcut}
              handleRemoveShortcut={handleRemoveShortcut}
              showShortcuts={showShortcutsOnNtp}
              showCards={showCardsOnNtp}
              showContinueWithTabs={showContinueWithTabsCard}
            />;
        case 'about:settings':
            return <SettingsPage />;
        case 'about:startup-checklist':
            return <StartupChecklistPage />;
        case 'about:history':
            return <HistoryPage />;
        case 'about:bookmarks':
            return <BookmarksPage />;
        case 'about:tabs':
            return <TabsPage tabs={tabs} setActiveTabId={setActiveTabId} />;
        case 'about:downloads':
            return <GenericInternalPage title="Downloads" icon={Download}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Download className="w-16 h-16 mb-4"/><p>There are no downloads to show.</p></div></GenericInternalPage>;
        case 'about:groups':
             return <GenericInternalPage title="Groups" icon={CustomGroupIcon}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><CustomGroupIcon className="w-16 h-16 mb-4"/><p>Google Groups is not implemented in this prototype. You would be redirected to groups.google.com</p></div></GenericInternalPage>;
        case 'about:media':
            return <GenericInternalPage title="Media" icon={Play}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Play className="w-16 h-16 mb-4"/><p>There is no media content to show.</p></div></GenericInternalPage>;
        case 'about:passwords':
            return <GenericInternalPage title="Password Manager" icon={KeyRound}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><KeyRound className="w-16 h-16 mb-4"/><p>A full password manager is not implemented in this prototype.</p><p className="text-sm mt-2">In a real browser, this page would list your saved credentials.</p></div></GenericInternalPage>;
        case 'about:payments':
            return <GenericInternalPage title="Payment Methods" icon={CreditCard}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><CreditCard className="w-16 h-16 mb-4"/><p>Your saved payment methods would appear here.</p><p className="text-sm mt-2">This is not implemented in this prototype.</p></div></GenericInternalPage>;
        case 'about:addresses':
            return <GenericInternalPage title="Addresses and more" icon={MapPin}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><MapPin className="w-16 h-16 mb-4"/><p>Your saved addresses would appear here.</p><p className="text-sm mt-2">This is not implemented in this prototype.</p></div></GenericInternalPage>;
        case 'about:performance':
            return <GenericInternalPage title="Performance" icon={Gauge}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Gauge className="w-16 h-16 mb-4"/><p>Performance settings are conceptual in this prototype.</p><p className="text-sm mt-2">Here you would manage memory and energy saver modes.</p></div></GenericInternalPage>;
        case 'about:extensions':
            return <GenericInternalPage title="Extensions" icon={Puzzle}><div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center"><Puzzle className="w-16 h-16 mb-4"/><p>Extensions are not available in this prototype.</p><p className="text-sm mt-2">In a real browser, this page would allow you to manage your extensions.</p></div></GenericInternalPage>;
        case 'about:about':
            return <GenericInternalPage title="About Aisha" icon={Info}>
                <div className="flex flex-col h-full items-center justify-center text-center">
                    <h1 className="text-6xl font-bold mb-4" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
                    <p className="text-muted-foreground">Version 1.0 (Prototype)</p>
                    <p className="text-muted-foreground mt-2">Copyright © 2024. All rights reserved.</p>
                </div>
            </GenericInternalPage>;
        case 'about:languages': {
            const lastRealUrl = [...(activeTab?.history ?? [])].reverse().find(url => url !== DEFAULT_URL && !url.startsWith('about:'));

            const translate = (lang: 'en' | 'hi') => {
                if (lastRealUrl) {
                    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=${lang}&u=${encodeURIComponent(lastRealUrl)}`;
                    handleNavigation(activeTabId, googleTranslateUrl);
                } else {
                    toast({ title: "No translatable page found", description: "Please browse to a website first." });
                }
            };
            return <GenericInternalPage title="Translate Page" icon={Languages}>
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="mb-4 text-muted-foreground">Translate the last page you viewed to English or Hindi.</p>
                    {lastRealUrl && <p className="mb-4 text-sm font-mono p-2 bg-muted rounded-md">{lastRealUrl}</p>}
                    <div className="flex gap-4">
                        <Button onClick={() => translate('en')}>Translate to English</Button>
                        <Button onClick={() => translate('hi')}>Translate to Hindi</Button>
                    </div>
                </div>
            </GenericInternalPage>;
        }
        case 'about:editor':
            return <GenericInternalPage title="Editor" icon={Pencil}><Textarea className="h-full scrollbar-hide" placeholder="Start writing..." /></GenericInternalPage>;
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
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals allow-storage-access-by-user-activation allow-top-navigation-by-user-activation allow-top-navigation allow-presentation allow-clipboard-write allow-redirects-from-form-submit allow-clipboard-read"
                  allow="geolocation; microphone; camera; midi; encrypted-media; fullscreen; display-capture; clipboard-read; clipboard-write; presentation"
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
          <ScrollArea className="flex-1 mt-4 group-data-[collapsible=icon]:hidden scrollbar-hide">
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
      <SidebarContent className="scrollbar-hide">
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
        <ScrollArea className="flex-1 px-2 scrollbar-hide">
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
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleSignOut}>
                <LogOut className="h-6 w-6" />
                <span className="ml-4">Logout</span>
            </button>
        </div>
    </div>
  );

  const NavigationSheetContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="mb-4 px-4">
          <button onClick={() => { handleNavigation(activeTabId, 'about:newtab'); setMobileMenuOpen(false); }} className="w-full flex items-center p-2 rounded-lg hover:bg-sidebar-accent">
              <Globe className="h-7 w-7 text-cyan-400 shrink-0" />
              <span className="ml-4 font-semibold text-lg">Browse</span>
          </button>
      </div>
      <nav className="flex flex-col items-start w-full px-2 space-y-2 flex-1 mt-4">
          {navItems.map((item, index) => (
              <button key={index} onClick={() => { item.action(); setMobileMenuOpen(false); }} className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <item.icon className="size-6" />
                  <span className="ml-4">{item.label}</span>
              </button>
          ))}
      </nav>
      <div className="mt-auto px-4">
            <button className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={handleSignOut}>
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

  const panelProps = {
    setOpen: setActivePanel,
    handleNavigation: handleNavigation,
    activeTabId: activeTabId,
  };

  return (
    <div className={cn("flex h-screen bg-background text-foreground", fontSizeClass)}>
      <Sidebar collapsible="icon">
          {activePanel === 'assistant' ? <ChatHistorySidebarContent/> : <NavigationSidebarContent />}
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
                           onClick={handleSignOut}
                          className="w-full justify-center data-[state=open]:justify-start h-12"
                      >
                          <LogOut className="size-6" />
                          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
      </Sidebar>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex-shrink-0 z-20">
          <div className="flex items-end h-10 pt-1 bg-background draggable">
            <div className="flex items-center non-draggable overflow-x-auto scrollbar-hide h-full">
              {tabs.map((tab) => (
                  <Popover
                    key={`group-popover-${tab.id}`}
                    open={activeTabForGrouping === tab.id}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) {
                            setActiveTabForGrouping(null);
                            setGroupPopoverAnchor(null);
                        }
                    }}
                   >
                    <PopoverTrigger asChild>
                      <div
                          ref={activeTabForGrouping === tab.id ? setGroupPopoverAnchor : undefined}
                          key={tab.id}
                          onClick={() => setActiveTabId(tab.id)}
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveTabId(tab.id); }}}
                          className={cn(`relative flex items-center h-full px-4 rounded-t-lg cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring`,
                            'font-light text-xs',
                            activeTabId === tab.id
                              ? `z-10 ${isIncognito ? 'bg-gray-800 text-white' : 'bg-card'}`
                              : `${isIncognito ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-secondary text-muted-foreground hover:bg-card/80'} border-r border-border`
                          )}
                      >
                          {tab.group && <CircleIcon className="w-2.5 h-2.5 mr-2" style={{ color: tab.group.color, fill: tab.group.color }} />}
                          {isIncognito ? <ShieldOff className="w-4 h-4 mr-2 text-gray-400" /> : <Globe className="w-4 h-4 mr-2 text-muted-foreground" />}
                          <span className="truncate max-w-[150px]">
                              {tab.group ? `${tab.group.name}: ${tab.title}` : tab.isLoading ? "Loading..." : tab.title}
                          </span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-2 rounded-full hover:bg-muted-foreground/20 focus-visible:outline-none" onClick={(e) => { e.stopPropagation(); closeTab(tab.id); }}>
                              <X className="w-4 h-4" />
                          </Button>
                      </div>
                    </PopoverTrigger>
                     <PopoverContent className="w-64 p-2">
                        <div className="space-y-3">
                            <Label htmlFor="group-name">Group name</Label>
                            <Input id="group-name" placeholder="My Awesome Group" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                            <div className="flex gap-2">
                                {groupColors.map(color => (
                                    <button key={color} onClick={() => setNewGroupColor(color)} className={cn("w-6 h-6 rounded-full border-2", newGroupColor === color ? 'border-ring' : 'border-transparent')} style={{ backgroundColor: color }} />
                                ))}
                            </div>
                            <Button size="sm" className="w-full" onClick={handleSaveGroup}>Save Group</Button>
                        </div>
                    </PopoverContent>
                  </Popover>
              ))}
              <div className="flex items-center self-center h-full">
                <Button variant="ghost" size="icon" className="h-9 w-9 self-center flex-shrink-0 rounded-full focus-visible:outline-none" onClick={addTab}>
                    <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex-grow h-full" />
          </div>
          <div className={cn(`flex items-center p-1 sm:p-2`, isIncognito ? 'bg-gray-800' : 'bg-card')}>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={goHome} className={cn(!showHomeButton && "hidden")}>
                <Home className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={goBack} disabled={!activeTab || activeTab.currentIndex === 0}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={goForward} disabled={!activeTab || activeTab.currentIndex >= activeTab.history.length - 1}>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={reload}>
                {activeTab?.isLoading ? <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin"></div> : <RefreshCw className="w-5 h-5" />}
              </Button>
            </div>
            <div className="flex-1 min-w-0 flex items-center bg-secondary focus-within:bg-card focus-within:shadow-md transition-all rounded-full px-2 sm:px-4 py-1.5 ml-1">
              {isInternalPage ? (
                  <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-background/50 rounded-full px-2 py-0.5">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-light text-muted-foreground">Aisha</span>
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
                className="bg-transparent border-none h-auto p-0 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0 font-light text-sm flex-1"
                placeholder="Ask anything or navigate..."
              />
            </div>
            
            <div className="flex-shrink-0 flex items-center ml-auto">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleShare}>
                    <Upload className="w-5 h-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => { if (currentUrl !== DEFAULT_URL && !currentUrl.startsWith("about:")) { setIsTranslateOpen(true) } else { toast({title: "Can't translate this page."}) } }}>
                    <Languages className="w-5 h-5 text-muted-foreground" />
                </Button>
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={activePanel === 'assistant' ? "secondary" : "ghost"} size="sm" className="h-8 px-3 font-light inline-flex rounded-full" onClick={() => setActivePanel(activePanel === 'assistant' ? null : 'assistant')}>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Assistant
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Open Assistant</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => toast({ title: "Not implemented" })}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={toggleBookmark}>
                    <Star className={`w-5 h-5 transition-colors ${isBookmarked ? 'text-yellow-400 fill-current' : 'text-muted-foreground hover:text-yellow-400'}`} />
                </Button>

              <div className="flex items-center gap-1">
                <div className="hidden md:flex items-center gap-1">
                  {yourAishaToolsList.map(tool => (
                    toolbarSettings[tool.key as keyof typeof toolbarSettings] && (
                      <TooltipProvider key={tool.key}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={tool.action}
                            >
                              <tool.icon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>{tool.label}</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  ))}
                </div>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <AppGridIcon className="w-5 h-5" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                    <ScrollArea className="h-96 scrollbar-hide">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 p-4">
                        {companyApps.map((app) => (
                            <button
                            key={app.name}
                            onClick={() => handleNavigation(activeTabId, app.url)}
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
                    <Button variant="ghost" size="icon">
                        <Avatar className="w-7 h-7">
                        <AvatarImage src="https://picsum.photos/seed/prakashbabu/100/100" />
                        <AvatarFallback>PB</AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'https://myaccount.google.com/')}>
                            <User className="mr-2 h-4 w-4"/>
                            <span>Manage Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="hidden md:block">
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                      </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80 max-h-[calc(100vh-150px)] overflow-y-auto scrollbar-hide">
                          <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                  <PanelsTopLeft className="mr-2 h-4 w-4" />
                                  <span>Tab</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem onSelect={addTab}>
                                        <FilePlus className="mr-2 h-4 w-4" />
                                        <span>New tab</span>
                                        <DropdownMenuShortcut>Ctrl+T</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setActiveTabForGrouping(activeTabId); }}>
                                      <Plus className="mr-2 h-4 w-4" />
                                      <span>Add tab to new group</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                          </DropdownMenuSub>
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
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <KeyRound className="mr-2 h-4 w-4" />
                              <span>Autofill and passwords</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                  <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:passwords')}>
                                      <KeyRound className="mr-2 h-4 w-4" />
                                      <span>Password Manager</span>
                                  </DropdownMenuItem>
                                  {toolbarSettings.showPayments && <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:payments')}>
                                      <CreditCard className="mr-2 h-4 w-4" />
                                      <span>Payment methods</span>
                                  </DropdownMenuItem>}
                                  {toolbarSettings.showAddresses && <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:addresses')}>
                                      <MapPin className="mr-2 h-4 w-4" />
                                      <span>Addresses and more</span>
                                  </DropdownMenuItem>}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          {toolbarSettings.showHistory && <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:history')}>
                              <HistoryIcon className="mr-2 h-4 w-4" />
                              <span>History</span>
                              <DropdownMenuShortcut>Ctrl+H</DropdownMenuShortcut>
                          </DropdownMenuItem>}
                          {toolbarSettings.showDownloads && <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:downloads')}>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Downloads</span>
                              <DropdownMenuShortcut>Ctrl+J</DropdownMenuShortcut>
                          </DropdownMenuItem>}
                          {toolbarSettings.showBookmarks && <DropdownMenuSub>
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
                              <DropdownMenuItem onSelect={bookmarkAllTabs}>
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
                              {toolbarSettings.showReadingList && (
                                  <DropdownMenuItem onSelect={() => toast({ title: "Reading List is not implemented." })}>
                                      <BookCopy className="mr-2 h-4 w-4" />
                                      <span>Reading list</span>
                                  </DropdownMenuItem>
                              )}
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
                          </DropdownMenuSub>}
                          <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                  <Sparkles className="mr-2 h-4 w-4" />
                                  <span>Extensions</span>
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                  <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:extensions')}>
                                      <Puzzle className="mr-2 h-4 w-4" />
                                      <span>Manage Extensions</span>
                                  </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}>
                          {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="w-4 h-4 mr-2" />}
                          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
                          </DropdownMenuItem>
                          {toolbarSettings.showDeleteData && <DropdownMenuItem onSelect={() => setIsClearDataOpen(true)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Clear browsing data...</span>
                              <DropdownMenuShortcut>Ctrl+Shift+Del</DropdownMenuShortcut>
                          </DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <ZoomIn className="mr-2 h-4 w-4" />
                                  <span>Zoom</span>
                                  <div className="ml-auto flex items-center gap-2">
                                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setZoomLevel(z => Math.max(z - 10, 20))}><Minus className="w-4 h-4"/></Button>
                                      <span>{zoomLevel}%</span>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setZoomLevel(z => Math.min(z + 10, 200))}><Plus className="w-4 h-4"/></Button>
                                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setZoomLevel(100)}><Square className="w-4 h-4"/></Button>
                                  </div>
                              </DropdownMenuItem>
                          </DropdownMenuGroup>
                          {toolbarSettings.showPrint && <DropdownMenuItem onSelect={() => window.print()}>
                              <Printer className="mr-2 h-4 w-4" />
                              <span>Print...</span>
                              <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
                          </DropdownMenuItem>}
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
                                  {toolbarSettings.showCast && <DropdownMenuItem onSelect={() => toast({title: "Casting is not supported in this prototype."})}>
                                      <Cast className="mr-2 h-4 w-4" />
                                      <span>Cast...</span>
                                  </DropdownMenuItem>}
                                  {toolbarSettings.showCast && <DropdownMenuSeparator />}
                                  <DropdownMenuItem onSelect={() => window.print()}>
                                      <Download className="mr-2 h-4 w-4" />
                                      <span>Save page as...</span>
                                      <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={() => handleOpenAddShortcut()}>
                                      <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                                      <span>Create shortcut...</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {toolbarSettings.showCopyLink && <DropdownMenuItem onSelect={copyLink}>
                                      <LinkIcon className="mr-2 h-4 w-4" />
                                      <span>Copy link</span>
                                  </DropdownMenuItem>}
                                  {toolbarSettings.showSendToDevices && <DropdownMenuItem onSelect={() => toast({title: "Sending to other devices is not implemented in this prototype."})}>
                                      <Computer className="mr-2 h-4 w-4" />
                                      <span>Send to your devices</span>
                                  </DropdownMenuItem>}
                                  {toolbarSettings.showQRCode && <DropdownMenuItem onSelect={createQRCode}>
                                      <QrCode className="mr-2 h-4 w-4" />
                                      <span>Create QR Code</span>
                                  </DropdownMenuItem>}
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
                              <DropdownMenuItem onSelect={() => setActivePanel('customize')}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  <span>Customize Aisha</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:performance')}>
                                  <Gauge className="mr-2 h-4 w-4" />
                                  <span>Performance</span>
                              </DropdownMenuItem>
                              {toolbarSettings.showReadingMode && <DropdownMenuItem onSelect={() => setIsReadingModeOpen(true)}>
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  <span>Reading mode</span>
                              </DropdownMenuItem>}
                              {toolbarSettings.showTaskManager && <DropdownMenuItem onSelect={() => toast({ title: "Task Manager is not implemented." })}>
                                  <Gauge className="mr-2 h-4 w-4" />
                                  <span>Task manager</span>
                              </DropdownMenuItem>}
                              {toolbarSettings.showDevTools && <DropdownMenuItem onSelect={() => setIsConsoleOpen(true)}>
                                  <Terminal className="mr-2 h-4 w-4" />
                                  <span>Developer Console</span>
                              </DropdownMenuItem>}
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
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-80">
                             <div className="flex items-center justify-around px-2 py-2">
                                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { handleNavigation(activeTabId, 'about:bookmarks'); }}>
                                      <BookMarked className="h-6 w-6 text-muted-foreground" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { handleNavigation(activeTabId, 'about:downloads'); }}>
                                      <Download className="h-6 w-6 text-muted-foreground" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { handleNavigation(activeTabId, 'about:history'); }}>
                                      <HistoryIcon className="h-6 w-6 text-muted-foreground" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => { handleNavigation(activeTabId, 'about:settings'); }}>
                                      <Settings className="h-6 w-6 text-muted-foreground" />
                                  </Button>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={addTab}>
                                <Plus className="mr-4 h-5 w-5 text-muted-foreground" />
                                <span>New tab</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => window.open(window.location.href + '?incognito=true')}>
                                <ShieldOff className="mr-4 h-5 w-5 text-muted-foreground" />
                                <span>New Incognito window</span>
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
                             <DropdownMenuItem onSelect={() => handleNavigation(activeTabId, 'about:about')}>
                                  <Info className="mr-4 h-5 w-5 text-muted-foreground"/>
                                  <span>About Aisha</span>
                             </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setIsFeedbackOpen(true)}>
                                <HelpCircle className="mr-4 h-5 w-5 text-muted-foreground" />
                                <span>Help & feedback</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={handleSignOut}>
                              <LogOut className="mr-4 h-5 w-5 text-muted-foreground"/>
                              <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
               </div>
            </div>
          </div>
        </header>
        
        <div
          className="relative"
          onMouseLeave={() => {
            if (!showBookmarksBar) setIsBookmarksBarHovered(false);
          }}
        >
          <div
            className={cn("absolute top-0 left-0 w-full h-2 z-30", !showBookmarksBar ? "block" : "hidden")}
            onMouseEnter={() => {
              if (!showBookmarksBar) setIsBookmarksBarHovered(true);
            }}
          />
          <div
            style={showBookmarksBar || isBookmarksBarHovered ? { height: `${bookmarksBarHeight}px` } : { height: "0px" }}
            className={cn(
              "overflow-hidden border-b bg-card transition-[height] duration-300 ease-in-out relative",
              showBookmarksBar || isBookmarksBarHovered
                ? "opacity-100 p-4"
                : "opacity-0 p-0",
               !showBookmarksBar && !isBookmarksBarHovered ? "border-transparent" : "border-border"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {/* Section 1: Bookmarks */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground"><BookMarked className="w-4 h-4"/> Bookmarks</h3>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <div className="space-y-1 pr-4">
                    {bookmarks.length > 0 ? bookmarks.map(bookmark => (
                      <Button key={bookmark.url} variant="ghost" size="sm" className="w-full h-8 justify-start" onClick={() => { handleNavigation(activeTabId, bookmark.url); setIsBookmarksBarHovered(false); }}>
                        <Image src={`https://www.google.com/s2/favicons?sz=16&domain_url=${bookmark.url}`} width={16} height={16} alt={`${bookmark.title} favicon`} className="mr-2 rounded-sm"/>
                        <span className="text-xs font-light truncate">{bookmark.title}</span>
                      </Button>
                    )) : <p className="text-xs text-muted-foreground p-2">No bookmarks yet.</p>}
                  </div>
                </ScrollArea>
              </div>

              {/* Section 2: Tab Groups */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground"><PanelsTopLeft className="w-4 h-4"/> Tab Groups</h3>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <div className="space-y-1 pr-4">
                    {tabGroups.length > 0 ? tabGroups.map(group => (
                      <Button key={group.name} variant="ghost" size="sm" className="w-full h-8 justify-start" onClick={() => { setActiveTabId(group.tabs[0].id); setIsBookmarksBarHovered(false); }}>
                        <CircleIcon className="w-2.5 h-2.5 mr-2" style={{ color: group.color, fill: group.color }} />
                        <span className="text-xs font-light truncate flex-1">{group.name}</span>
                        <span className="text-xs font-light text-muted-foreground">{group.tabs.length}</span>
                      </Button>
                    )) : <p className="text-xs text-muted-foreground p-2">No tab groups created.</p>}
                  </div>
                </ScrollArea>
              </div>

              {/* Section 3: Tools */}
              <div>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-muted-foreground"><Sparkles className="w-4 h-4"/> Quick Tools</h3>
                <ScrollArea className="h-[calc(100%-40px)]">
                  <div className="space-y-1 pr-4">
                    {panelQuickTools.map(tool => (
                      <Button key={tool.label} variant="ghost" size="sm" className="w-full h-8 justify-start" onClick={() => { tool.action(); setIsBookmarksBarHovered(false); }}>
                        <tool.icon className="w-4 h-4 mr-2 text-muted-foreground"/>
                        <span className="text-xs font-light truncate">{tool.label}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 z-10">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                            const newState = !showBookmarksBar;
                            setShowBookmarksBar(newState);
                            if (!isIncognito) {
                                localStorage.setItem('aisha-show-bookmarks-bar', JSON.stringify(newState));
                            }
                            }}
                        >
                            {showBookmarksBar ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom"><p>{showBookmarksBar ? 'Hide Panel' : 'Show Panel'}</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div
              onPointerDown={handleBookmarksBarResizePointerDown}
              className="absolute bottom-0 left-0 w-full h-2 cursor-row-resize z-20"
            />
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          <main id="browser-content-area" className="flex-1 bg-background overflow-y-auto relative scrollbar-hide min-w-0">
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
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsFindOpen(false)}><X className="w-4 h-4"/></Button>
                      </div>
                  </Card>
              )}
          </main>
          {activePanel && !isMobile && (
            <aside 
              style={{ width: `${panelWidth}px` }} 
              className="relative h-full flex-shrink-0 flex flex-col"
            >
              <div 
                onPointerDown={handlePanelResizePointerDown}
                className="absolute left-0 -ml-1 top-0 h-full w-2 cursor-col-resize z-50"
              />
              <div className="flex-1 flex flex-col min-h-0">
                {activePanel === 'customize' && <CustomizePanel 
                    setIsOpen={(isOpen) => !isOpen && setActivePanel(null)}
                    handleThemeChange={handleThemeChange}
                    theme={theme}
                    showShortcuts={showShortcutsOnNtp}
                    setShowShortcuts={(show) => {
                        setShowShortcutsOnNtp(show);
                        if (!isIncognito) localStorage.setItem('aisha-show-shortcuts', JSON.stringify(show));
                    }}
                    shortcutSetting={shortcutSetting}
                    setShortcutSetting={(setting) => {
                        setShortcutSetting(setting);
                        if (!isIncognito) localStorage.setItem('aisha-shortcut-setting', setting);
                    }}
                    showCards={showCardsOnNtp}
                    setShowCards={(show) => {
                        setShowCardsOnNtp(show);
                        if (!isIncognito) localStorage.setItem('aisha-show-cards', JSON.stringify(show));
                    }}
                    showContinueWithTabs={showContinueWithTabsCard}
                    setShowContinueWithTabs={(show) => {
                        setShowContinueWithTabsCard(show);
                        if (!isIncognito) localStorage.setItem('aisha-continue-tabs', JSON.stringify(show));
                    }}
                    handleResetToDefault={handleResetToDefault}
                    followDeviceTheme={followDeviceTheme}
                    setFollowDeviceTheme={(follow) => {
                        setFollowDeviceTheme(follow);
                        if (!isIncognito) localStorage.setItem('aisha-follow-theme', JSON.stringify(follow));
                    }}
                    toast={toast}
                    toolbarSettings={toolbarSettings}
                    onToolbarSettingChange={handleToolbarSettingsChange}
                />}
                {activePanel === 'assistant' && <AishaAssistant
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
                    setActivePanel={setActivePanel}
                    setMobileMenuOpen={setMobileMenuOpen}
                    toggleMainSidebar={toggleMainSidebar}
                    setMobileSheetContent={setMobileSheetContent}
                    handleInstallClick={handleInstallClick}
                    handleAssistantSearch={handleAssistantSearch}
                    handleAttachment={handleAttachment}
                  />
                }
                {Object.keys(panelConfig).includes(activePanel) && (
                  <RightSidePanel 
                    title={panelConfig[activePanel].title} 
                    icon={panelConfig[activePanel].icon} 
                    panelId={activePanel} 
                    {...panelProps}
                  >
                    {panelConfig[activePanel].content}
                  </RightSidePanel>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>

      {isMobile && (
        <button
          className="fixed bottom-6 right-6 z-50 touch-none"
          style={{
            transform: `translate(${fabPosition.x}px, ${fabPosition.y}px)`,
            transition: isFabDragging ? 'none' : 'transform 0.3s ease-out',
          }}
          onPointerDown={handleFabPointerDown}
          onPointerMove={handleFabPointerMove}
          onPointerUp={handleFabPointerUp}
        >
            <div
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            >
              <Menu className="w-6 h-6" />
            </div>
        </button>
      )}

      <AlertDialog open={isClearDataOpen} onOpenChange={setIsClearDataOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear browsing data?</AlertDialogTitle>
            <AlertDialogDescription>
              This will clear your history, shortcuts, and bookmarks from this device. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearBrowsingData}>Clear data</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isBookmarkAlertOpen} onOpenChange={setIsBookmarkAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Cannot Bookmark This Page</AlertDialogTitle>
                <AlertDialogDescription>
                    You cannot bookmark an empty new tab or an internal browser page. Please navigate to a website first.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setIsBookmarkAlertOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isCloseLastTabAlertOpen} onOpenChange={setIsCloseLastTabAlertOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Cannot Close Last Tab</AlertDialogTitle>
                <AlertDialogDescription>
                    You cannot close the last remaining tab in the browser.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction onClick={() => setIsCloseLastTabAlertOpen(false)}>OK</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
      
      <Dialog open={isImageSearchOpen} onOpenChange={setIsImageSearchOpen}>
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
      
      <Dialog open={isAddOrEditShortcutOpen} onOpenChange={setIsAddOrEditShortcutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{shortcutToEdit ? 'Edit shortcut' : 'Add shortcut'}</DialogTitle>
            <DialogDescription>
              {shortcutToEdit ? 'Edit the name and URL for your shortcut.' : 'Enter a name and URL for your new shortcut.'}
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
            <Button onClick={handleSaveShortcut}>{shortcutToEdit ? 'Save changes' : 'Add Shortcut'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReadingModeOpen} onOpenChange={setIsReadingModeOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeTab?.title || "Reading Mode"}</DialogTitle>
            <DialogDescription>
              A simplified, clutter-free view of the page.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] my-4 pr-4">
            <div className="prose dark:prose-invert max-w-none">
              <h2>A Demonstration of Reading Mode</h2>
              <p>
                This is a sample of how Reading Mode would look. It provides a clean, distraction-free environment to focus on the content. The original page's text, headings, and essential images would be displayed here.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
              </p>
              <blockquote>
                Please note: This is a conceptual feature in this prototype. Due to web security restrictions (cross-origin policies), it cannot display content from external websites.
              </blockquote>
              <p>
                Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.
              </p>
            </div>
          </ScrollArea>
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
      
       {isMobile && activePanel && (
          <Dialog open={!!activePanel} onOpenChange={(isOpen) => !isOpen && setActivePanel(null)}>
              <DialogContent className="h-screen w-screen max-w-full p-0 flex flex-col gap-0 border-0 rounded-none">
                  {activePanel === 'assistant' && (
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
                        setActivePanel={setActivePanel}
                        setMobileMenuOpen={setMobileMenuOpen}
                        toggleMainSidebar={toggleMainSidebar}
                        setMobileSheetContent={setMobileSheetContent}
                        handleInstallClick={handleInstallClick}
                        handleAssistantSearch={handleAssistantSearch}
                        handleAttachment={handleAttachment}
                      />
                  )}
                  {activePanel === 'customize' && (
                      <CustomizePanel 
                        setIsOpen={(isOpen) => !isOpen && setActivePanel(null)}
                        handleThemeChange={handleThemeChange} 
                        theme={theme} 
                        isMobile 
                        showShortcuts={showShortcutsOnNtp}
                        setShowShortcuts={(show) => {
                            setShowShortcutsOnNtp(show);
                            if (!isIncognito) localStorage.setItem('aisha-show-shortcuts', JSON.stringify(show));
                        }}
                        shortcutSetting={shortcutSetting}
                        setShortcutSetting={(setting) => {
                            setShortcutSetting(setting);
                           if (!isIncognito) localStorage.setItem('aisha-shortcut-setting', setting);
                        }}
                        showCards={showCardsOnNtp}
                        setShowCards={(show) => {
                            setShowCardsOnNtp(show);
                          if (!isIncognito) localStorage.setItem('aisha-show-cards', JSON.stringify(show));
                        }}
                        showContinueWithTabs={showContinueWithTabsCard}
                        setShowContinueWithTabs={(show) => {
                            setShowContinueWithTabsCard(show);
                            if (!isIncognito) localStorage.setItem('aisha-continue-tabs', JSON.stringify(show));
                        }}
                        handleResetToDefault={handleResetToDefault}
                        followDeviceTheme={followDeviceTheme}
                        setFollowDeviceTheme={(follow) => {
                            setFollowDeviceTheme(follow);
                            if (!isIncognito) localStorage.setItem('aisha-follow-theme', JSON.stringify(follow));
                        }}
                        toast={toast}
                        toolbarSettings={toolbarSettings}
                        onToolbarSettingChange={handleToolbarSettingsChange}
                       />
                  )}
                  {Object.keys(panelConfig).includes(activePanel) && (
                    <RightSidePanel
                      isMobile
                      title={panelConfig[activePanel].title}
                      icon={panelConfig[activePanel].icon}
                      panelId={activePanel}
                      {...panelProps}
                    >
                      {panelConfig[activePanel].content}
                    </RightSidePanel>
                  )}
              </DialogContent>
          </Dialog>
      )}
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

    