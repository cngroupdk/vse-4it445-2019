import { useEffect, useRef } from 'react';

export function useUpdatingRef(value) {
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}
