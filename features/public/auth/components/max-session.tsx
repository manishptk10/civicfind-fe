'use client';

import { setAuthCookies } from '@/app/actions/setAuthCookies';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { APP_ROUTES } from '@/constant/routes';
import { ApiResponse, useApiMutation } from '@/hooks/use-api';
import { clearSessionEmail, getSessionEmail } from '@/lib/session';
import { ApiStatusResponse } from '@/types/auth';
import { AxiosError } from 'axios';
import { AlertTriangle, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import React from 'react';

type MaxSessionProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MaxSession({ open, setOpen }: MaxSessionProps) {
  const email = getSessionEmail();
  const router = useRouter();

  const { mutateAsync, isPending } = useApiMutation<ApiStatusResponse>(
    'post',
    API_ENDPOINTS.FORCE_LOGIN,
  );

  const handleClose = () => setOpen(false);

  const forceLogin = async () => {
    try {
      const res = await mutateAsync({ email });

      await setAuthCookies(res.data.access_token);
      toast.success(res.data.message);

      clearSessionEmail();
      handleClose();

      router.replace(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="items-center text-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
            <AlertTriangle className="h-7 w-7 text-yellow-600" />
          </div>

          <DialogTitle className="text-xl font-semibold">Session Limit Reached</DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            You’ve reached the maximum number of active sessions allowed for your account.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 rounded-lg bg-slate-50 px-4 py-2 text-center text-sm">
          Logged in as <span className="font-semibold">{email}</span>
        </div>

        <DialogFooter className="mt-6 flex gap-2 sm:justify-center">
          <Button
            disabled={isPending}
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={forceLogin}
          >
            {isPending ? <Loader className="animate-spin duration-700" /> : 'Logout All Sessions'}
          </Button>

          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MaxSession;
