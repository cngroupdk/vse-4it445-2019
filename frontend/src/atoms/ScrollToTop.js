import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTopBase({ children, location: { pathname } }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
}

export const ScrollToTop = withRouter(ScrollToTopBase);
