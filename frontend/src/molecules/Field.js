import React from 'react';
import { useField } from 'formik';

import { ErrorMessage, Label, TextInput } from '../atoms/';

export function Field({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="measure mb2">
      <Label>
        {label}
        <TextInput className="mb1" {...field} {...props} />
      </Label>

      {meta.touched && meta.error ? (
        <ErrorMessage className="mb1 f6">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
}
