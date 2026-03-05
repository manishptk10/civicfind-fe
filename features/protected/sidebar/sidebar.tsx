'use client';

import { sidebarItems } from '@/lib/sidebarItems';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import logo from '../../../public/images/logo/logo.png';
import Link from 'next/link';
import { IoLogOut } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { globalConfig } from '@/constant/global-config';
import { useApiMutation } from '@/hooks/use-api';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { ApiStatusResponse } from '@/types/auth';
import { APP_ROUTES } from '@/constant/routes';

const Sidebar = () => {
  const router = useRouter();
  const { mutateAsync } = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.LOGOUT);

  const handleLogout = async () => {
    try {
      const res = await mutateAsync(globalConfig.ACCESS_TOKEN);
      if (res.data.status == true) {
        Cookies.remove(globalConfig.ACCESS_TOKEN);
        toast.success(res.data.message);
        router.replace(APP_ROUTES.PUBLIC_ROUTES.HOME.path);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-1/6 flex">
      <div className="w-full flex flex-col">
        <div className="flex items-center justify-center gap-5">
          <Image src={logo} alt="logo" className="w-48 h-13.5" />
          <MenuIcon />
        </div>
        <div className="flex-1 mt-3 bg-primary">
          {/* {sidebarItems?.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex text-white text-sm py-3 px-4 gap-2  hover:bg-primary/90 items-center"
              >
                <Icon />
                <Link href={item.link}>{item.name}</Link>
              </div>
            );
          })} */}

          {sidebarItems
            ?.filter((item) => {
              if (!item.roles) return true;
              return item.roles.includes('admin' as 'admin' | 'user');
            })
            .map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex text-white text-sm py-3 px-4 gap-2 hover:bg-primary/90 items-center"
                >
                  <Icon />
                  <Link href={item.link}>{item.name}</Link>
                </div>
              );
            })}

          <div className="flex text-white text-md py-3 px-4 gap-2  hover:bg-primary/90 mt-7 items-center">
            <IoLogOut />
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
