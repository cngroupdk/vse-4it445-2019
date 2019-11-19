import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner, Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function SignInTemplate({ isLoading, error }) {
  const errorMessage = error && error.message;

  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign In</Heading>
        <form className="mt3">
          {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

          <div>Sign In form here...</div>

          <Button type="submit" className="mt2 mb3">
            Sign In
            {isLoading && (
              <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
            )}
          </Button>
        </form>
      </MainSection>
    </>
  );
}
