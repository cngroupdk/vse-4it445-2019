import React from 'react';
import { Form, useField } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner, Heading, MainSection } from '../atoms/';
import { Field } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

function DummyField(props) {
  const [field, meta] = useField(props);
  return (
    <div>
      <input type="text" {...field} {...props} />
    </div>
  );
}

export function SignUpTemplate({ isLoading, error }) {
  const errorMessage = error && error.message;

  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign Up</Heading>
        <Form className="mt3">
          {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

          <div>Sign Up form here...</div>

          <Field name="email" label="Email" />
          <Field name="password" label="Password" type="password" />
          <Field
            name="passwordConfirmation"
            label="Password Confirmation"
            type="password"
          />

          <Button type="submit" className="mt2 mb3">
            Sign Up
            {isLoading && (
              <FontAwesomeIcon className="ml3" icon={faFeatherAlt} spin />
            )}
          </Button>
        </Form>
      </MainSection>
    </>
  );
}
