import { useCallback, useEffect, useState, useRef } from 'react';

export function usePromise(initialState = {}) {
  const [state, setState] = useState(() => {
    return {
      data: undefined,
      isLoading: false,
      error: undefined,
      ...initialState,
    };
  });

  const currentPromiseRef = useRef(null);

  const dispatch = useCallback(function dispatch(getPromise) {
    const promise = getPromise();
    currentPromiseRef.current = promise;

    setState(oldState => ({ ...oldState, isLoading: true }));

    promise
      .then(data => {
        if (currentPromiseRef.current !== promise) return;
        currentPromiseRef.current = null;

        setState(oldState => ({
          ...oldState,
          data,
          isLoading: false,
          error: undefined,
        }));
      })
      .catch(error => {
        if (currentPromiseRef.current !== promise) return;
        currentPromiseRef.current = null;

        setState(oldState => ({
          ...oldState,
          isLoading: false,
          error,
        }));
      });
  }, []);

  useEffect(function cleanup() {
    return () => (currentPromiseRef.current = null);
  }, []);

  return [state, dispatch];
}
