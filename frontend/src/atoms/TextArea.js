import React from 'react';
import classNames from 'classnames';

export function TextArea({ className, ...rest }) {
  return (
    <textarea
      className={classNames(
        'db border-box w-100 measure-wide ba b--black-20 br2',
        className,
      )}
      {...rest}
    />
  );
}
