'use server';

import { cookies } from 'next/headers';
import { globalConfig } from '@/constant/global-config';

export async function setAuthCookies(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(globalConfig.ACCESS_TOKEN, accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}
