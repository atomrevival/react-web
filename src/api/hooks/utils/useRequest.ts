import {
  useCallback, useEffect, useRef, useState,
} from 'react';

export function useRequest<TData>(
  request: (...args: unknown[]) => Promise<TData>,
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
  }, [request]);

  useEffect(() => {
    if (!hasInitiallyRequestedData.current) {
      requestData();

      hasInitiallyRequestedData.current = true;
    }
  }, [requestData]);

  return {
    data,
    isLoading,
    error,
    refetch: requestData,
  } as const;
}
