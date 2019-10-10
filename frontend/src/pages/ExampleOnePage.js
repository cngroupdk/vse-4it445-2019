import React, { useState } from 'react';
import classNames from 'classnames';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';
import { formatDate } from '../utils/date';
import { getMockQuacks, getMockUser } from '../utils/mocks';

import styles from './ExampleOnePage.module.css';

function SimpleQuack({ quack, onRemove, onLike }) {
  const { id, user, text, createdAt, likeCount } = quack;

  return (
    <div className="bb b--black-10 pb2 mt2">
      {user && <h4 className="mv1">user: {user.screenName}</h4>}
      <h5 className="mv1">{createdAt ? formatDate(createdAt) : '(no date)'}</h5>
      <div>{text || '(no text)'}</div>
      <button
        type="button"
        onClick={() => onLike(id)}
        className={classNames({
          [styles.blackBg]: likeCount <= 4,
          [styles.orangeBg]: likeCount > 4 && likeCount < 10,
          [styles.redBg]: likeCount >= 10,
        })}
      >
        Likes: {likeCount}
      </button>{' '}
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
}

export function ExampleOnePage() {
  const [quackText, setQuackText] = useState('');
  const [allQuacks, setAllQuacks] = useState(getMockQuacks());

  function addQuack() {
    if (!quackText) {
      return;
    }

    const newQuack = {
      id: Date.now(),
      user: getMockUser('johndoe'),
      text: quackText,
      createdAt: new Date().toISOString(),
      likeCount: 0,
    };

    setAllQuacks([newQuack, ...allQuacks]);
    setQuackText('');
  }

  function likeQuack(quackId) {
    const updatedQuacks = allQuacks.map(quack => {
      if (quack.id !== quackId) {
        return quack;
      }

      return {
        ...quack,
        likeCount: 1 + quack.likeCount,
      };
    });

    setAllQuacks(updatedQuacks);
  }

  function removeQuack(quackId) {
    setAllQuacks(allQuacks.filter(quack => quack.id !== quackId));
  }

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example One</Heading>
        <div>
          <textarea
            value={quackText}
            onChange={event => setQuackText(event.target.value)}
          />
        </div>
        <button type="button" disabled={!quackText} onClick={() => addQuack()}>
          Add Quack
        </button>
        <div>
          {allQuacks.map(quack => (
            <SimpleQuack
              key={quack.id}
              quack={quack}
              onLike={likeQuack}
              onRemove={removeQuack}
            />
          ))}
        </div>
      </MainSection>
    </div>
  );
}
