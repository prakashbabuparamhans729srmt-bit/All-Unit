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
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

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

      <SettingsItem title="Sync and Google services" description="Services for search suggestions, security, and more" />
      <SettingsItem title="Manage your Google Account" description="Control your data, privacy, and security to make Google work better for you" externalLink />
      <SettingsItem title="Customize your Chrome profile" description="Choose a profile name and picture" />
      <SettingsItem title="Import bookmarks and settings" description="Get your favorites, browsing history, passwords, and more from another browser" />
    </div>
  );

  const SettingsItem = ({ title, description, externalLink = false }: {title: string, description: string, externalLink?: boolean}) => (
    <>
      <Separator />
      <div className="flex items-center py-4">
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {externalLink ? <ExternalLink className="w-5 h-5 text-muted-foreground" /> : <ChevronRight className="w-5 h-5 text-muted-foreground" />}
      </div>
    </>
  )

  const renderContent = () => {
    switch (activeMenu) {
      case 'You and Google':
        return <YouAndGoogle />;
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

      <main className="flex-1 p-8">
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
