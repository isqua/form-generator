import { useEffect, useRef } from 'react';

import { debounce, debounceCallback, debounceResult } from '../utils/debounce';

export const useDebounce = <TArgs extends unknown[], TRes = void>(
  fn: debounceCallback<TArgs, TRes>,
  delayInMs: number,
): debounceResult<TArgs, TRes> => {
  const debouncedFunRef = useRef<debounceResult<TArgs, TRes>>(
    (...args: TArgs) => Promise.resolve(fn(...args)),
  );

  useEffect(() => {
    const [debouncedFun, teardown] = debounce<TArgs, TRes>(fn, delayInMs);

    debouncedFunRef.current = debouncedFun;

    return () => teardown();
  }, [fn, delayInMs]);

  return debouncedFunRef.current;
};
