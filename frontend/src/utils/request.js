import { useEffect, useState, useRef } from 'react';
import { CancelToken } from 'axios';

import { useApi } from './api';
import { config } from '../config';

const log = config.REQUEST_LOGGING ? console.info : () => {};

export function useRequest(initialState = {}) {
  const api = useApi();
  const apiRef = useRef(api);
  const stateRef = useRef(null);

  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  const [state, setState] = useState(() => {
    return {
      data: null,
      isLoading: false,
      error: null,
      cancelSource: null,
      ...initialState,
      request: (url, options) => {
        sendRequest(url, options, { apiRef, stateRef, setState });
      },
    };
  });

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      cancelRequest(stateRef, 'Caneling pending request on component unmount.');
    };
  }, []);

  return state;
}

function sendRequest(
  url,
  { method = 'GET', onSuccess, ...options } = {},
  { apiRef, stateRef, setState },
) {
  log(`[api.${method}] start`, url);

  cancelRequest(stateRef, 'Request canceled.');

  const cancelSource = CancelToken.source();
  setState(oldState => ({
    ...oldState,
    isLoading: true,
    error: null,
    cancelSource,
  }));

  apiRef.current
    .request({
      url,
      method,
      cancelToken: cancelSource.token,
      ...options,
    })
    .then(response => {
      const { data } = response;
      log(`[api.${method}] success`, url, data);

      setState(oldState => ({
        ...oldState,
        data,
        isLoading: false,
        cancelSource: null,
        error: null,
      }));

      if (onSuccess) {
        onSuccess(response);
      }
    })
    .catch(error => {
      if (cancelSource && cancelSource.token && cancelSource.token.reason) {
        log(`[api.${method}] canceled`, url);
        // Ignore cancelation "errors"
        return;
      }

      log(`[api.${method}] error`, url, error);

      setState(oldState => ({
        ...oldState,
        isLoading: false,
        cancelSource: null,
        error: error,
      }));
    });
}

export function useFetchRequest(url, { lazy = false, ...options } = {}) {
  const fetchRequest = useRequest(lazy ? {} : { isLoading: true });

  const refetch = (optionsUpdate = {}) => {
    fetchRequest.request(url, { ...options, optionsUpdate });
  };

  useEffect(() => {
    if (!lazy) {
      refetch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    ...fetchRequest,
    refetch,
  };
}

function cancelRequest(stateRef, reason) {
  if (stateRef.current && stateRef.current.cancelSource) {
    stateRef.current.cancelSource.cancel(reason);
  }
}
