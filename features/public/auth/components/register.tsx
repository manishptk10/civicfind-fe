'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useApiMutation } from '@/hooks/use-api';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { toast } from 'sonner';
import { Separator } from '@radix-ui/react-separator';
import AuthWrapper from './auth-wrapper';
import Link from 'next/link';
import { APP_ROUTES } from '@/constant/routes';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ApiStatusResponse } from '@/types/auth';
import { setSessionEmail } from '@/lib/session';
import { RegisterFormValues, registerSchema } from '@/features/public/auth/schema/register-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { setAuthCookies } from '@/app/actions/setAuthCookies';
import MaxSession from './max-session';
import { useToggle } from '@/hooks/use-toggle';
import { handleApiError } from '@/hooks/use-api-error';
import { usePasswordToggle } from '@/hooks/use-password-toggle';

function Register() {
  const router = useRouter();
  const { open, openFalse } = useToggle(false);
  const { visible, toggle, inputType } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const registerMutation = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.REGISTER);

  const googleMutation = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.GOOGLE_LOGIN);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await registerMutation.mutateAsync(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!res?.data?.status) {
        toast.error(res?.data?.message || 'Registration failed');
        return;
      }
      setSessionEmail(res.data.email);
      toast.success(res?.data.message);
      router.push(APP_ROUTES.PUBLIC_ROUTES.VERIFY_OTP.path);
    } catch (err) {
      const { message } = handleApiError(err);
      toast.error(message);
      console.error(err);
    }
  };

  const sigUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      const res = await googleMutation.mutateAsync({ idToken: token });
      if (!res?.data?.status) {
        toast.error(res?.data?.message || 'Google login failed');
        return;
      }
      await setAuthCookies(res.data.access_token);
      toast.success(res.data.message);
      router.replace(APP_ROUTES.PROTECTED_ROUTES.DASHBOARD.path);
    } catch (err) {
      const { message } = handleApiError(err);
      toast.error(message);
    }
  };

  return (
    <AuthWrapper title="Welcome! Please Register Your Account">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-10">
          <div className="form-group-row py-2">
            <label className="text-base font-semibold">Name</label>
            <Input type="name" {...register('name')} className="form-control" />
            {errors.name && <p className="text-sm text-destructive mt-2">{errors.name.message}</p>}
          </div>
          <div className="form-group-row py-2">
            <label className="text-base font-semibold">Email</label>
            <Input type="email" {...register('email')} className="form-control" />
            {errors.email && (
              <p className="text-sm text-destructive mt-2">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group-row py-2">
            <label className="text-base font-semibold">Phone</label>
            <Input {...register('phone')} className="form-control" />
            {errors.phone && (
              <p className="text-sm text-destructive mt-2">{errors.phone.message}</p>
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
            className="text-white bg-primary w-full mt-10"
          >
            Submit
          </Button>
        </form>
        <div className="flex items-center py-6">
          <Separator className="flex-1 bg-gray-300 h-px" />
          <span className="px-4 text-sm text-gray-500">OR</span>
          <Separator className="flex-1 bg-gray-300 h-px" />
        </div>

        <Button
          onClick={sigUpWithGoogle}
          disabled={googleMutation.isPending}
          loading={googleMutation.isPending}
          className="text-black bg-gray-200 w-full hover:bg-gray-200"
        >
          <FcGoogle size={18} />
          Signup with Google
        </Button>
        <p className="text-base font-light text-center mt-3">
          Already have an account ?{' '}
          <Link className="font-semibold" href={APP_ROUTES.PUBLIC_ROUTES.LOGIN.path}>
            SignIn
          </Link>
        </p>
      </div>
      {open && <MaxSession open={open} setOpen={openFalse} />}
    </AuthWrapper>
  );
}

export default Register;
