import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function ExampleTwoPage() {
  // https://api.chucknorris.io/jokes/random

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example Two</Heading>
      </MainSection>
    </div>
  );
}
