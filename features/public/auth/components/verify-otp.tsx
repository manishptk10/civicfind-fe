// "use client";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader, RefreshCw, ShieldCheck } from "lucide-react";
// import { useState } from "react";
// import AuthWrapper from "./auth-wrapper";
// import { clearSessionEmail, getSessionEmail } from "@/lib/session";
// import { API_ENDPOINTS } from "@/constant/api-endpoints";
// import { ApiStatusResponse } from "@/types/auth";
// import { ApiResponse, useApiMutation } from "@/hooks/use-api";
// import { AxiosError } from "axios";
// import { toast } from "sonner";
// import { setAuthCookies } from "@/app/actions/setAuthCookies";
// import { useRouter } from "next/navigation";
// import { APP_ROUTES } from "@/constant/routes";

// const VerifyOtp = () => {
//   const email = getSessionEmail();
//   const router = useRouter();
//   const [otp, setOtp] = useState("");

//   const handleResend = () => {
//     console.log("Resending OTP...");
//   };

//   const { mutateAsync, isPending } = useApiMutation<ApiStatusResponse>(
//     "post",
//     API_ENDPOINTS.VERIFY_OTP,
//   );

//   const handleVerify = async () => {
//     try {
//       const res = await mutateAsync({
//         email,
//         otp,
//       });
//       if (res?.data?.status === true) {
//         toast.success(res?.data?.message);
//         await setAuthCookies(res?.data.access_token);
//         router.replace(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
//         clearSessionEmail();
//       }
//     } catch (err) {
//       const error = err as AxiosError<ApiResponse>;
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <AuthWrapper title="Verify your account">
//       <Card className="mx-auto w-full mt-10 max-w-md border-none shadow-2xl bg-linear-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
//         <CardHeader className="space-y-3 text-center pb-2">
//           <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
//             <ShieldCheck className="h-8 w-8 text-primary" />
//           </div>
//           <CardTitle className="text-2xl font-bold tracking-tight">
//             Enter Verification Code
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-8 pt-2">
//           <div className="flex justify-center">
//             <InputOTP
//               maxLength={6}
//               value={otp}
//               onChange={setOtp}
//               containerClassName="group"
//             >
//               <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-2xl *:data-[slot=input-otp-slot]:font-medium *:data-[slot=input-otp-slot]:border-2 *:data-[slot=input-otp-slot]:rounded-xl focus-within:*:ring-2 focus-within:*:ring-primary/40 transition-all">
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//               </InputOTPGroup>

//               <InputOTPSeparator className="text-muted-foreground/70 mx-1 text-xl font-light">
//                 -
//               </InputOTPSeparator>

//               <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-2xl *:data-[slot=input-otp-slot]:font-medium *:data-[slot=input-otp-slot]:border-2 *:data-[slot=input-otp-slot]:rounded-xl focus-within:*:ring-2 focus-within:*:ring-primary/40 transition-all">
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//           </div>
//         </CardContent>

//         <CardFooter className="flex flex-col gap-4 pt-2">
//           <Button
//             type="submit"
//             className="w-full h-12 text-base font-medium shadow-lg transition-all hover:scale-[1.02]"
//             disabled={isPending || otp.length < 6}
//             onClick={handleVerify}
//           >
//             {isPending ? (
//               <Loader className="animate-spin duration-700" />
//             ) : (
//               "Verify"
//             )}
//           </Button>

//           <div className="flex items-center justify-center gap-2 text-sm">
//             <Button
//               variant="ghost"
//               size="sm"
//               className="gap-1.5 hover:bg-transparent hover:text-primary"
//               onClick={handleResend}
//               disabled={isPending}
//             >
//               <RefreshCw className={`h-4 w-4`} />
//               Resend Code
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>
//     </AuthWrapper>
//   );
// };

// export default VerifyOtp;

'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, RefreshCw, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import AuthWrapper from './auth-wrapper';
import { clearSessionEmail, getSessionEmail } from '@/lib/session';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { ApiStatusResponse } from '@/types/auth';
import { ApiResponse, useApiMutation } from '@/hooks/use-api';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { setAuthCookies } from '@/app/actions/setAuthCookies';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constant/routes';

const RESEND_TIMEOUT = 120;

const VerifyOtp = () => {
  const email = getSessionEmail();
  const router = useRouter();

  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const canResend = timeLeft <= 0;

  // ---------------- VERIFY OTP API ----------------
  const { mutateAsync: verifyOtp, isPending } = useApiMutation<ApiStatusResponse>(
    'post',
    API_ENDPOINTS.VERIFY_OTP,
  );

  // ---------------- RESEND OTP API ----------------
  const { mutateAsync: resendOtp, isPending: isResending } = useApiMutation<ApiStatusResponse>(
    'post',
    API_ENDPOINTS.RESEND_OTP,
  );

  // ---------------- COUNTDOWN EFFECT ----------------
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  // ---------------- VERIFY HANDLER ----------------
  const handleVerify = async () => {
    try {
      const res = await verifyOtp({
        email,
        otp,
      });

      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        await setAuthCookies(res?.data.access_token);
        router.replace(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
        clearSessionEmail();
      }
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ---------------- RESEND HANDLER ----------------
  const handleResend = async () => {
    if (!canResend) return;

    try {
      const res = await resendOtp({ email });

      if (res?.data?.status === true) {
        toast.success('OTP resent successfully');

        // Reset timer
        setTimeLeft(RESEND_TIMEOUT);
      }
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Format countdown MM:SS
  const formattedTime = `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`;

  return (
    <AuthWrapper title="Verify your account">
      <Card className="mx-auto w-full mt-10 max-w-md border-none shadow-2xl bg-linear-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
        <CardHeader className="space-y-3 text-center pb-2">
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Enter Verification Code
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 pt-2">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp} containerClassName="group">
              <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-2xl *:data-[slot=input-otp-slot]:font-medium *:data-[slot=input-otp-slot]:border-2 *:data-[slot=input-otp-slot]:rounded-xl focus-within:*:ring-2 focus-within:*:ring-primary/40 transition-all">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>

              <InputOTPSeparator className="text-muted-foreground/70 mx-1 text-xl font-light">
                -
              </InputOTPSeparator>

              <InputOTPGroup className="gap-3 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:text-2xl *:data-[slot=input-otp-slot]:font-medium *:data-[slot=input-otp-slot]:border-2 *:data-[slot=input-otp-slot]:rounded-xl focus-within:*:ring-2 focus-within:*:ring-primary/40 transition-all">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium shadow-lg transition-all hover:scale-[1.02]"
            disabled={isPending || otp.length < 6}
            onClick={handleVerify}
          >
            {isPending ? <Loader className="animate-spin duration-700" /> : 'Verify'}
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-black p-4 bg-transparent"
              onClick={handleResend}
              disabled={!canResend || isResending}
            >
              <RefreshCw className={`h-4 w-4 ${isResending ? 'animate-spin' : ''}`} />
              {canResend ? 'Resend Code' : `Resend in ${formattedTime}`}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </AuthWrapper>
  );
};

export default VerifyOtp;
