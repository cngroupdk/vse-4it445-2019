import React from 'react';
import classNames from 'classnames';

import { Button, TextArea } from '../atoms/';

export function QuackForm({
  text,
  setText,
  onSubmit,
  maxLength = 250,
  className,
}) {
  const length = !text ? 0 : text.length;
  const isLengthValid = length <= maxLength;
  return (
    <form
      className={classNames('pv2 black-90 bb b--black-10 cf', className)}
      onSubmit={e => {
        e.preventDefault();
        if (!onSubmit) return;
        onSubmit({ text });
      }}
    >
      <div>
        <TextArea
          value={text}
          onChange={e => {
            if (!setText) return;
            setText(e.target.value);
          }}
          name="comment"
          className="pa2 h3 mb2"
          placeholder="Quack somethig..."
        />
      </div>
      <div className="fr">
        <span
          className={classNames('f6 mr3', {
            'dark-red': !isLengthValid,
            'black-60': isLengthValid,
          })}
        >
          {length}/{maxLength}
        </span>
        <Button className="f5" type="submit">
          Quack
        </Button>
      </div>
    </form>
  );
}
