'use client';

import Image from 'next/image';
import React from 'react';
import { usePathname } from 'next/navigation';
import { APP_ROUTES } from '@/constant/routes';
import Link from 'next/dist/client/link';

const AuthWrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  const pathname = usePathname();
  const isLoginAndRegister = [
    APP_ROUTES.PUBLIC_ROUTES.LOGIN.path,
    APP_ROUTES.PUBLIC_ROUTES.REGISTER.path,
  ].includes(pathname);
  return (
    <div className="flex justify-center h-screen ">
      <div className="w-1/2  p-5 flex flex-col">
        <div className="max-w-105 mx-auto w-full flex items-center flex-col py-8">
          <Link href={APP_ROUTES.PUBLIC_ROUTES.HOME.path}>
            <Image
              src={'/images/logo/logo.png'}
              alt="logo"
              className="w-62 h-14.5"
              height={58}
              width={248}
            />
          </Link>
          {isLoginAndRegister && <h2 className="text-2xl font-semibold pt-8">Get Started Now</h2>}
          <p className="text-base mt-4 font-bold">{title}</p>
          {children}
        </div>
      </div>
      <div className=" p-4 rounded-2xl">
        <Image
          src={'/images/theme/main-image.png'}
          alt="main image"
          className="object-cover h-full rounded-2xl w-full"
          height={600}
          width={600}
        />
      </div>
    </div>
  );
};

export default AuthWrapper;
