import React from 'react';
import classNames from 'classnames';

export function AvatarPhoto({ src, alt, size = '3', className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={classNames(
        'ba b--black-10 db br2',
        `mw${size}`,
        `w${size}`,
        `h${size}`,
        className,
      )}
    />
  );
}
