import React from 'react';

import { Link } from '../atoms/';
import { Placeholder } from '../templates/Placeholder';

export function PageNotFound() {
  return (
    <Placeholder title="Error 404">
      <p>
        Page not found, please return to <Link to="/">Home</Link>.
      </p>
    </Placeholder>
  );
}
