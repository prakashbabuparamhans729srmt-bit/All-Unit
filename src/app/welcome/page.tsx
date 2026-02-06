
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { AishaLogo } from '@/components/icons/AishaLogo';

const DecorativeShapes = () => (
  <>
    {/* Top-left shapes */}
    <div className="absolute top-20 left-10 w-8 h-8 bg-red-500 transform -rotate-45" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
    <div className="absolute top-36 left-24 w-6 h-6 bg-gray-300" />
    <div className="absolute top-48 left-4 w-20 h-10 bg-blue-500 rounded-full" />
    <div className="absolute top-64 left-16 w-4 h-4 bg-gray-200 rounded-full" />

    {/* Top-right shapes */}
    <div className="absolute top-16 right-32 w-12 h-12 bg-gray-200/50 transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'rotate(135deg)' }} />
    <div className="absolute top-24 right-0 w-24 h-24 bg-yellow-400" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)' }}/>
    <div className="absolute top-48 right-12 w-16 h-8 bg-green-500 rounded-full" />
    <div className="absolute top-60 right-24 w-6 h-6 bg-gray-300/70" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}/>
  </>
);


const WelcomePage = () => {
  const router = useRouter();
  const handleGuestLogin = () => {
    sessionStorage.setItem('aisha-auth', 'true');
    router.push('/');
  };

  return (
    <div className="relative flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <header className="absolute top-0 left-0 p-6 flex items-center gap-2">
         <AishaLogo width={24} height={24} />
        <h1 className="text-lg font-semibold font-headline">Aisha</h1>
      </header>

      <DecorativeShapes />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <AishaLogo width={48} height={48} className="mb-6" />
        <h2 className="text-4xl font-semibold mb-4 font-headline">Who's using Aisha?</h2>
        <p className="max-w-md text-muted-foreground mb-12">
          With Aisha profiles, you can separate all your stuff. Create profiles for friends and family, or split between work and fun.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Existing Profile */}
            <Link href="/login" className="flex flex-col items-center gap-3 cursor-pointer group">
                <Avatar className="w-24 h-24 ring-2 ring-transparent group-hover:ring-primary transition-all">
                    <AvatarImage src="https://picsum.photos/seed/prakashbabu/100/100" alt="User profile" />
                    <AvatarFallback><User/></AvatarFallback>
                </Avatar>
                <p className="font-medium">Prakash Babu</p>
            </Link>

            {/* Add Profile */}
            <Link href="/signup" className="flex flex-col items-center justify-center gap-3 cursor-pointer group">
                 <Card className="w-24 h-24 flex items-center justify-center border-2 border-dashed bg-transparent group-hover:border-primary transition-all">
                    <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-all" />
                </Card>
                <p className="font-medium">Add</p>
            </Link>
        </div>
      </main>

      <footer className="absolute bottom-0 w-full p-6 flex justify-between items-center z-10">
        <Button variant="outline" onClick={handleGuestLogin}>
          <Shield className="w-4 h-4 mr-2" />
          Guest mode
        </Button>
        <div className="flex items-center space-x-2">
          <Checkbox id="show-on-startup" defaultChecked />
          <label
            htmlFor="show-on-startup"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show on startup
          </label>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
