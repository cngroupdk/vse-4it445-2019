# 2nd Practical Class: Basic React, Hooks, and Routing

### Topics:

- **Basic Routing**
  - add new page
  - link between pages
- **React Components**
  - use and create components
- **Basic Hooks**
  - add **interactivity** to components

## Basic Routing

- we will be using [React Router Web](https://reacttraining.com/react-router/)

- basic App structure in:
  - `frontend/public/index.html`
    - see:
      ```html
      <div id="root"></div>
      ```
    - this is the spot where React will "render" the output
  - `frontend/src/index.js`
    - see:
      ```js
      ReactDOM.render(<App />, document.getElementById('root'));
      ```
    - this is how React renders `App` component to `id="root"` element
  - `frontend/src/App.js`
    - see:
      ```js
      export function App() {
        return (
          <AllProviders>
            <Routes />
          </AllProviders>
        );
      }
      ```
    - `AllProviders` provides setup for API, authentification and Routing for whole App
      - but we don't have to care for now
    - `Routes` is compoment that setups app routes
  - `frontend/src/Routes.js`
    - see:
      ```js
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      ```
    - `Switch` == only one route will be visible
    - [`Route`](https://reacttraining.com/react-router/web/api/Route) == when `path` matches URL in browser it will display the `component`
    - use [`Link`](https://reacttraining.com/react-router/web/api/Link) (or [`NavLink`](https://reacttraining.com/react-router/web/api/NavLink)) in application to navigate between pages:
      ```js
      <Link to="/about">Go to About</Link>
      ```

## React Components

[🔥 Learn React in 10 tweets (with hooks)](https://twitter.com/chrisachard/status/1175022111758442497)

- create new page:

  - page is just a component
  - create new file `frontend/src/pages/ExampleOnePage.js` and insert:

    ```js
    import React from 'react';

    export function ExampleOnePage() {
      return <div>Example One Page!</div>;
    }
    ```

  - use common App laytout in `ExampleOnePage.js`:

    ```js
    import React from 'react';

    import { Heading, MainSection } from '../atoms/';
    import { TopNavigation } from '../organisms/TopNavigation';

    export function ExampleOnePage() {
      return (
        <div>
          <TopNavigation />
          <MainSection>
            <Heading>Example One</Heading>
          </MainSection>
        </div>
      );
    }
    ```

- add `SimpleQuack` component:

  ```js
  function SimpleQuack({ quack }) {
    const { user, text, createdAt } = quack;

    return (
      <div className="bb b--black-10 pb2 mt2">
        <h4 className="mv1">user: ?</h4>
        <h5 className="mv1">{createdAt}</h5>
        <div>{text}</div>
      </div>
    );
  }
  ```

  And use it like this:

  ```js
  <SimpleQuack quack={{ text: 'Hello, World!' }} />
  <SimpleQuack
    quack={{
      createdAt: '2019-08-03T09:09:34.023Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
    }}
  />
  ```

- use **conditiononal rendering**:
  - `&&`:
    ```
    {user && <h4 className="mv1">user: {user.screenName}</h4>}
    ```
  - `||`:
    ```js
    <div>{text || '(no text)'}</div>
    ```
  - ternary operator:
    ```js
    <h5 className="mv1">{createdAt ? formatDate(createdAt) : '(no date)'}</h5>
    ```
- list of quacks:

  ```js
  const allQuacks = [
    { text: 'Hello, World!' },
    {
      createdAt: '2019-08-03T09:09:34.023Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      user: {
        id: 1,
        name: 'Young Gatchell',
        screenName: 'yg123',
        profileImageUrl: 'http://mrmrs.github.io/photos/p/1.jpg',
      },
    },
  ];

  ...

  <div>
    {allQuacks.map((quack, index) => (
      <SimpleQuack quack={quack} key={index} />
    ))}
  </div>
  ```

## Basic Hooks

- [React Hooks Docs](https://reactjs.org/docs/hooks-intro.html)

- [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate)

  - counter button

  ```js
  import React, { useState } from 'react';

  ...

  function SimpleQuack({ quack }) {
    const [counter, setCounter] = useState(0);

    ...

      <button type="button" onClick={() => setCounter(counter + 1)}>
        Likes: {counter}
      </button>

    ...
  }
  ```

- [`useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect)

  - [React Lifecycle Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
  - mount + update:

    ```js
    useEffect(() => {
      console.log('mount / update!');
    });
    ```

    specific update:

    ```js
    useEffect(() => {
      console.log('counter updated!');
    }, [counter]);
    ```
