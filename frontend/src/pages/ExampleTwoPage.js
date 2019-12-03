import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button, Heading, MainSection, TextInput } from '../atoms/';
import { TopNavigation } from '../organisms/TopNavigation';

const INITIAL_ITEMS = 1000;

function getIems(count) {
  return new Array(count)
    .fill(null)
    .map((_, index) => ({ id: index, text: `Item ${index}` }));
}

const ListItem = React.memo(function ListItem(props) {
  const { item, onRemoveClick } = props;
  useWhyDidYouUpdate('ListItem', props);
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
});

export function ExampleTwoPage() {
  const [items, setItems] = useState(() => getIems(INITIAL_ITEMS));
  const [text, setText] = useState('');
  const inputRef = useRef();
  const previousTextRef = useRef();

  console.log('---> 1');
  const uppercaseText = useMemo(() => {
    console.log('---> 2');
    return text.toUpperCase();
  }, [text]);

  useEffect(() => {
    // console.log('text:', text, 'previousText:', previousTextRef.current);
    previousTextRef.current = text;
  }, [text]);

  // const removeItemMemoVersion = useMemo(() => {
  //   return item => {
  //     setItems(oldItems => oldItems.filter(({ id }) => id !== item.id));
  //   };
  // }, []);

  const removeItem = useCallback(item => {
    setItems(oldItems => oldItems.filter(({ id }) => id !== item.id));
  }, []);

  return (
    <div>
      <TopNavigation />
      <MainSection>
        <Heading>Example Two</Heading>
        <div className="mv2">
          <TextInput
            ref={inputRef}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        {uppercaseText}
        <Button
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
        >
          Focus
        </Button>
        <ul>
          {items.map(item => (
            <ListItem key={item.id} item={item} onRemoveClick={removeItem} />
          ))}
        </ul>
      </MainSection>
    </div>
  );
}

function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
