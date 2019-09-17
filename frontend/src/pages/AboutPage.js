import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function AboutPage() {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <Heading>About</Heading>

        <p>This page is empty for now...</p>
      </MainSection>
    </>
  );
}
