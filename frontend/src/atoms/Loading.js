import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

export function Loading() {
  return (
    <div className="center black-60">
      <div className="tc f4 pa4">
        <FontAwesomeIcon icon={faFeatherAlt} spin />
        <div className="dib ml3">Loading...</div>
      </div>
    </div>
  );
}
