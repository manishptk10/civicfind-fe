import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/provider/QueryProvider';
import { Toaster } from 'sonner';
import PWARegister from './pwa-register';

export const metadata: Metadata = {
  title: 'CivicFind',
  description: 'Discover trusted civic information worldwide.',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased w-full min-h-screen box-content`}>
        <QueryProvider>
          <PWARegister />
          <Toaster position="top-center" duration={2000} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
