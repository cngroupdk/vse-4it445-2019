import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

function Quack({ text, user = 'unknown' }) {
  return (
    <div>
      Quack: {text} (user: {user})
    </div>
  )
}

export function HomePage() {
  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Hello, World!</Heading>

        <Quack text="Hello!" user="johndoe" />
        <Quack text="Ahojda!"/>
        <Quack text="999999999" />

        <h3>Hello, abc!</h3>
        <div>This is some div</div>
        <p>This is paragraph</p>
        <input type="text" />
      </MainSection>
    </div>
  );
}
