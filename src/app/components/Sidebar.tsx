
"use client";

import { useState } from 'react';
import {
    AppWindow,
    Play,
    History,
    Download,
    Bookmark,
    Settings,
    LogOut,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface SidebarProps {
    onNavigate: (url: string) => void;
    onSetOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ onNavigate, onSetOpen }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
        onSetOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        onSetOpen(false);
    };

    const navItems = [
        { icon: Play, label: 'Media', action: () => onNavigate('about:blank') },
        { icon: History, label: 'History', action: () => onNavigate('about:history') },
        { icon: Download, label: 'Downloads', action: () => onNavigate('about:downloads') },
        { icon: Bookmark, label: 'Bookmarks', action: () => onNavigate('about:bookmarks') },
        { icon: Settings, label: 'Settings', action: () => onNavigate('about:settings') },
    ];

    return (
        <TooltipProvider>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col items-center py-4 transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-16'}`}
            >
                <div className="mb-8">
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <button onClick={() => onNavigate('about:about')} className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-sidebar-accent">
                                <AppWindow className="h-7 w-7 text-cyan-400" />
                                {isOpen && <span className="ml-4 font-semibold text-lg">Aisha</span>}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>About Aisha</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                <nav className="flex flex-col items-start w-full px-2 space-y-2 flex-1">
                    {navItems.map((item, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <button onClick={item.action} className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                    <item.icon className="h-6 w-6" />
                                    {isOpen && <span className="ml-4">{item.label}</span>}
                                </button>
                            </TooltipTrigger>
                            {!isOpen && (
                                <TooltipContent side="right">
                                    <p>{item.label}</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    ))}
                </nav>

                <div className="mt-auto">
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="w-full flex items-center p-3 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                <LogOut className="h-6 w-6" />
                                {isOpen && <span className="ml-4">Logout</span>}
                            </button>
                        </TooltipTrigger>
                        {!isOpen && (
                             <TooltipContent side="right">
                                <p>Logout</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default Sidebar;
