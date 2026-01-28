import * as React from 'react';

export const AishaLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="aisha-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#DA5AEF" />
                <stop offset="1" stopColor="#4139D6" />
            </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="20" fill="url(#aisha-gradient)" />
        <g stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Globe */}
            <circle cx="20" cy="20" r="9" />
            <path d="M20 11V29" />
            <path d="M11 20H29" />
            <path d="M12.5 14C15.5 18 15.5 22 12.5 26" />
            <path d="M27.5 14C24.5 18 24.5 22 27.5 26" />
            {/* Magnifying glass */}
            <circle cx="24" cy="16" r="4" />
            <line x1="27" y1="19" x2="29" y2="21" />
        </g>
    </svg>
);
