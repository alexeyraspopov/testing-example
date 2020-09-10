import { useState, useCallback } from 'react';

export default function useAsyncCallback(fn, deps) {
  let [response, setResponse] = useState({ type: 'Idle' });

  /* eslint react-hooks/exhaustive-deps: off */
  let action = useCallback(async (...args) => {
    try {
      setResponse({ type: 'Pending' });
      setResponse({ type: 'Success', result: await fn(...args) });
    } catch (error) {
      setResponse({ type: 'Failure', error });
    }
  }, deps);

  return [response, action];
}
