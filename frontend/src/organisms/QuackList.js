import React from 'react';

import { Button, ErrorBanner, Loading } from '../atoms/';
import { Quack } from '../molecules/';

export function QuackList({ quacks, isLoading, error, onLikePress, refetch }) {
  return (
    <>
      {isLoading && !quacks && <Loading />}
      {error && (
        <ErrorBanner title={error.message}>
          <Button color="red" onClick={refetch}>
            Reload
          </Button>
        </ErrorBanner>
      )}
      {quacks &&
        quacks.map(quack => (
          <Quack key={quack.id} quack={quack} onLikePress={onLikePress} />
        ))}
    </>
  );
}
