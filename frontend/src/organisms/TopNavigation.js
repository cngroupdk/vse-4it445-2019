import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { AvatarPhoto, Link } from '../atoms/';
import { useAuth } from '../utils/auth';

const navLinkTextStyle = 'f6 dib white';
const navLinkStyle = classNames(navLinkTextStyle, 'dim');
const navButtonStyle = classNames(
  navLinkTextStyle,
  'bg-transparent bg-animate hover-bg-white hover-black pv2 ph3 mh3 br-pill ba b--white-20',
);

function TopNavigationBase({ history }) {
  const { user, signout } = useAuth();

  return (
    <nav className="flex justify-between bb b--white-10 bg-dark-green white">
      <Link to="/" noUnderline className="b white flex items-center pv2 ph3">
        <FontAwesomeIcon icon={faFeatherAlt} className="mr2 f4" />
        Quacker
      </Link>
      <div className="flex-grow flex items-center">
        <Link to="/" className={classNames(navLinkStyle, 'pa3')}>
          Home
        </Link>
        <Link to="/example1" className={classNames(navLinkStyle, 'pa3')}>
          Example One
        </Link>
        <Link to="/about" className={classNames(navLinkStyle, 'pa3')}>
          About
        </Link>
        {user ? (
          <>
            <Link to="/settings" className={classNames(navLinkStyle, 'pa3')}>
              Settings
            </Link>
            <Link
              to={`/${user.screenName}`}
              noUnderline
              className={classNames(
                navLinkStyle,
                'ph3 pv1 h-100 flex items-center',
              )}
            >
              <AvatarPhoto
                className="v-mid dib mr2"
                src={user.profileImageUrl}
                alt={user.screenName}
                size={2}
              />{' '}
              {user.name}
            </Link>
            <button
              className={navButtonStyle}
              onClick={() => {
                signout();
                history.push('/');
                window.location.reload();
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signin" className={classNames(navLinkStyle, 'pa3')}>
              Sign In
            </Link>
            <Link to="/auth/signup" noUnderline className={navButtonStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export const TopNavigation = withRouter(TopNavigationBase);
