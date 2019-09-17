import React from 'react';

import { Heading, MainSection } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

function Quack({ text, user = 'unknown' }) {
  return (
    <div>Quack: {text} (@{user})</div>
  )
}

export function HomePage() {
  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Hello, World!</Heading>

        <Quack text="123" user="johndoe" />
        <Quack text="Hello, 4IT445!"/>
        <Quack text="9999999"/>

        <h2>123 hello!</h2>
        <div>this is JSX</div>
        <p>this is XML in JS</p>
        <input type="text" />
      </MainSection>
    </div>
  );
}
