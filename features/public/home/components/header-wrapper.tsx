'use client';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/constant/routes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { label: 'Home', path: APP_ROUTES.PUBLIC_ROUTES.HOME.path },
    { label: 'About', path: APP_ROUTES.PUBLIC_ROUTES.ABOUT.path },
    { label: 'Contact Us', path: APP_ROUTES.PUBLIC_ROUTES.CONTACT_US.path },
  ];
  const isActive = (path: string) => {
    if (path === APP_ROUTES.PUBLIC_ROUTES.HOME.path) {
      return pathname === '/' || pathname === path;
    }
    return pathname === path;
  };

  const navButtonClass = (path: string) =>
    clsx(
      'px-4 py-2 rounded-full transition-all duration-200 cursor-pointer',
      isActive(path)
        ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
        : 'bg-transparent text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800',
    );

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <header className="sticky top-0 z-50 bg-zinc-50 dark:bg-black/120 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
        <div className="flex items-center justify-between px-8 py-5 max-w-400 mx-auto">
          <Link href={APP_ROUTES.PUBLIC_ROUTES.HOME.path}>
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              className="text-2xl font-bold tracking-tight"
              width={200}
              height={200}
            />
          </Link>
          <nav className="flex gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="default"
                className={navButtonClass(item.path)}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          <div className="flex gap-2">
            <Button
              className="bg-[#f0b623] text-black hover:bg-[#f0b623] rounded-2xl"
              onClick={() => handleNavigate(APP_ROUTES.PUBLIC_ROUTES.LOGIN.path)}
            >
              Sign In
            </Button>

            <Button
              className="bg-[#f0b623] text-black hover:bg-[#f0b623] rounded-2xl"
              onClick={() => handleNavigate(APP_ROUTES.PUBLIC_ROUTES.REGISTER.path)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

export default HeaderWrapper;
