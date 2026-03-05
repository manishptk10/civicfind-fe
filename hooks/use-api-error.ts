import { AxiosError } from 'axios';
import { ApiResponse } from '@/hooks/use-api';

export const handleApiError = (err: unknown) => {
  let message = 'Something went wrong.';

  if (err instanceof AxiosError) {
    const error = err as AxiosError<ApiResponse>;
    message = error.response?.data?.message || error.message || message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return {
    message,
    error: err,
  };
};
