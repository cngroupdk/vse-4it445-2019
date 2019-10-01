import React, { useState } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { formatDate } from '../utils/date';

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
  const allQuacks = [
    {},
    { text: 'Hello, World!', likes: 2 },
    {
      createdAt: '2019-08-03T09:09:34.023Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 10,
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
    },
  ];

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example One</Heading>
        <div>
          {allQuacks.map((quack, index) => (
            <SimpleQuack quack={quack} key={index} />
          ))}
        </div>
      </MainSection>
    </div>
  );
}
