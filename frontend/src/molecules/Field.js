import React from 'react';

import { ErrorMessage, Label, TextInput } from '../atoms/';

export function Field({ id, label, error, ...props }) {
  return (
    <div className="measure mb2">
      <Label htmlFor={id}>{label}</Label>
      <TextInput id={id} className="mb1" {...props} />
      {error && <ErrorMessage className="mb1 f6">{error}</ErrorMessage>}
    </div>
  );
}
