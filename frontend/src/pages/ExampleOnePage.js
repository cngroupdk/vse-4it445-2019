import React, { useState } from 'react';
import classNames from 'classnames';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { formatDate } from '../utils/date';
import { getMockQuacks, getMockUser } from '../utils/mocks.js';

import './ColorButton.css';

console.log('all mocks', getMockQuacks());
console.log('mock user', getMockUser('johndoe'));

const oldArray = [1, 2, 3, 4];

function ColorButton({ variant = 'primary', children, ...rest }) {
  return (
    <button
      className={classNames('button', {
        primaryVariant: variant === 'primary',
        dangerVariant: variant === 'danger',
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

function SimpleQuack({ quack }) {
  const { user, text, createdAt, likes = 0 } = quack;

  const [counter, setCounter] = useState(likes);

  return (
    <div className="bb b--black-10 pb2 mt2">
      {user && <h4 className="mv1">user: {user.screenName}</h4>}
      <h5 className="mv1">{createdAt ? formatDate(createdAt) : '(no date)'}</h5>
      <div>{text || '(no text)'}</div>
      <button type="button" onClick={() => setCounter(counter + 1)}>
        Likes: {counter}
      </button>
    </div>
  );
}

export function ExampleOnePage() {
  const allQuacks = getMockQuacks();

  const [items, setItems] = useState([1, 2, 3]);

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example One</Heading>
        <code>{JSON.stringify(items)}</code>
        <ColorButton onClick={() => setItems([...items, 5])}>
          Button One
        </ColorButton>
        <ColorButton
          variant="danger"
          onClick={() => setItems(items.filter(item => item !== 5))}
        >
          Button Two
        </ColorButton>
        <div>
          {allQuacks.map((quack, index) => (
            <SimpleQuack quack={quack} key={index} />
          ))}
        </div>
      </MainSection>
    </div>
  );
}
