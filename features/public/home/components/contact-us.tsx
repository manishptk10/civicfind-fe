'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import HeaderWrapper from './header-wrapper';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { ContactFormValues, contactSchema } from '../schema/contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiResponse, useApiMutation } from '@/hooks/use-api';
import { ApiStatusResponse } from '@/types/auth';
import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { AxiosError } from 'axios';

function ContactUs() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const { mutateAsync } = useApiMutation<ApiStatusResponse>('post', API_ENDPOINTS.CONTACT_US);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await mutateAsync(data);
      setLoading(true);
      toast.success(res.data.message);
      reset();
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError<ApiResponse>;
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <HeaderWrapper>
      <div className="flex">
        {/* LEFT FORM SECTION */}
        <div className="w-1/2 flex justify-center items-center px-10">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-semibold">We’d love to hear from you</h1>
            <p className="text-gray-600 mt-2">
              Have a question or need help? Fill out the form below.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="pt-8 space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <Input type="text" placeholder="Enter your full name" {...register('name')} />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold">Email</label>
                <Input type="email" placeholder="Enter your email" {...register('email')} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-semibold">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register('contactNumber')}
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm mt-2">{errors.contactNumber.message}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold">Message</label>
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-30"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-2">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full mt-4 bg-primary text-white flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-1/2 h-200 p-4 hidden md:block">
          <Image
            src="/images/theme/main-image.png"
            alt="Contact us"
            width={600}
            height={600}
            className="object-cover w-full h-full rounded-2xl"
            priority
          />
        </div>
      </div>
    </HeaderWrapper>
  );
}

export default ContactUs;
