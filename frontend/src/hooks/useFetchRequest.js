import { useCallback, useEffect } from 'react';
import merge from 'lodash/merge';

import { useRequest } from './useRequest';
import { useUpdatingRef } from './useUpdatingRef';

export function useFetchRequest({ lazy = false, ...options } = { lazy: true }) {
  const optionsRef = useUpdatingRef(options);

  const [requestState, request] = useRequest(lazy ? {} : { isLoading: true });

  const refetch = useCallback(
    function refetch(optionsUpdate = {}) {
      request(merge(optionsRef.current, optionsUpdate));
    },
    [request, optionsRef],
  );

  useEffect(() => {
    if (!lazy) {
      refetch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [requestState, refetch];
}
