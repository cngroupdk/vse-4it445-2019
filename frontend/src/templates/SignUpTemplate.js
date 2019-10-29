import React from 'react';
import { Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner, Heading, MainSection } from '../atoms/';
import { Field } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

export function SignUpTemplate({ isLoading, error }) {
  const errorMessage = error && error.message;

  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign Up</Heading>
        <form className="mt3">
          {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

          <div>Sign Up form here...</div>

          <Button type="submit" className="mt2 mb3">
            Sign Up
            {isLoading && (
              <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
            )}
          </Button>
        </form>
      </MainSection>
    </>
  );
}
