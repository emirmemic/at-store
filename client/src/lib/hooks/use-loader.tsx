import { useState } from 'react';

import { APIResponse, StrapiError } from '@/lib/fetch-api';

interface UseLoaderProps<TParams, TResponse> {
  apiCall: (params?: TParams) => Promise<APIResponse<TResponse> | null>;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: StrapiError) => void;
}

export const useLoader = <TParams, TResponse>({
  apiCall,
  onSuccess,
  onError,
}: UseLoaderProps<TParams, TResponse>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<StrapiError | null>(null);

  const execute = async (params?: TParams): Promise<TResponse | null> => {
    setIsLoading(true);

    try {
      const response = await apiCall(params);

      if (response?.error) {
        setError(response.error);
        onError?.(response.error);
        return null;
      }

      const data = response?.data ?? null;
      if (data) onSuccess?.(data);
      return data;
    } catch (err) {
      const error: StrapiError = {
        status: 500,
        name: 'ExecutionError',
        message: err instanceof Error ? err.message : 'An error occurred',
        details: {},
      };
      setError(error);
      onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};
