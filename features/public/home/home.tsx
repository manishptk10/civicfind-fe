'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { APP_ROUTES } from '@/constant/routes';
import { useRouter } from 'next/navigation';
import { ArrowRight, Globe, ShieldCheck, Search } from 'lucide-react';
import HeaderWrapper from './components/header-wrapper';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <HeaderWrapper>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 py-16 max-w-400 mx-auto">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find What Matters Most
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
            Discover trusted civic information, explore global insights, and stay connected — all in
            one modern platform.
          </p>
          <div className="mt-8 flex gap-4">
            <Button size="lg" onClick={() => router.push(APP_ROUTES.PUBLIC_ROUTES.LOGIN.path)}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push(APP_ROUTES.PUBLIC_ROUTES.ABOUT.path)}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative w-full h-105 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/theme/main-image.png"
            alt="CivicFind Preview"
            className="object-cover w-full h-full"
            width={600}
            height={600}
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <Feature
            icon={<Search className="h-6 w-6" />}
            title="Smart Discovery"
            description="Quickly search and explore trusted civic data with a clean and intuitive experience."
          />
          <Feature
            icon={<Globe className="h-6 w-6" />}
            title="Global Reach"
            description="Access insights and information from around the world in one unified platform."
          />
          <Feature
            icon={<ShieldCheck className="h-6 w-6" />}
            title="Secure & Reliable"
            description="Built with modern authentication and secure infrastructure you can trust."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to explore CivicFind?</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Create an account or sign in to get started today.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" onClick={() => router.push(APP_ROUTES.PUBLIC_ROUTES.LOGIN.path)}>
            Sign In
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(APP_ROUTES.PUBLIC_ROUTES.REGISTER.path)}
          >
            Sign Up
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-6 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} CivicFind. All rights reserved.
      </footer>
    </HeaderWrapper>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border p-8 shadow-sm hover:shadow-md transition">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
