import React from 'react';
import classNames from 'classnames';

const HEADING_SIZES = {
  xl: ['h1', 'f2'],
  lg: ['h2', 'f3'],
  md: ['h3', 'f4'],
  sm: ['h4', 'f5'],
  xs: ['h5', 'f6'],
};

export function Heading({ children, className, size = 'xl', ...rest }) {
  const [Component, headingClasses] =
    HEADING_SIZES[size] || HEADING_SIZES['xl'];

  return (
    <Component
      className={classNames(headingClasses, 'ma0 tracked-tight', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
