import { useCallback, useEffect, useRef } from 'react';
import { CancelToken } from 'axios';

import { useApi } from '../utils/api';
import { config } from '../config';
import { usePromise } from './usePromise';
import { useUpdatingRef } from './useUpdatingRef';

const log = config.REQUEST_LOGGING ? console.info : () => {};

const MESSAGES = {
  cancelPreviousRequest: 'Previous request canceled.',
  cancelOnUnmount: 'Caneling pending request on component unmount.',
};

export function useRequest(initialState = {}) {
  const api = useApi();
  const apiRef = useUpdatingRef(api);
  const cancelRef = useRef(null);

  const [promiseState, promiseDispatch] = usePromise(initialState);

  const cancel = useCallback(function cancel(reason) {
    tryToCancelRequest(cancelRef, reason);
  }, []);

  const request = useCallback(
    function request(options) {
      const { method = 'GET', url } = options;

      log(`[api.${method}] start`, url, options);

      tryToCancelRequest(cancelRef, MESSAGES.cancelPreviousRequest);

      const cancelSource = CancelToken.source();
      cancelRef.current = cancelSource;

      const requestPromise = apiRef.current.request({
        cancelToken: cancelSource.token,
        ...options,
      });

      promiseDispatch(
        () =>
          requestPromise
            .then(response => {
              const { data } = response;

              log(`[api.${method}] success`, url, data);

              cancelRef.current = null;
              return data;
            })
            .catch(error => {
              const isCanelation =
                cancelSource && cancelSource.token && cancelSource.token.reason;

              cancelRef.current = null;

              if (isCanelation) {
                log(`[api.${method}] canceled`, url);
                return; // ignore cancelation "errors"
              }

              log(`[api.${method}] error`, url, error);

              return Promise.reject(error);
            }),
        { error: undefined },
      );

      return requestPromise;
    },
    [apiRef, promiseDispatch],
  );

  useEffect(function cancelRunningRequest() {
    return () => tryToCancelRequest(cancelRef, MESSAGES.cancelOnUnmount);
  }, []);

  return [promiseState, request, cancel];
}

function tryToCancelRequest(cancelRef, reason) {
  if (!cancelRef.current) return;

  cancelRef.current.cancel(reason);
  cancelRef.current = null;
}
