## QuickStart

### How To Run Functional Tests

`npm test` runs unit and functional tests.

`npm test -- __func__` runs only functional tests.

### When To Write Functional Tests

 - When you must verify that a key user flow is intact (e.g. billing or signup)
 - When you need to verify a piece of customer experience that relies upon complex or hard-to-fake state (e.g. TFA auth)

Functional tests are good at letting you verify a whole user flow with browser context provided by [jsdom](https://github.com/jsdom/jsdom), with realistic app state and only the SparkPost API mocked up.

They are also slow to execute so we must balance our func and unit test suites against total test execution time.

### How To Write Functional Tests

Here's a worked example:

```js
import mountRoute from 'src/__testHelpers__/mountRoute';
import getFormFiller from 'src/__testHelpers__/fill';

test('Login page', async () => {
  const page = await mountRoute('/auth', { authenticated: false });

  const formFiller = getFormFiller(page.wrapper);
  formFiller([
    { name: 'username', value: 'test-username' },
    { name: 'password', value: 'test-password' }
  ]);

  await page.simulate('form', 'submit');

  expect(page.currentRoute()).toEqual('/dashboard');
});
```

1. We call `mountRoute` ([docs](#mountRoute)) to render a whole route.

    `mountRoute` renders the whole `App` and returns an [Enzyme wrapper over the resulting DOM](https://airbnb.io/enzyme/docs/api/mount.html). The returned wrapper includes a few conveniences too. Check out the [API section below](#API) for more details.

1. We use `formFiller` ([docs](#formFiller)) to fill in the login form.

    `formFiller` is a utility that simplifies filling in forms. You can also just use the Enzyme wrapper directly.

1. Submit the form using `simulate` ([docs](#Wrapper#simulate)) and wait for the page to settle.

1. Check that auth has succeeded by asserting the current route using `currentRoute`.

Hint: Use `page.find()` to explore 

For more detail, check out the [API section](#API).

## The API

#### mountRoute(route, [ options ])

Mount the app at the specified route using Enzyme's full DOM rendering, aka `mount()`.

Arguments:
 - `route`: _string_
 - `options`: _object_
     - `authenticated`: _boolean_ - simulate an app with an already-logged in user

Returns: a _Wrapper_ instance

Example:
```js
  const page = await mountRoute('/account/profile', { authenticated: true });
```

#### Wrapper

A thin wrapper on Enzyme's ReactWrapper with a few extra convenience methods.

#### Wrapper#find()

Alias of `ReactWrapper.find()` ([docs](https://airbnb.io/enzyme/docs/api/ReactWrapper/find.html))

Arguments:
 - `selector`: _string_ - Enzyme selectors ([docs](https://airbnb.io/enzyme/docs/api/selector.html))

Returns: an Enzyme _ReactWrapper instance ([docs](https://airbnb.io/enzyme/docs/api/mount.html#reactwrapper-api))

Example:
```js
const page = await mountRoute('/auth');
const loginButton = page.find(`Button`);
```

#### Wrapper#simulate()

Alias of `ReactWrapper.simulate()` ([docs](https://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html))

Arguments:
 - `selector`: _string_ - Enzyme selector ([docs](https://airbnb.io/enzyme/docs/api/selector.html))
 - `eventName`: _string_ - `click`, `submit`, ...

Example:
```js
const page = await mountRoute('/auth');
page.simulate('form', 'submit');
```

#### async Wrapper#forceUpdate()

Waits 1 tick and updates the app wrapper using `ReactWrapper.update()`.

Example:
```js
const page = await mountRoute('/auth');
// ...
await page.forceUpdate();
```

#### Wrapper#currentRoute()

Returns: _string_: the path of the App's current route

Example:
```js
expect(page.currentRoute()).toEqual('/auth');
```

### Wrapper#wrapper

The underlying Enzyme ReactWrapper ([docs](https://airbnb.io/enzyme/docs/api/mount.html)) containing the app.

### Wrapper#axiosMock

The singleton instance of axios used for functional testing. Has mock responses in place. See [integration testing docs](src/__integration__/README.md) for details.
