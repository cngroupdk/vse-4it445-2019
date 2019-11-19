import React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';

import { SignUpTemplate } from '../templates/SignUpTemplate';
import { useRequest } from '../hooks';
import { useAuth } from '../utils/auth';
// import { useApi } from '../utils/api';

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .label('Email'),
  password: yup
    .string()
    .required()
    .label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Both passwords must match')
    .label('Password Confirmation'),
});

export function SignUpPage() {
  const history = useHistory();
  const auth = useAuth();
  const [signupRequestState, signupRequest] = useRequest();
  // const api = useApi();

  return (
    <Formik
      initialValues={{ email: '', password: '', passwordConfirmation: '' }}
      validationSchema={schema}
      onSubmit={values => {
        const { email, password } = values;
        // api
        //   .post('auth/xsignup', {
        //     email,
        //     password,
        //   })
        signupRequest({
          url: '/auth/signup',
          method: 'POST',
          data: { email, password },
        }).then(({ data }) => {
          const { token, user } = data;
          auth.signin({ token, user });
          history.replace('/');
        });
      }}
    >
      <SignUpTemplate
        isLoading={signupRequestState.isLoading}
        error={signupRequestState.error}
      />
    </Formik>
  );
}
