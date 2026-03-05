'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useApiMutation } from '@/hooks/use-api';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { toast } from 'sonner';
import { APP_ROUTES } from '@/constant/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '@radix-ui/react-separator';
import { setAuthCookies } from '@/app/actions/setAuthCookies';
import AuthWrapper from './auth-wrapper';
import { Eye, EyeClosed } from 'lucide-react';
import { ApiStatusResponse } from '@/types/auth';
import { SignInFormValues, signinSchema } from '@/features/public/auth/schema/signin-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { setSessionEmail } from '@/lib/session';
import MaxSession from './max-session';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { useToggle } from '@/hooks/use-toggle';
import { handleApiError } from '@/hooks/use-api-error';
import { usePasswordToggle } from '@/hooks/use-password-toggle';

function SignIn() {
  const router = useRouter();
  const { open, openTrue, openFalse } = useToggle(false);
  const { visible, toggle, inputType } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const loginMutation = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.LOGIN);
  const googleLoginMutation = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.GOOGLE_LOGIN);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      const res = await googleLoginMutation.mutateAsync({ idToken: token });

      if (!res?.data?.status) {
        toast.error(res?.data?.message || 'Google login failed');
        return;
      }
      switch (res.data.code) {
        case 'LIMIT_EXCEED':
          toast.error(
            res.data.message ||
              'Maximum session limit exceeded. Please log out from other devices.',
          );
          setSessionEmail(res.data.email);
          openTrue();
          break;
        case 'BLOCKED':
          toast.error(res.data.message);
          break;
        default:
          toast.error(res.data.message || 'Something went wrong');
      }
      await setAuthCookies(res.data.access_token);
      toast.success(res?.data?.message);
      router.push(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
      return;
    } catch (err) {
      const { message } = handleApiError(err);
      toast.error(message);
    }
  };

  const onSubmit = async (data: SignInFormValues) => {
    console.log('sumit', data);

    try {
      const res = await loginMutation.mutateAsync(data);
      if (!res.data.status) {
        toast.error(res?.data?.message || 'Login failed');
        return;
      }
      switch (res.data.code) {
        case 'NOT_VERIFIED':
          toast.error(res.data.message || 'Your email is not verified. Please verify your email.');
          router.push(APP_ROUTES.PUBLIC_ROUTES.RESEND_OTP.path);
          break;
        case 'LIMIT_EXCEED':
          setSessionEmail(res.data.email);
          openTrue();
          break;
        case 'BLOCKED':
          toast.error(res.data.message || 'Your account is blocked. Please contact support.');
          break;
        default:
          toast.error(res.data.message || 'Something went wrong');
      }
      await setAuthCookies(res.data.access_token);
      toast.success(res?.data?.message);
      router.push(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
      return;
    } catch (err) {
      const { message } = handleApiError(err);
      toast.error(message);
    }
  };

  return (
    <AuthWrapper title="Welcome! Please Enter Your Credentials">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-10">
          <div className="form-group-row py-2">
            <label className="text-base font-semibold">Email</label>
            <Input type="email" {...register('email')} className="form-control" />
            {errors.email && (
              <p className="text-sm text-destructive mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group-row py-2">
            <label className="text-base font-semibold">Password</label>
            <div className="relative">
              <Input type={inputType} {...register('password')} className="form-control" />
              <Button
                type="button"
                variant="ghost"
                onClick={toggle}
                className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700  bg-transparent hover:bg-transparent focus:outline-none"
              >
                {!visible ? <EyeClosed size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive mt-2">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="text-white bg-primary w-full mt-5"
          >
            Sign In
          </Button>
        </form>
        <div className="flex items-center py-6">
          <Separator className="flex-1 bg-gray-300 h-px" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <Separator className="flex-1 bg-gray-300 h-px" />
        </div>
        <Button
          onClick={loginWithGoogle}
          disabled={isSubmitting}
          loading={isSubmitting}
          className="text-black bg-gray-200 w-full hover:bg-gray-200"
        >
          <FcGoogle size={18} />
          Sign in with Google
        </Button>
        <p className="text-base font-light text-center mt-3">
          Dont have an account ?{' '}
          <Link className="font-semibold" href={APP_ROUTES.PUBLIC_ROUTES.REGISTER.path}>
            SignUp
          </Link>
        </p>
      </div>
      {open && <MaxSession open={open} setOpen={openFalse} />}
    </AuthWrapper>
  );
}

export default SignIn;
