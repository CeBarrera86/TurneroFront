import { useCallback, useEffect, useMemo, useState } from 'react';
import { getFriendlyErrorMessage, request, defaultRetryOptions } from '@/data/http/httpClient';
import { resolveApiUrl } from '@/shared/config/config';

interface UseFetchDataOptions<T> {
  token?: string;
  enabled?: boolean;
  deps?: unknown[];
  onSuccess?: (data: T) => void;
  onError?: (message: string) => void;
}

export const useFetchData = <T>(url: string, options: UseFetchDataOptions<T> = {}) => {
  const { token, enabled = true, deps = [], onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const depsKey = useMemo(() => JSON.stringify(deps), [deps]);

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError('');

    try {
      const resolved = resolveApiUrl(url);
      const result = await request<T>(resolved, {
        token,
        ...defaultRetryOptions,
      });
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const message = getFriendlyErrorMessage(err);
      setError(message);
      onError?.(message);
    } finally {
      setLoading(false);
    }
  }, [url, token, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, depsKey]);

  return { data, error, loading, refetch: fetchData };
};
