import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

import {
  AvatarPhoto,
  Link,
  TransparentButton,
  UserName,
  UserScreenName,
} from '../atoms/';
import { formatDate } from '../utils/date';

export function Quack({ quack, onLikePress }) {
  const {
    id,
    user: { name, screenName, profileImageUrl },
    text,
    likeCount,
    liked,
    createdAt,
  } = quack;

  const linkToUser = `/${screenName}`;
  const linkToQuack = `/${screenName}/status/${id}`;

  return (
    <article className="flex w-100 bb b--black-10 pb2 mt2">
      <div className="w3">
        <Link to={linkToUser}>
          <AvatarPhoto src={profileImageUrl} alt={name} />
        </Link>
      </div>
      <div className="pl3 flex-auto">
        <div className="pb2">
          <Link to={linkToUser} className="black-90">
            <UserName name={name} /> <UserScreenName screenName={screenName} />
          </Link>
          {' - '}
          <Link to={linkToQuack} className="black-60">
            <span className="f6 fw4 black-60">{formatDate(createdAt)}</span>
          </Link>
        </div>
        <div className="black-90 pre-line">{text}</div>
        <div className="pt2">
          <TransparentButton
            className="mr2"
            onClick={() => {
              if (!onLikePress) return;
              onLikePress(quack);
            }}
          >
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeartRegular}
              className="mr1"
            />{' '}
            {likeCount}
          </TransparentButton>
        </div>
      </div>
    </article>
  );
}
