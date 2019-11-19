import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Heading, MainSection, TextInput } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

const INITIAL_ITEMS = 10;

function getIems(count) {
  return new Array(count)
    .fill(null)
    .map((_, index) => ({ id: index, text: `Item ${index}` }));
}

function ListItem({ item, onRemoveClick }) {
  return (
    <li className="pv2">
      {item.text}{' '}
      <Button
        color="red"
        onClick={() => {
          onRemoveClick(item);
        }}
      >
        X
      </Button>
    </li>
  );
}

export function ExampleTwoPage() {
  const [items, setItems] = useState(() => getIems(INITIAL_ITEMS));
  const [text, setText] = useState('');

  const removeItem = item => {
    setItems(oldItems => oldItems.filter(({ id }) => id !== item.id));
  };

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example Two</Heading>
        <div className="mv2">
          <input value={text} onChange={e => setText(e.target.value)} />
        </div>
        <Button>Focus</Button>
        <ul>
          {items.map(item => (
            <ListItem key={item.id} item={item} onRemoveClick={removeItem} />
          ))}
        </ul>
      </MainSection>
    </div>
  );
}
