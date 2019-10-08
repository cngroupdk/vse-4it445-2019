# 3rd Practical Class: TODO Help

How to help for [3rd Practical Class TODO](./03-styles-atomic-design-mocks-more-react.md#todo).

## 1. conditional color

> ```
> 0..4 -> black
> 5..9 -> orange
> 10... -> red
> ```

- We have to add CSS classes like this:

  ```css
  .blackBg {
    color: white;
    background-color: black;
  }
  ```

  - We can add them for example to `frontend/src/index.css`.
  - Or create new file and import it in some JavaScript file: `import './someCssFile.css';`.

- Add classes for all 3 colors.

- We have to import `classNames` function at the top of the `ExampleOnePage.js` file, so add this line:

  ```js
  import classNames from 'classnames';
  ```

- in `SimpleQuack` add `className` prop to "like" button:

  ```js
  <button
    className={classNames({
      blackBg: counter < 0,
      // Add more color CSS class names here and use different conditions
    })}
    type="button"
    onClick={...}
  >Likes: {counter}</button>
  ```

## 2. quack with remove button (click will remove the quack from state)

- add remove button to `SimpleQuack`:

  ```js
  <button
    onClick={() => {
      alert(`Remove quack with id: ${quack.id}`);
    }}
  >
    Remove
  </button>
  ```

- try clicking on the button
- we can pass `onRemove` callback to `SimpleQuack` using props:

  <!-- prettier-ignore -->
  ```js
  {allQuacks.map((quack, index) => (
    <SimpleQuack
      quack={quack}
      onRemove={quackId => alert(`Remove ${quackId}`)}
      key={index}
    />
  ))}
  ```

  and then use the `onRemove` prop in `SimpleQuack` component:

  <!-- prettier-ignore -->
  ```js
  function SimpleQuack({ quack, onRemove }) { // destructure `onRemove` from prop here
    // ...
    return (
      <div>
        ...
        <button
          onClick={() => {
            onRemove(quack.id); // use `onRemove` here
          }}
        >
          Remove
        </button>
      </div>
    );
  }
  ```

- To be able to remove items from `allQuacks` has be **”mutable array”**.
- So we have to move `allQuacks` to component **state**.

  To do this replace this:

  ```js
  export function ExampleOnePage() {
    const allQuacks = [
      ...
    ];
  ```

  with this:

  ```js
  export function ExampleOnePage() {
    const [allQuacks, setAllQuacks] = useState(getMockQuacks());
  ```

  We have to import `getMockQuacks` at the top of the file:

  ```js
  import { getMockQuacks } from '../utils/mocks';
  ```

- now we can mutate `allQuacks`:

  To do this replace `` onRemove={quackId => alert(`Remove ${quackId}`)} `` with:

  ```
  onRemove={quackId => setAllQuacks(allQuacks.filter(quack => quack.id !== quackId))}
  ```

### How does this work?

- This: `allQuacks.filter(someCallback)` will return new "result" array.
  This is important. `allQuacks` will not change, but `filter` will return new array.
- `filter` will go through each item in `allQuacks` array and for each item it will call `someCallback(item)`.

  - If `someCallback(item)` returns `true`, then `item` **will be** in the result array.
  - If `someCallback(item)` returns `false`, then `item` **will not be** in the result array.

  > To understand `filter` you can play with interactive examples here: [`[1, 2, 3, 4, 5].filter(item => item !== 1)`](https://ramdajs.com/repl/#?%5B1%2C%202%2C%203%2C%204%2C%205%5D.filter%28item%20%3D>%20item%20%21%3D%3D%201%29)
  >
  > and here: [`[{id: 1}, {id: 2}, {id: 3}, {id: 4}].filter(item => item.id !== 1)`](https://ramdajs.com/repl/#?%5B%0A%20%20%7B%20id%3A%201%20%7D%2C%0A%20%20%7B%20id%3A%202%20%7D%2C%0A%20%20%7B%20id%3A%203%20%7D%2C%0A%20%20%7B%20id%3A%204%20%7D%2C%0A%5D.filter%28item%20%3D%3E%20item.id%20%21%3D%3D%201%29)
  >
  > - try changing `!==` to `===`
  > - try removing two items using `||` and `&&` operators

- Expression `quack.id !== quackId` will make sure that all quack with `quack.id === quackId` will be removed from the result array.
  So this will remove the quack from `allQuacks`.

  `quackId` is provided by `SimpleQuack` for us.

- Calling `setAllQuacks()` will replace old version of `allQuacks` with new version with the quack removed and it will re-render whole page.

## 3. button that adds a new quack (static quack text)

Adding new quack is simple.

We have to call `setAllQuacks` with new array which will contain all previous quacks and the new quack.

Quack is a object, not much is needed here, we can provide just `id` and `text`:

```js
{ id: 123, text: 'New quack here' }
```

Quack should have unique `id`, this should be done in the database.

We don't have database now, so we can fake it. We can use `Date.now()`. This function returns the number of milliseconds elapsed since January 1, 1970. So it will create unique-enough `id` for us now:

```js
{ id: Date.now(), text: 'New quack here' }
```

For adding new element to array we can use [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals). This:

```js
[{ id: Date.now(), text: 'New quack here' }, ...allQuacks];
```

will create new array with added quack. We can use `setAllQuacks` to set this array as a new version of `allQuacks`.

Add a button to `ExampleOnePage` component:

```js
export function ExampleOnePage() {
  // ...
  return (
    <div>
      ...
      <MainSection>
        <Heading>Example One</Heading>
        <button
          type="button"
          onClick={() => {
            setAllQuacks([
              { id: Date.now(), text: 'New quack here' },
              ...allQuacks,
            ]);
          }}
        >
          Add Quack
        </button>
        ...
      </MainSection>
    </div>
  );
}
```

## 4. dynamic text for new quack (`<textarea />`)

We will add `<textarea />` to `ExampleOnePage`, but first we need to store textarea value in a state:

```js
export function ExampleOnePage() {
  const [quackText, setQuackText] = useState('');
  // ...
}
```

Now we can add the textarea:

```js
export function ExampleOnePage() {
  // ...
  return (
    <div>
      ...
      <MainSection>
        <Heading>Example One</Heading>
        <textarea
          value={quackText}
          onChange={event => setQuackText(event.target.value)}
        />
        ...
      </MainSection>
    </div>
  );
}
```

### How does this work?

- What we have created is called in React world [**controlled component**](https://reactjs.org/docs/forms.html#controlled-components). It means that we directly control what value is in the textarea (eg. `<textarea value={quackText} />`). Term **controlled component** is used also for other form elements like `input` and `select`.
- Try putting there `<textarea value="Hello!" />` and type into the textarea something. It will not work.
- So `quackText` controls what is in the textarea. To enable change in the textarea we have to listen to "change" event on the textarea using `onChange` prop.
- `<textarea onChange={event => console.log('value is:', event.target.value)} />` will write current value of textarea to console.
  - `onChange` requires callback and it will pass `event` to the callback.
  - `event.target` is HTML element that triggered the event. In this case the `<textarea />` element.
  - `value` is an attribute which contains current value of HTML form element. It works for `<input />`, `<select />`, `<textarea />`, and similar elements.
- We can combine `value` and `onChange` together and the when user types "12" it will do following steps:

  1. first `quackText` is initially empty string (`''`), so user will se empty textarea,
  2. user starts typing "1", this will trigger `onChange`, and `event.target.value` will be `"1"`,
  3. we will call `setQuackText` with current textarea `value`, so it will be result in `setQuackText("1")`,
  4. `setQuackText` was called, so new value of `quackText` is `"1"` and `ExampleOnePage` will be re-rendered,
  5. `<textarea value={quackText} />` is rendered with updated value,
  6. user will now see textarea with `1` in it.

     **This whole cycle goes very fast, it usually takes less then few milliseconds even on old devices and there are special optimizations to make this work. So user does not notice that the textarea is "controlled"**.

  7. user starts typing "2", this will trigger `onChange` and `event.target.value` will be **`"12"`**.

     It is `"12"` because `event.target.value` is whole current value of the textarea.

     Rest of the steps are basically the same.

- Final tasks are:
  - Use `quackText` in "Add Quack" button instead of `'New quack here'`.
  - Clear `quackText` when user clicks on the "Add Quack" button using: `setQuackText('')`.
