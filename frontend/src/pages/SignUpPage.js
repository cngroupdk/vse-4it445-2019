import React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { SignUpTemplate } from '../templates/SignUpTemplate';
import { useRequest } from '../hooks';
import { useAuth } from '../utils/auth';

const schema = yup.object().shape({});

export function SignUpPage() {
  const history = useHistory();
  const auth = useAuth();
  const [signupRequestState, signupRequest] = useRequest();

  return (
    <SignUpTemplate
      isLoading={signupRequestState.isLoading}
      error={signupRequestState.error}
    />
  );
}
