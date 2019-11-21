import React from 'react';
import classNames from 'classnames';

export const TextInput = React.forwardRef(function TextInput(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type="text"
      className={classNames(
        'border-box input-reset ba b--black-20 pa2 db w-100',
        className,
      )}
      {...props}
    />
  );
});
