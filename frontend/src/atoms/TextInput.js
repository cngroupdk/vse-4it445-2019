import React from 'react';
import classNames from 'classnames';

export function TextInput({ className, ...props }) {
  return (
    <input
      type="text"
      className={classNames(
        'border-box input-reset ba b--black-20 pa2 db w-100',
        className,
      )}
      {...props}
    />
  );
}
