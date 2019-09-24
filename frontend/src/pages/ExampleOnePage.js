import React, { useState, useEffect } from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { formatDate } from '../utils/date';

function SimpleQuack({ quack }) {
  const { createdAt, text, user } = quack;
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log(
      '---> SimpleQuack updated',
      text
    )
    window.document.title = `${counter}`
  }, [counter])

  return (
    <div className="bb b--black-10 pb2 mt2">
      {user
        && <h4 className="mv1">{user.screenName}</h4>}
      <h5 className="mv1">{
        createdAt ? formatDate(createdAt) : '(no date)'
      }</h5>
      <div>{text || <em>(no text)</em>}</div>
      <button
        type="button"
        onClick={() => {
          setCounter(counter + 1)
        }}
      >
        Likes: {counter}
      </button>
    </div>
  )
}

export function ExampleOnePage() {
  const allQuacks = [
    { text: 'Hello, World!' },
    {
      createdAt: '2019-08-03T09:09:34.023Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
    },
    {},
  ];

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example One</Heading>
        {allQuacks.map((quack, index) =>
          <SimpleQuack quack={quack} key={index} />
        )}
        {allQuacks.map((quack, index) => {
          const x = 'abc';
          return <SimpleQuack quack={quack} key={index} />
        })}
      </MainSection>
    </div>
  );
}
