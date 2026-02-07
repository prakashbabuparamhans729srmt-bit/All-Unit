import type {Metadata} from 'next';
import { Roboto, Rubik } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-roboto',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'All Unit',
  description: 'A custom browser experience built with Next.js by All Unit.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${rubik.variable} dark`} style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
