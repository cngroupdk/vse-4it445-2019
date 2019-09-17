import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

export function HomePage() {
  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Hello, 4IT445!</Heading>
      </MainSection>
    </div>
  );
}
