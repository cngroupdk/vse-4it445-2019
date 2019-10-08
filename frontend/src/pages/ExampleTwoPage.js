import React, { useEffect, useState, useRef } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

import axios from 'axios';

function useSimpleFetch(url) {
  const promiseRef = useRef(null);

  const [jokeState, setJokeState] = useState({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  const refetchRequest = () => {
    if (promiseRef.current) {
      console.log('---> shold cancel', promiseRef.current);
    }

    setJokeState(oldState => ({
      ...oldState,
      isLoading: true,
    }));

    const promise = (promiseRef.current = axios
      .get(url)
      .then(response => {
        if (promise !== promiseRef.current) {
          console.log('---> canceled');
          return;
        }

        console.log('----> success');

        promiseRef.current = null;
        setJokeState({
          data: response.data,
          isLoading: false,
          error: undefined,
        });
      })
      .catch(error => {
        if (promise !== promiseRef.current) {
          console.log('---> canceled');
          return;
        }

        setJokeState(oldState => {
          return {
            ...oldState,
            error: error.message,
            isLoading: false,
          };
        });
      }));
  };

  useEffect(() => {
    refetchRequest();

    return () => {
      promiseRef.current = null;
    };
  }, []);

  return [jokeState, refetchRequest];
}

export function ExampleTwoPage() {
  const [jokeState, refetchJoke] = useSimpleFetch(
    'https://api.chucknorris.io/jokes/random',
  );
  const [categoriesState] = useSimpleFetch(
    'https://api.chucknorris.io/jokes/categories',
  );

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example Two</Heading>
        <button type="button" onClick={() => refetchJoke()}>
          Refetch
        </button>
        {jokeState.isLoading && <div>Loading...</div>}
        {jokeState.error && <p>Error: {jokeState.error}</p>}
        {jokeState.data && <p>{jokeState.data.value}</p>}

        <p>Categories error: {categoriesState.error}</p>
      </MainSection>
    </div>
  );
}
