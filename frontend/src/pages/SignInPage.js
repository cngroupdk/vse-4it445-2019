import React from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { SignInTemplate } from '../templates/SignInTemplate';
import { useRequest } from '../hooks';
import { useAuth } from '../utils/auth';

export function SignInPage() {
  return <SignInTemplate />;
}
