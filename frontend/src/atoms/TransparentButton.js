import React from 'react';
import classNames from 'classnames';

export function TransparentButton({ children, className, ...rest }) {
  return (
    <button
      className={classNames(
        'f6 black-60 button-reset bn dim pointer pa2',
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
}
