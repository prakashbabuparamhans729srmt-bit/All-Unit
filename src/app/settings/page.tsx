"use client";

import React, { useState } from 'react';
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
  BookLock,
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

const menuItems = [
  { icon: User, text: 'You and Google' },
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
  { icon: Info, text: 'About Chrome' },
];

const SettingsItem = ({ title, description, externalLink = false, icon: Icon, value, onClick, children }: {title: string, description?: string, externalLink?: boolean, icon?: React.ElementType, value?: string, onClick?: () => void, children?: React.ReactNode}) => (
  <>
    <Separator />
    <div className="flex items-center py-4 cursor-pointer" onClick={onClick}>
      {Icon && <Icon className="w-5 h-5 mr-4 text-muted-foreground" />}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex items-center">
        {value && <p className="text-sm text-muted-foreground mr-2">{value}</p>}
        {children}
        {!children && (externalLink ? <ExternalLink className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />)}
      </div>
    </div>
  </>
)

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState('You and Google');

  const YouAndGoogle = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">You and Google</h2>
      </div>
      
      <Card className="p-6">
        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Get Google smarts in Chrome</h3>
            <p className="text-muted-foreground text-sm">Sync and personalize Chrome across your devices</p>
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
              <p className="text-xs text-muted-foreground">Signed in to prakashbabuparamhans729srmt@gmail.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Sign out of Chrome</Button>
            <Button>Turn on Sync</Button>
          </div>
        </div>
      </Card>
      <div className="flex flex-col">
        <SettingsItem title="Sync and Google services" description="Services for search suggestions, security, and more" />
        <SettingsItem title="Manage your Google Account" description="Control your data, privacy, and security to make Google work better for you" externalLink />
        <SettingsItem title="Customize your Chrome profile" description="Choose a profile name and picture" />
        <SettingsItem title="Import bookmarks and settings" description="Get your favorites, browsing history, passwords, and more from another browser" />
      </div>
    </div>
  );

  const AutofillAndPasswords = () => (
     <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Autofill and passwords</h2>
      </div>
      <Card className="p-0">
        <SettingsItem icon={KeyRound} title="Google Password Manager" externalLink />
        <SettingsItem icon={CreditCard} title="Payment methods" />
        <SettingsItem icon={MapPin} title="Addresses and more" />
        <SettingsItem icon={ListPlus} title="Enhanced autofill" description="Chrome understands forms better and can autofill them faster for you" />
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
            <p className="text-muted-foreground">Review key privacy and security controls in Chrome</p>
            <div className="pt-2">
              <Button>Get started</Button>
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
              <p className="font-semibold">Chrome found some safety recommendations for your review</p>
              <p className="text-sm text-muted-foreground">Passwords, notifications, permissions</p>
            </div>
          </div>
          <Button>Go to Safety Check</Button>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Privacy</h3>
        <Card className="p-0">
            <SettingsItem icon={Trash2} title="Delete browsing data" description="Delete history, cookies, cache, and more" />
            <SettingsItem icon={ShieldCheck} title="Privacy Guide" description="Review key privacy and security controls" />
            <SettingsItem icon={Cookie} title="Third-party cookies" description="Third-party cookies are allowed" />
            <SettingsItem icon={ShieldAlert} title="Ad privacy" description="Customize the info used by sites to show you ads" />
        </Card>
      </div>

       <div>
        <h3 className="text-lg font-semibold mb-2">Security</h3>
        <Card className="p-0">
            <SettingsItem icon={ShieldCheck} title="Safe Browsing" description="Protection from dangerous sites" value="Enhanced protection" />
            <SettingsItem icon={Lock} title="Use secure DNS" description="Determines how to connect to sites over a secure connection" value="With your current service provider" />
            <SettingsItem icon={FileKey2} title="Manage phone as a security key" description="Use your phone to sign in" />
            <SettingsItem icon={CreditCard} title="Manage certificates" />
            <SettingsItem icon={Settings2} title="Advanced" />
        </Card>
      </div>
    </div>
  );

  const Performance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Performance</h2>
        <Button variant="ghost" size="icon">
            <MessageSquareWarning className="w-5 h-5 text-muted-foreground"/>
        </Button>
      </div>
      <div>
        <Card className="p-6 divide-y divide-border">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h4 className="font-medium">Memory Saver</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Chrome frees up memory from inactive tabs. This gives active tabs and other apps more computer resources and keeps Chrome fast. Your inactive tabs automatically become active again when you go back to them. <a href="#" className="text-blue-500">Learn more about Memory Saver</a>
              </p>
            </div>
            <Switch />
          </div>
          <div className="pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-medium">Always keep these sites active</h4>
                    <p className="text-sm text-muted-foreground">Sites you add will always stay active and memory won't be freed up from them</p>
                </div>
                <Button variant="outline">Add</Button>
            </div>
            <div className="text-center py-6 text-sm text-muted-foreground">
                No sites added
            </div>
          </div>
        </Card>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Power</h3>
            <Button variant="ghost" size="icon"><MessageSquare className="w-5 h-5 text-muted-foreground"/></Button>
        </div>
        <Card className="p-6">
           <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Energy Saver</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Chrome conserves battery power by limiting background activity and visual effects, such as smooth scrolling and video frame rates. <a href="#" className="text-blue-500">Learn more about Energy Saver</a>
              </p>
            </div>
            <Switch defaultChecked/>
          </div>
          <RadioGroup defaultValue="battery" className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="battery" id="battery" />
              <Label htmlFor="battery">Turn on only when your battery is at 20% or lower</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unplugged" id="unplugged" />
              <Label htmlFor="unplugged">Turn on when your computer is unplugged</Label>
            </div>
          </RadioGroup>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Speed</h3>
            <Button variant="ghost" size="icon"><MessageSquare className="w-5 h-5 text-muted-foreground"/></Button>
        </div>
        <Card className="p-6">
           <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Preload pages</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Chrome preloads pages which makes browsing and searching faster. <a href="#" className="text-blue-500">Learn more about preload pages</a>
              </p>
            </div>
            <Switch defaultChecked/>
          </div>
           <RadioGroup defaultValue="standard" className="mt-6 space-y-6">
            <div className="flex items-start">
              <RadioGroupItem value="extended" id="extended" className="mt-1"/>
              <div className="ml-3 flex-1">
                <Label htmlFor="extended" className="font-medium">Extended preloading</Label>
                <p className="text-sm text-muted-foreground">More pages are preloaded. Pages may be preloaded through Google servers when requested by other sites.</p>
              </div>
              <Button variant="ghost" size="icon"><ChevronDown className="w-5 h-5 text-muted-foreground"/></Button>
            </div>
             <div className="flex items-start">
              <RadioGroupItem value="standard" id="standard" className="mt-1"/>
              <div className="ml-3 flex-1">
                <Label htmlFor="standard" className="font-medium">Standard preloading</Label>
                <p className="text-sm text-muted-foreground">Some of the pages you visit are preloaded</p>
              </div>
              <Button variant="ghost" size="icon"><ChevronDown className="w-5 h-5 text-muted-foreground"/></Button>
            </div>
          </RadioGroup>
        </Card>
      </div>

    </div>
  );

  const AiInnovations = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Reimagine Chrome, supercharged with AI</h2>
        <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Things to consider</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <Leaf className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">These features use AI, are in early development, and won't always get it right</p>
                </div>
                <div className="flex items-start gap-4">
                    <span className="font-bold text-lg text-muted-foreground">G</span>
                    <p className="text-sm text-muted-foreground">When you use these features, relevant data is sent to Google in order to create AI experiences</p>
                </div>
                <div className="flex items-start gap-4">
                    <ScanEye className="w-5 h-5 mt-0.5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Data sent to Google may be seen by human reviewers to improve Chrome AI's technology</p>
                </div>
            </div>
        </Card>
        
        <h3 className="text-lg font-semibold">AI innovations</h3>
        <Card className="p-0">
            <SettingsItem icon={Pencil} title="Help me write" description="Helps you write short-form text for things on the web, like reviews" />
        </Card>
    </div>
  );
  
  const Appearance = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Appearance</h2>
      <Card className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-muted-foreground">Chrome Colors</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><ExternalLink className="w-5 h-5 text-muted-foreground" /></Button>
              <Button variant="outline">Reset to default</Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="p-4">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Customize your toolbar</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><ExternalLink className="w-5 h-5 text-muted-foreground" /></Button>
              <Button variant="outline">Reset to default</Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="p-4">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mode</h3>
            </div>
            <Select defaultValue="dark">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SettingsItem icon={Home} title="Show home button" description="Disabled">
            <Switch />
        </SettingsItem>
        <SettingsItem title="Show bookmarks bar">
            <Switch defaultChecked />
        </SettingsItem>
        <SettingsItem title="Show tab groups in bookmarks bar">
            <Switch defaultChecked />
        </SettingsItem>
        <SettingsItem title="Automatically pin new tab groups created on any device to the bookmarks bar">
            <Switch defaultChecked />
        </SettingsItem>
        <div className="p-4">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Side panel position</h3>
            </div>
            <Select defaultValue="right">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Show on left</SelectItem>
                <SelectItem value="right">Show on right</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator/>
        <div className="p-4">
            <h3 className="font-medium">Tab hover preview card</h3>
        </div>
        <SettingsItem title="Show tab preview images">
            <Switch defaultChecked />
        </SettingsItem>
        <SettingsItem title="Show tab memory usage">
            <Switch defaultChecked />
        </SettingsItem>
         <div className="p-4">
           <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Font size</h3>
            </div>
            <Select defaultValue="medium">
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

  const renderContent = () => {
    switch (activeMenu) {
      case 'You and Google':
        return <YouAndGoogle />;
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
