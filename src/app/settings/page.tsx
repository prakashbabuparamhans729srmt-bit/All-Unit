
"use client";

import React, { useState, useEffect } from 'react';
import {
  User,
  KeyRound,
  Shield,
  Gauge,
  Sparkles,
  Palette,
  Search as SearchIcon,
  Laptop,
  Power,
  Languages,
  Download,
  Accessibility,
  Cog,
  RefreshCw,
  Puzzle,
  Info,
  ChevronRight,
  ExternalLink,
  CreditCard,
  MapPin,
  Trash2,
  Cookie,
  ShieldAlert,
  ShieldCheck,
  Lock,
  FileKey2,
  Leaf,
  ScanEye,
  Pencil,
  Home,
  BookMarked
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { id: 'you-and-aisha', icon: User, text: 'You and Aisha' },
  { id: 'autofill-and-passwords', icon: KeyRound, text: 'Autofill and passwords' },
  { id: 'privacy-and-security', icon: Shield, text: 'Privacy and security' },
  { id: 'performance', icon: Gauge, text: 'Performance' },
  { id: 'ai', icon: Sparkles, text: 'AI' },
  { id: 'appearance', icon: Palette, text: 'Appearance' },
  { id: 'search-engine', icon: SearchIcon, text: 'Search engine' },
  { id: 'default-browser', icon: Laptop, text: 'Default browser' },
  { id: 'on-startup', icon: Power, text: 'On startup' },
  { id: 'languages', icon: Languages, text: 'Languages' },
  { id: 'downloads', icon: Download, text: 'Downloads' },
  { id: 'accessibility', icon: Accessibility, text: 'Accessibility' },
  { id: 'system', icon: Cog, text: 'System' },
  { id: 'reset-settings', icon: RefreshCw, text: 'Reset settings' },
  { id: 'extensions', icon: Puzzle, text: 'Extensions' },
  { id: 'about-aisha', icon: Info, text: 'About Aisha' },
];

