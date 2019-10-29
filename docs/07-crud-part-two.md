# 7th Practical Class: Backend/Frontend full CRUD, JWT auth, Formik

## Frontend

- [Formik](https://jaredpalmer.com/formik/) form library for React
- [Yup](https://github.com/jquense/yup) schema validation

### Formik

Open `frontend/src/pages/SignUpPage.js`. And change return to this:

```js
<Formik
  initialValues={{ email: '', password: '', passwordConfirmation: '' }}
  onSubmit={values => {
    const { email, password } = values;
    console.log('SignUp!', { email, password });
  }}
>
  <SignUpTemplate
    isLoading={signupRequestState.isLoading}
    error={signupRequestState.error}
  />
</Formik>
```

---

Open `frontend/src/templates/SignUpTemplate.js`. And change return to this:

- change `<form>` to `<Form>` (this is Formik enhanced `<form>`)
- add fields:

```js
  <Field
    label="Email"
    name="email"
    type="email"
    placeholder="e.g. john@doe.com"
  />
  <Field
    name="password"
    label="Password"
    type="password"
  />
  <Field
    name="passwordConfirmation"
    label="Confirm Password"
    type="password"
  />
```

### Yup Validation

Add validation schema in `SignUpPage`:

```js
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

// ...

export function SignUpPage() {
  // ...
  return (
    <Formik
      validationSchema={schema}
      ...
    >
      ...
    </Formik>
  );
}
```

### Send API Request

To send the SignUp form to backend open `SignUpPage`:

```js
 <Formik
  ...
  onSubmit={values => {
    const { email, password } = values;

    signupRequest({
      url: '/auth/signup',
      method: 'POST',
      data: { email, password },
    }).then(({ data }) => {
      const { jwtToken, user } = data;

      auth.signin({ token: jwtToken, user });

      history.replace('/');
    });
  }}
```
