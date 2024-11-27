import { useCallback, useEffect, useRef, useState } from "react";

interface UseRequestOptions {
  /**
   * Fetches data on first mount
   * @default `true`
   */
  hasInitialFetch?: boolean;
}

/**
 * A light version of react-query with no auto-refetching logic
 */
export function useRequest<TData>(
  request: (...args: unknown[]) => Promise<TData>,
  { hasInitialFetch } = { hasInitialFetch: true } as UseRequestOptions,
) {
  const hasInitiallyRequestedData = useRef<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TData>();
  const [error, setError] = useState<Error>();

  const requestData = useCallback(async () => {
    try {
      if (!isLoading) {
        setLoading(true);

        const res = await request();

        setData(res);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      } else {
        throw new Error(`An unknown error occured, ${e}`);
      }
    } finally {
      setLoading(false);
    }
  }, [isLoading, request]);

  useEffect(() => {
    if (hasInitialFetch && !hasInitiallyRequestedData.current) {
      requestData();

      hasInitiallyRequestedData.current = true;
    }
  }, [hasInitialFetch, requestData]);

  return {
    data,
    isLoading,
    error,
    refetch: requestData,
  } as const;
}
