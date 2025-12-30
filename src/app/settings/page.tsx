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
  ListPlus,
  Trash2,
  Cookie,
  ShieldAlert,
  ShieldCheck,
  Lock,
  FileKey2,
  Settings2,
  MessageSquareWarning,
  MessageSquare,
  ChevronDown,
  Pencil,
  ScanEye,
  Leaf,
  Home,
  BookMarked
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { icon: User, text: 'You and Aisha' },
  { icon: KeyRound, text: 'Autofill and passwords' },
  { icon: Shield, text: 'Privacy and security' },
  { icon: Gauge, text: 'Performance' },
  { icon: Sparkles, text: 'AI innovations' },
  { icon: Palette, text: 'Appearance' },
  { icon: SearchIcon, text: 'Search engine' },
  { icon: Laptop, text: 'Default browser' },
  { icon: Power, text: 'On startup' },
  { icon: Languages, text: 'Languages' },
  { icon: Download, text: 'Downloads' },
  { icon: Accessibility, text: 'Accessibility' },
  { icon: Cog, text: 'System' },
  { icon: RefreshCw, text: 'Reset settings' },
  { icon: Puzzle, text: 'Extensions' },
  { icon: Info, text: 'About Aisha' },
];

const SettingsItem = ({ title, description, externalLink = false, icon: Icon, value, onClick, children }: {title: string, description?: string, externalLink?: boolean, icon?: React.ElementType, value?: string, onClick?: () => void, children?: React.ReactNode}) => (
  <>
    <Separator />
    <div className={`flex items-center py-4 ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
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
  const [activeMenu, setActiveMenu] = useState('You and Aisha');
  const { toast } = useToast();

  const YouAndAisha = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">You and Aisha</h2>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Get Aisha smarts</h3>
            <p className="text-muted-foreground text-sm">Sync and personalize Aisha across your devices</p>
          </div>
          <Image src="https://www.gstatic.com/identity/boq/accountsettingsmobile/images/empty_state_desktop.svg" alt="Sync illustration" width={150} height={100} />
        </div>
        <Separator className="my-6" />
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
      </Card>
      <div className="flex flex-col">
        <SettingsItem title="Sync and Aisha services" description="Services for search suggestions, security, and more" onClick={() => toast({title: "This feature is not implemented."})} />
        <SettingsItem title="Manage your Account" description="Control your data, privacy, and security" externalLink onClick={() => toast({title: "This would open the account management page."})} />
        <SettingsItem title="Customize your Aisha profile" description="Choose a profile name and picture" onClick={() => toast({title: "Profile customization is not implemented."})} />
        <SettingsItem title="Import bookmarks and settings" description="Get your favorites, history, and passwords from another browser" onClick={() => toast({title: "Importing is not implemented."})} />
      </div>
    </div>
  );

  const AutofillAndPasswords = () => (
     <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Autofill and passwords</h2>
      </div>
      <Card className="p-0">
        <SettingsItem icon={KeyRound} title="Aisha Password Manager" onClick={() => toast({title: "Password manager is not available."})} />
        <SettingsItem icon={CreditCard} title="Payment methods" onClick={() => toast({title: "Payment methods are not saved."})} />
        <SettingsItem icon={MapPin} title="Addresses and more" onClick={() => toast({title: "Address management is not implemented."})} />
        <SettingsItem icon={BookMarked} title="Bookmarks" />
      </Card>
    </div>
  )

  const PrivacyAndSecurity = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold">Privacy and security</h2>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Take the Privacy Guide</h3>
            <p className="text-muted-foreground">Review key privacy and security controls in Aisha</p>
            <div className="pt-2">
              <Button onClick={() => toast({title: "Privacy Guide is not implemented."})}>Get started</Button>
              <Button variant="ghost" className="ml-2">No thanks</Button>
            </div>
          </div>
          <Image src="https://www.gstatic.com/images/branding/product/2x/chrome_96dp.png" alt="Privacy Guide" width={120} height={120} className="opacity-50" />
        </div>
      </Card>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Safety Check</h3>
        <Card className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="w-6 h-6 mr-4 text-blue-500"/>
            <div>
              <p className="font-semibold">Aisha is up to date</p>
              <p className="text-sm text-muted-foreground">Safety check complete</p>
            </div>
          </div>
          <Button onClick={() => toast({title: "Running safety check..."})}>Check now</Button>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Privacy</h3>
        <Card className="p-0">
            <SettingsItem icon={Trash2} title="Delete browsing data" description="Delete history, cookies, cache, and more" onClick={() => toast({title: "This feature is not implemented."})} />
            <SettingsItem icon={Cookie} title="Third-party cookies" description="Third-party cookies are allowed" onClick={() => toast({title: "Cookie settings are not available."})} />
            <SettingsItem icon={ShieldAlert} title="Ad privacy" description="Customize the info used by sites to show you ads" onClick={() => toast({title: "Ad privacy settings are not available."})} />
        </Card>
      </div>

       <div>
        <h3 className="text-lg font-semibold mb-2">Security</h3>
        <Card className="p-0">
            <SettingsItem icon={ShieldCheck} title="Safe Browsing" description="Protection from dangerous sites" value="Standard protection" onClick={() => toast({title: "Safe browsing is not configurable."})} />
            <SettingsItem icon={Lock} title="Use secure DNS" description="Determines how to connect to sites over a secure connection" value="With your current service provider" onClick={() => toast({title: "DNS settings are not available."})} />
            <SettingsItem icon={FileKey2} title="Manage phone as a security key" description="Use your phone to sign in" onClick={() => toast({title: "This feature is not available."})} />
        </Card>
      </div>
    </div>
  );

  const Performance = () => {
    const [memorySaver, setMemorySaver] = useState(true);
    const [energySaver, setEnergySaver] = useState(true);
    const [preloadPages, setPreloadPages] = useState(true);

    return (
        <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Performance</h2>
        <div>
            <Card className="p-6 divide-y divide-border">
            <div className="flex items-center justify-between pb-6">
                <div>
                <h4 className="font-medium">Memory Saver</h4>
                <p className="text-sm text-muted-foreground mt-1">
                    When on, Aisha frees up memory from inactive tabs. This is a simulation.
                </p>
                </div>
                <Switch checked={memorySaver} onCheckedChange={setMemorySaver} />
            </div>
            <div className="pt-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">Always keep these sites active</h4>
                    </div>
                    <Button variant="outline" onClick={() => toast({title: "This feature is not implemented."})}>Add</Button>
                </div>
                <div className="text-center py-6 text-sm text-muted-foreground">
                    No sites added
                </div>
            </div>
            </Card>
        </div>
        
        <div>
            <h3 className="text-lg font-semibold mb-2">Power</h3>
            <Card className="p-6">
            <div className="flex items-center justify-between">
                <div>
                <h4 className="font-medium">Energy Saver</h4>
                <p className="text-sm text-muted-foreground mt-1">
                    When on, Aisha conserves battery power. This is a simulation.
                </p>
                </div>
                <Switch checked={energySaver} onCheckedChange={setEnergySaver}/>
            </div>
            </Card>
        </div>

        <div>
            <h3 className="text-lg font-semibold mb-2">Speed</h3>
            <Card className="p-6">
            <div className="flex items-center justify-between">
                <div>
                <h4 className="font-medium">Preload pages</h4>
                <p className="text-sm text-muted-foreground mt-1">
                    For faster browsing and searching. This is a simulation.
                </p>
                </div>
                <Switch checked={preloadPages} onCheckedChange={setPreloadPages}/>
            </div>
            </Card>
        </div>

        </div>
    );
  };
  
  const AiInnovations = () => {
    const [helpMeWrite, setHelpMeWrite] = useState(true);
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Reimagine Aisha, supercharged with AI</h2>
            <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Things to consider</h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <Leaf className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">These features use AI, are in early development, and won't always get it right</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <ScanEye className="w-5 h-5 mt-0.5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Data sent may be seen by human reviewers to improve Aisha AI's technology</p>
                    </div>
                </div>
            </Card>
            
            <h3 className="text-lg font-semibold">AI innovations</h3>
            <Card className="p-0">
                <SettingsItem icon={Pencil} title="Help me write" description="Helps you write short-form text on the web">
                  <Switch checked={helpMeWrite} onCheckedChange={setHelpMeWrite} />
                </SettingsItem>
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
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Appearance</h2>
        <Card className="p-0">
            <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">Aisha Colors</p>
                </div>
                <Button variant="outline" onClick={() => toast({title: "Theme reset to default."})}>Reset to default</Button>
            </div>
            </div>
            <Separator />
            <div className="p-4">
            <div className="flex items-center justify-between">
                <div>
                <h3 className="font-medium">Mode</h3>
                </div>
                <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>
            <SettingsItem icon={Home} title="Show home button">
                <Switch checked={showHome} onCheckedChange={setShowHome}/>
            </SettingsItem>
            <SettingsItem title="Show bookmarks bar">
                <Switch checked={showBookmarks} onCheckedChange={setShowBookmarks}/>
            </SettingsItem>
             <div className="p-4">
            <div className="flex items-center justify-between">
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
            </div>
        </Card>
        </div>
    )
  };

  const SearchEngine = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Search engine</h2>
      <Card className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Search engine used in the address bar</h3>
            </div>
            <Select defaultValue="google">
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="bing">Bing</SelectItem>
                <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                <SelectItem value="yahoo">Yahoo!</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SettingsItem 
          title="Manage search engines and site search" 
          description="Add, edit, or remove search engines"
          onClick={() => toast({title: "This feature is not implemented."})}
        />
      </Card>
    </div>
  );


  const renderContent = () => {
    switch (activeMenu) {
      case 'You and Aisha':
        return <YouAndAisha />;
      case 'Autofill and passwords':
        return <AutofillAndPasswords />;
      case 'Privacy and security':
        return <PrivacyAndSecurity />;
      case 'Performance':
        return <Performance />;
      case 'AI innovations':
        return <AiInnovations />;
      case 'Appearance':
        return <Appearance />;
      case 'Search engine':
        return <SearchEngine />;
      case 'About Aisha':
        return (
          <div className="flex flex-col h-full items-center justify-center text-center">
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
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              {activeMenu} settings will be shown here.
            </p>
          </div>
        );
    }
  };


  return (
    <div className="flex h-full bg-background text-foreground">
      <aside className="w-80 border-r border-border p-4 space-y-2 flex flex-col">
        <div className="px-2 pb-2">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-0 overflow-y-auto pr-2">
            {menuItems.map(({ icon: Icon, text }) => (
              <Button
                key={text}
                variant={activeMenu === text ? 'secondary' : 'ghost'}
                className="w-full justify-start gap-3 text-md h-10"
                onClick={() => setActiveMenu(text)}
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span>{text}</span>
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
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

    