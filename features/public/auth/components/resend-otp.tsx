'use client';
import AuthWrapper from './auth-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constant/routes';
import { getSessionEmail } from '@/lib/session';
import { useApiMutation } from '@/hooks/use-api';
import { ApiStatusResponse } from '@/types/auth';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resendOtpSchema, ResendOtpValues } from '../schema/register-schema';
import { handleApiError } from '@/hooks/use-api-error';

const ResendOtp = () => {
  const router = useRouter();
  const userEmail = getSessionEmail();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendOtpValues>({
    resolver: zodResolver(resendOtpSchema),
    defaultValues: {
      email: userEmail ?? '',
    },
  });

  const resendOtpMutation = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.RESEND_OTP);

  const onSubmit = async (data: ResendOtpValues) => {
    try {
      const res = await resendOtpMutation.mutateAsync(data);
      if (res?.data?.status == true) {
        toast.success(res?.data.message);
        router.push(APP_ROUTES.PUBLIC_ROUTES.VERIFY_OTP.path);
      }
    } catch (err) {
      const { message } = handleApiError(err);
      toast.error(message);
    }
  };
  return (
    <AuthWrapper title="Welcome! Please Verify Your Account">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-10">
          <div className="form-group-row py-2">
            <label className="text-xl font-semibold">Email</label>
            <Input type="text" className="form-control" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-destructive mt-2">{errors.email.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="text-white bg-primary w-full mt-10"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Resend Otp
          </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default ResendOtp;
