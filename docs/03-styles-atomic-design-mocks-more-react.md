# 3rd Practical Class: Styles, Atomic Design, Mock Data, More React

### Topics:

- **Styles**
  - adding and using CSS
- **Atomic Design**
  - pinciples
  - folder structure
- **Mock Data**
  - usage
- **More React**
  - working with arrays

---

**Checkout current git branch:**

```
cd code/cviceni/frontend/
git add .
git stash
git fetch --all
git checkout practical-03

yarn install
touch tmp/restart.txt
```

---

## Styles

### Global CSS

- `src/frontend/src/index.js`:
  - global [Tachyons](https://tachyons.io/) CSS library:
    ```js
    import 'tachyons';
    ```
    It is using [Tachyons NPM package](https://www.npmjs.com/package/tachyons).
    See `src/frontend/package.json`:
    ```json
    {
      ...
      "dependencies": {
        ...
        "tachyons": "4.11.1",
        ...
      }
      ...
    }
    ```
  - global custom styles
    ```js
    import './index.css';
    ```
- using global CSS class/id:
  `file.css`:

  ```css
  .someClass {
    font-weight: bold;
    padding: 10px;
  }

  #someId {
    background-color: hotpink;
  }
  ```

  `file.js`:

  ```js
  <div className="someClass" id="someId">
    Hello!
  </div>
  ```

### Inline Styles

- use [`style`](https://reactjs.org/docs/dom-elements.html#style) prop:

  ```js
  function Banner({ bg = 'hotpink' }) {
    return (
      <div className="banner" style={{ backgroundColor: bg }}>
        Banner!
      </div>
    );
  }

  // ...

  <Banner />;
  <Banner bg="red" />;
  <Banner bg="#aa00bb" />;
  <Banner bg={user.primaryColor} />;
  ```

### [`classNames`](https://www.npmjs.com/package/classnames) Package

- for dynamic `className`:

  ```js
  <div
    className={classNames('foo', 'bar', { 'foo-bar': true, 'bar-foo': false })}
  >
    Hello!
  </div>
  ```

- example:
  `ColorButton.css`:

  ```css
  .button {
    color: white;
  }

  .primaryVariant {
    background-color: blue;
  }

  .dangerVariant {
    background-color: red;
  }
  ```

  `ColorButton.js`:

  ```js
  import React from 'react';
  import classNames from 'classnames';

  import './ColorButton.css';

  function ColorButton({ variant = 'primary', ...rest }) {
    return (
      <button
        className={classNames('button', {
          primaryVariant: variant === 'primary',
          dangerVariant: variant === 'danger',
        })}
        {...rest}
      />
    );
  }

  // ...

  <ColorButton />;
  <ColorButton variant="danger" />;
  ```

### [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet)

- CSS Modules = "**nice** CSS classes without global **conflicts**"

## Atomic Design

### [Atomic Design Book](http://atomicdesign.bradfrost.com/) (free online)

![](http://atomicdesign.bradfrost.com/images/content/atomic-design-abstract-concrete.png)

![](http://atomicdesign.bradfrost.com/images/content/instagram-atomic.png)

### Folder Structure

```
forntend/src
├── atoms
│   ├── AvatarPhoto.js
│   ├── Button.js
│   ├── ErrorBanner.js
│   ├── ErrorMessage.js
│   ├── Heading.js
│   ├── Label.js
│   ├── Link.js
│   ├── Loading.js
│   ├── MainSection.js
│   ├── ScrollToTop.js
│   ├── TextArea.js
│   ├── TextInput.js
│   ├── TransparentButton.js
│   ├── UserName.js
│   ├── UserScreenName.js
│   └── index.js
├── molecules
│   ├── Field.js
│   ├── Quack.js
│   ├── QuackForm.js
│   └── index.js
├── organisms
│   ├── QuackList.js
│   └── TopNavigation.js
├── templates
│   ├── HomeTemplate.js
│   ├── Placeholder.js
│   ├── SignInTemplate.js
│   └── UserDetailTemplate.js
└── pages
    ├── AboutPage.js
    ├── HomePage.js
    ├── PageNotFound.js
    ├── SignInPage.js
    └── UserDetailPage.js

```

**See `frontend/src/atoms/index.js`**, you can use:

```js
import { Button, Label, Link } from '../atoms';
```

## Mock Data

```js
import { getMockQuacks, getMockUser } from '../utils/mocks.js';

console.log('all mocks', getMockQuacks());
console.log('mock user', getMockUser('johndoe'));
```

## More React

### Immutable Array Operations

- add item:

  ```js
  const oldArray = [1, 2, 3, 4];

  console.log('example 1.1', [0, ...oldArray]);
  console.log('example 1.2', [...oldArray, 5]);
  console.log('example 1.3', [0, ...oldArray, 5]);
  console.log('example 1.4', [0, ...oldArray, 5, 0, ...oldArray, 5]);
  ```

- remove item:

  ```js
  const oldArray = [1, 2, 3, 4];

  console.log('example 2.1', oldArray.filter(item => item !== 1));
  console.log('example 2.2', oldArray.filter(item => item !== 2));
  console.log('example 2.3', oldArray.filter(item => item === 3));

  const oldObjectArray = [
    { id: 1, ok: false },
    { id: 2, ok: true },
    { id: 3, ok: false },
    { id: 4, ok: true },
  ];

  console.log('example 3.1', oldArray.filter(item => item.id !== 1));
  console.log('example 3.2', oldArray.filter(item => item.id !== 2));
  console.log('example 3.3', oldArray.filter(item => item.ok === false));
  console.log('example 3.3', oldArray.filter(item => item.ok === true));
  ```

## TODO

1. display styled quacks with like button changing color:

   ```
   0..4 -> black
   5..9 -> orange
   10... -> red
   ```

1. quack with remove button (click will remove the quack from state)
1. button that adds a new quack (static quack text)
1. dynamic text for new quack (`<textarea />`)