const SettingsItem = ({ title, description, externalLink = false, icon: Icon, value, onClick, children }: {title: string, description?: string, externalLink?: boolean, icon?: React.ElementType, value?: string, onClick?: () => void, children?: React.ReactNode}) => (
  <>
    <Separator />
    <div className={`flex items-center py-4 ${onClick ? 'cursor-pointer hover:bg-muted/50 -mx-4 px-4' : ''}`} onClick={onClick}>
      {Icon && <Icon className="w-5 h-5 mr-4 text-muted-foreground" />}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center">
        {value && <p className="text-sm text-muted-foreground mr-2">{value}</p>}
        {children}
        {!children && onClick && (externalLink ? <ExternalLink className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />)}
      </div>
    </div>
  </>
)

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState('you-and-aisha');
  const { toast } = useToast();
  const [searchEngine, setSearchEngine] = useState('google');

  useEffect(() => {
    const savedEngine = localStorage.getItem('aisha-search-engine') || 'google';
    setSearchEngine(savedEngine);
  }, []);

  const handleNavigate = (url: string) => {
    window.parent.postMessage({ type: 'navigate', url }, '*');
  };

  const handleSearchEngineChange = (value: string) => {
    setSearchEngine(value);
    localStorage.setItem('aisha-search-engine', value);
    // This is a bit of a hack to trigger a storage event for other tabs.
    // A more robust solution might use BroadcastChannel or a state management library.
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'aisha-search-engine',
        newValue: value,
    }));
  };

  const handleClearBrowsingData = () => {
    localStorage.removeItem('aisha-bookmarks');
    localStorage.removeItem('aisha-shortcuts');
    // We can't clear iframe history easily, but we can clear our internal history tracking
    toast({ title: "Browsing data cleared", description: "Your bookmarks and shortcuts have been removed." });
     // This is a placeholder for a more robust history clearing mechanism
    window.parent.postMessage({ type: 'clear-history' }, '*');
  }

  const handleResetSettings = () => {
    localStorage.removeItem('aisha-bookmarks');
    localStorage.removeItem('aisha-shortcuts');
    localStorage.removeItem('aisha-search-engine');
    setSearchEngine('google');
     window.dispatchEvent(new StorageEvent('storage', { key: 'aisha-search-engine', newValue: 'google' }));
    toast({ title: "Settings reset", description: "All settings have been restored to their defaults." });
    window.parent.postMessage({ type: 'reset' }, '*');
  }

  const scrollToSection = (id: string) => {
    setActiveMenu(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const YouAndAisha = () => (
    <div className="space-y-6" id="you-and-aisha">
      <h2 className="text-2xl font-semibold">You and Aisha</h2>
      
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle>Get Aisha Smarts</CardTitle>
          <CardDescription>Sync and personalize Aisha across your devices.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Avatar className="h-10 w-10">
                  <AvatarImage src="https://picsum.photos/seed/prakashbabu/40/40" alt="User avatar" />
                  <AvatarFallback>U</AvatarFallback>
               </Avatar>
              <div>
                <p className="font-semibold">Energy burner of motivation</p>
                <p className="text-xs text-muted-foreground">prakashbabuparamhans729srmt@gmail.com</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast({title: "Signing out is not implemented."})}>Sign out</Button>
              <Button onClick={() => toast({title: "Sync is not implemented in this browser."})}>Turn on Sync</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <SettingsItem title="Sync and Aisha services" description="Services for search suggestions, security, and more" onClick={() => toast({title: "This feature is not implemented."})} />
          <SettingsItem title="Manage your Account" description="Control your data, privacy, and security" externalLink onClick={() => window.open('https://myaccount.google.com/', '_blank')} />
          <SettingsItem title="Customize your Aisha profile" description="Choose a profile name and picture" onClick={() => toast({title: "Profile customization is not implemented."})} />
          <SettingsItem title="Import bookmarks and settings" description="Get your favorites, history, and passwords from another browser" onClick={() => toast({title: "Importing is not implemented."})} />
        </CardContent>
      </Card>
    </div>
  );

  const AutofillAndPasswords = () => (
     <div className="space-y-6" id="autofill-and-passwords">
      <h2 className="text-2xl font-semibold">Autofill and passwords</h2>
      <Card>
        <CardContent className="pt-6">
          <SettingsItem icon={KeyRound} title="Aisha Password Manager" onClick={() => toast({title: "Password manager is not available."})} />
          <SettingsItem icon={CreditCard} title="Payment methods" onClick={() => toast({title: "Payment methods are not saved."})} />
          <SettingsItem icon={MapPin} title="Addresses and more" onClick={() => toast({title: "Address management is not implemented."})} />
          <SettingsItem icon={BookMarked} title="Bookmarks" description="Your saved bookmarks" onClick={() => handleNavigate('about:bookmarks')}/>
        </CardContent>
      </Card>
    </div>
  )

  const PrivacyAndSecurity = () => (
    <div className="space-y-8" id="privacy-and-security">
      <h2 className="text-2xl font-semibold">Privacy and security</h2>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Guide</CardTitle>
          <CardDescription>Review key privacy and security controls in Aisha.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-2">
            <Image src="https://www.gstatic.com/images/branding/product/2x/chrome_96dp.png" alt="Privacy Guide" width={80} height={80} className="opacity-50" />
            <div className="pt-2">
              <Button onClick={() => toast({title: "This is a placeholder for a privacy guide."})}>Get started</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Safety Check</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-4 text-blue-500"/>
              <div>
                <p className="font-semibold">Aisha is up to date</p>
                <p className="text-sm text-muted-foreground">Safety check helps keep you safe from data breaches, bad extensions, and more.</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => toast({title: "Running safety check...", description:"Everything looks good!"})}>Check now</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>More privacy</CardTitle></CardHeader>
        <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                  <div className="flex items-center py-4 cursor-pointer hover:bg-muted/50 -mx-4 px-4">
                    <Trash2 className="w-5 h-5 mr-4 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">Clear browsing data</h3>
                      <p className="text-sm text-muted-foreground">Clear history, cookies, cache, and more</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to clear browsing data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove your shortcuts and bookmarks. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearBrowsingData}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <SettingsItem icon={Cookie} title="Third-party cookies" description="Third-party cookies are allowed" onClick={() => toast({title: "Cookie settings are not available."})} />
            <SettingsItem icon={ShieldAlert} title="Ad privacy" description="Customize the info used by sites to show you ads" onClick={() => toast({title: "Ad privacy settings are not available."})} />
        </CardContent>
      </Card>

       <Card>
        <CardHeader><CardTitle>Security</CardTitle></CardHeader>
        <CardContent>
            <SettingsItem icon={ShieldCheck} title="Safe Browsing" description="Protection from dangerous sites" value="Standard protection" onClick={() => toast({title: "Safe browsing is not configurable."})} />
            <SettingsItem icon={Lock} title="Use secure DNS" description="Determines how to connect to sites over a secure connection" value="With your current service provider" onClick={() => toast({title: "DNS settings are not available."})} />
            <SettingsItem icon={FileKey2} title="Manage phone as a security key" description="Use your phone to sign in" onClick={() => toast({title: "This feature is not available."})} />
        </CardContent>
      </Card>
    </div>
  );

  const Performance = () => {
    const [memorySaver, setMemorySaver] = useState(true);
    const [energySaver, setEnergySaver] = useState(true);
    const [preloadPages, setPreloadPages] = useState(true);

    return (
        <div className="space-y-6" id="performance">
        <h2 className="text-2xl font-semibold">Performance</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Memory Saver</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                      When on, Aisha frees up memory from inactive tabs. This is a simulation.
                  </p>
                </div>
                <Switch checked={memorySaver} onCheckedChange={setMemorySaver} />
            </div>
            <Separator className="my-4"/>
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Always keep these sites active</h4>
              <Button variant="outline" size="sm" onClick={() => toast({title: "This feature is not implemented."})}>Add</Button>
            </div>
            <div className="text-center py-6 text-sm text-muted-foreground">
                No sites added
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Power</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div>
                <h4 className="font-medium">Energy Saver</h4>
                <p className="text-sm text-muted-foreground mt-1">
                    When on, Aisha conserves battery power. This is a simulation.
                </p>
                </div>
                <Switch checked={energySaver} onCheckedChange={setEnergySaver}/>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Speed</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Preload pages</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                      For faster browsing and searching. This is a simulation.
                  </p>
                </div>
                <Switch checked={preloadPages} onCheckedChange={setPreloadPages}/>
            </div>
          </CardContent>
        </Card>

        </div>
    );
  };
  
  const AiSettings = () => {
    const [helpMeWrite, setHelpMeWrite] = useState(true);
    
    return (
        <div className="space-y-6" id="ai">
            <h2 className="text-2xl font-semibold">Reimagine Aisha, supercharged with AI</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Things to consider</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Leaf className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">These features use AI, are in early development, and won't always get it right</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <ScanEye className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Data sent may be seen by human reviewers to improve Aisha AI's technology</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <SettingsItem icon={Pencil} title="Help me write" description="Helps you write short-form text on the web">
                  <Switch checked={helpMeWrite} onCheckedChange={setHelpMeWrite} />
                </SettingsItem>
              </CardContent>
            </Card>
        </div>
    );
  };

  const Appearance = () => {
    const [theme, setTheme] = useState('dark');
    const [showHome, setShowHome] = useState(false);
    const [showBookmarks, setShowBookmarks] = useState(true);
    
    useEffect(() => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme);
    }, []);

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        }
    };

    return (
        <div className="space-y-6" id="appearance">
          <h2 className="text-2xl font-semibold">Appearance</h2>
          <Card>
            <CardHeader><CardTitle>Customize Look</CardTitle></CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg flex items-center justify-center bg-background">
                <div className='w-full'>
                  <div className='text-center mb-4'>
                    <p className='font-bold'>Aisha Theme</p>
                  </div>
                   <div className="flex justify-center gap-4">
                      <div className="text-center">
                          <button onClick={() => handleThemeChange('light')} className={`w-24 h-16 rounded-lg border-2 ${theme === 'light' ? 'border-primary' : 'border-border'}`}>
                              <div className="h-full w-full bg-gray-100 rounded-md"></div>
                          </button>
                          <p className="text-sm mt-2">Light</p>
                      </div>
                      <div className="text-center">
                          <button onClick={() => handleThemeChange('dark')} className={`w-24 h-16 rounded-lg border-2 ${theme === 'dark' ? 'border-primary' : 'border-border'}`}>
                              <div className="h-full w-full bg-gray-800 rounded-md"></div>
                          </button>
                          <p className="text-sm mt-2">Dark</p>
                      </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
                <SettingsItem icon={Home} title="Show home button">
                    <Switch checked={showHome} onCheckedChange={setShowHome}/>
                </SettingsItem>
                <SettingsItem title="Show bookmarks bar">
                    <Switch checked={showBookmarks} onCheckedChange={setShowBookmarks}/>
                </SettingsItem>
                 <div className="p-4 flex items-center justify-between">
                    <div>
                    <h3 className="font-medium">Font size</h3>
                    </div>
                    <Select defaultValue="medium" onValueChange={(v) => toast({title: `Font size set to ${v}`})}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium (Recommended)</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
        </div>
    )
  };

  const SearchEngine = () => {
    return (
      <div className="space-y-6" id="search-engine">
        <h2 className="text-2xl font-semibold">Search engine</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Label htmlFor='search-engine-select' className="font-medium">Search engine used in the address bar</Label>
              <Select value={searchEngine} onValueChange={handleSearchEngineChange}>
                <SelectTrigger id="search-engine-select" className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="bing">Bing</SelectItem>
                  <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                  <SelectItem value="yahoo">Yahoo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SettingsItem 
              title="Manage search engines and site search" 
              description="Add, edit, or remove search engines"
              onClick={() => scrollToSection('search-engine')}
            />
          </CardContent>
        </Card>
      </div>
    );
  };
  
  const ResetSettings = () => (
    <div className="space-y-6" id="reset-settings">
       <h2 className="text-2xl font-semibold">Reset settings</h2>
        <Card>
          <CardContent className="pt-6">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex items-center py-4 cursor-pointer hover:bg-muted/50 -mx-4 px-4">
                    <RefreshCw className="w-5 h-5 mr-4 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-medium">Restore settings to their original defaults</h3>
                      <p className="text-sm text-muted-foreground">This will reset your startup page, new tab page, search engine, and pinned tabs.</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to reset all settings?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will restore all settings to their defaults, clearing all your custom shortcuts, bookmarks, and search engine preference. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetSettings}>Reset settings</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeMenu) {
      case 'you-and-aisha':
        return <YouAndAisha />;
      case 'autofill-and-passwords':
        return <AutofillAndPasswords />;
      case 'privacy-and-security':
        return <PrivacyAndSecurity />;
      case 'performance':
        return <Performance />;
      case 'ai':
        return <AiSettings />;
      case 'appearance':
        return <Appearance />;
      case 'search-engine':
        return <SearchEngine />;
      case 'reset-settings':
        return <ResetSettings />;
      case 'about-aisha':
        return (
          <div className="flex flex-col h-full items-center justify-center text-center p-10" id="about-aisha">
            <h1 className="text-6xl font-bold mb-4" style={{fontFamily: 'Google Sans, sans-serif'}}>Aisha</h1>
            <p className="text-muted-foreground">
              Version 1.0 (Prototype)
            </p>
             <p className="text-muted-foreground mt-2">
              Copyright © 2024. All rights reserved.
            </p>
          </div>
        );
      default:
        return (
          <Card className="flex h-full items-center justify-center min-h-60">
            <div className='text-center'>
                <div className='flex justify-center mb-4'>
                    {React.createElement(menuItems.find(item => item.id === activeMenu)?.icon || Cog, {className: "w-12 h-12 text-muted-foreground"})}
                </div>
                <h2 className='text-xl font-semibold mb-2'>{menuItems.find(item => item.id === activeMenu)?.text}</h2>
                <p className="text-muted-foreground">
                This settings page is a work in progress.
                </p>
            </div>
          </Card>
        );
    }
  };


  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="w-64 border-r border-border p-4 flex flex-col">
        <div className="px-2 pb-4">
          <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 overflow-y-auto pr-2 space-y-1">
            {menuItems.map(({ id, icon: Icon, text }) => (
              <Button
                key={id}
                variant={activeMenu === id ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 text-sm h-9"
                onClick={() => setActiveMenu(id)}
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span>{text}</span>
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="w-full max-w-lg mb-8">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input placeholder="Search settings" className="pl-10 h-10 bg-secondary border-none" />
            </div>
          </div>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
    
