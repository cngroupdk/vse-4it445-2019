import React, { useEffect, useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

import { useApi } from '../utils/api';

function useSimpleFetch(url) {
  const api = useApi();

  const [jokeState, setJokeState] = useState({
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  const fetchData = () => {
    setJokeState(oldState => ({
      ...oldState,
      isLoading: true,
    }));

    api
      .get(url)
      .then(({ data }) => {
        setJokeState({
          isLoading: false,
          data,
          error: undefined,
        });
      })
      .catch(error => {
        setJokeState(oldState => {
          return {
            ...oldState,
            isLoading: false,
            error: error.message,
          };
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [jokeState, fetchData];
}

export function ExampleTwoPage() {
  const [jokeState, refreshJoke] = useSimpleFetch(
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
        <button type="button" onClick={() => refreshJoke()}>
          Refresh
        </button>
        {jokeState.isLoading && <div>Loading...</div>}
        {jokeState.error && <p>Error: {jokeState.error}</p>}
        {jokeState.data && <p>{jokeState.data.value}</p>}
        <p>Categories: {JSON.stringify(categoriesState.data)}</p>
      </MainSection>
    </div>
  );
}
