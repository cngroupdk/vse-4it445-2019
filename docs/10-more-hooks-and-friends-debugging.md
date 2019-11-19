# 10th Practical Class: More Hooks and Friends, Debugging

**Checkout current git branch:**

```
cd code/cviceni/frontend/
git add .
git stash
git fetch --all
git checkout practical-10

yarn install
touch tmp/restart.txt
```

## React DevTools

- [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## More Hooks and Friends

- [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref)

  1. for HTML reference to element:

  ```js
  function SomeComponent() {
    const inputRef = useRef();

    return (
      <div>
        <input ref={inputRef} />
        <button
          type="button"
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          Focus
        </button>
      </div>
    );
  }
  ```

  2. for component "state" that will not trigger re-render:

  ```js
  function OtherComponent() {
    const [value, setValue] = useState('');
    const previousValue = useRef();

    useEffect(() => {
      console.log('--> value:', value, 'oldValue:', previousValue.current);
      previousValue.current = value;
    }, [value]);

    return (
      <div>
        <input value={value} onChange={e => setValue(e.target.value)} />
      </div>
    );
  }
  ```

- [`React.forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) - forward `ref` prop for custom components
- [`React.memo`](https://reactjs.org/docs/react-api.html#reactmemo) - cache component output if props are the same
- [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) = cache value
- [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) = cache callback
- [`useWhyDidYouUpdate`](https://usehooks.com/useWhyDidYouUpdate/)

  - [usehooks.com](https://usehooks.com/) is really cool!

  ```js
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
  ```
