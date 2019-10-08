import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Heading, MainSection, TransparentButton } from '../atoms/';
import { QuackForm } from '../molecules/';
import { QuackList } from '../organisms/QuackList';
import { TopNavigation } from '../organisms/TopNavigation';

import { useApi } from '../utils/api';
import { usePromise } from '../hooks';

export function HomeTemplate({
  quacksState,
  refetchQuacks,
  onLikePress,
  quackFormState,
  currentUser,
}) {
  const api = useApi();
  const [jokeState, dispatchJoke] = usePromise();

  useEffect(() => {
    dispatchJoke(() =>
      api
        .get('https://api.chucknorris.io/jokes/random')
        .then(({ data }) => data),
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log('joke', jokeState);

  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Home</Heading>

        {currentUser && <QuackForm {...quackFormState} />}

        {quacksState.data && (
          <TransparentButton className="fr" onClick={() => refetchQuacks()}>
            <FontAwesomeIcon icon={faSyncAlt} spin={quacksState.isLoading} />{' '}
            Refresh
          </TransparentButton>
        )}

        <QuackList
          quacks={quacksState.data && quacksState.data.quacks}
          isLoading={quacksState.isLoading}
          error={quacksState.error}
          onLikePress={onLikePress}
          refetch={refetchQuacks}
        />
      </MainSection>
    </>
  );
}
