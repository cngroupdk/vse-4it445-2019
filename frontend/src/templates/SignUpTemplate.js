import React from 'react';
import { Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Button, ErrorBanner, Heading, MainSection } from '../atoms/';
import { Field } from '../molecules/';
import { TopNavigation } from '../organisms/TopNavigation';

// import { useField } from 'formik';
// function DummyField(props) {
//   const [field, meta] = useField(props);

//   return (
//     <div>
//       <input type="text" {...field} {...props} />
//     </div>
//   );
// }

export function SignUpTemplate({ isLoading, error }) {
  const errorMessage = error && error.message;

  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>Sign Up</Heading>
        <Form className="mt3">
          {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}

          <Field label="Email" name="email" type="text" />
          <Field label="Password" name="password" type="password" />
          <Field
            label="Password Confirmation"
            name="passwordConfirmation"
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
