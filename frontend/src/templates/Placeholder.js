import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function Placeholder({ title, children }) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>{title}</Heading>

        {typeof children === 'undefined' ? (
          <p>This page is empty for now...</p>
        ) : (
          children
        )}
      </MainSection>
    </>
  );
}
