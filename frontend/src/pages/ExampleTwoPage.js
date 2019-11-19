import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function ExampleTwoPage() {

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example Two</Heading>
      </MainSection>
    </div>
  );
}
