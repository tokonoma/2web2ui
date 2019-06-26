## Functional Testing

### How To Run Functional Tests

`npm test` runs unit and functional tests.

`npm test -- __func__` runs only functional tests.

### When To Write Functional Tests

 - When you must verify that a key user flow is intact (e.g. billing or signup)
 - When you need to verify a piece of customer experience that relies upon complex or hard-to-fake state (e.g. TFA auth)

Functional tests are good at letting you verify a whole user flow with browser context provided by [jsdom](https://github.com/jsdom/jsdom), with realistic app state and only the SparkPost API mocked up.

They are also slow to execute so we must balance our func and unit test suites against total test execution time.

### How To Write Functional Tests

**Important**: Put each functional test in a separate file to avoid sharing DOM/React state between tests. Jest maintains a separate JSDOM instance for each file but not each test, and [there is no straightforward way to reset JSDOM between tests](https://github.com/facebook/jest/issues/1224).

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

1. We call `mountRoute` ([docs](#async-mountrouteroute--options-)) to render a whole route.

    `mountRoute` renders the whole `App` and returns an [Enzyme wrapper over the resulting DOM](https://airbnb.io/enzyme/docs/api/mount.html). The returned wrapper includes a few conveniences too. Check out the [API section below](#API) for more details.

1. We use `formFiller` ([docs](#formFiller)) to fill in the login form.

    `formFiller` is a utility that simplifies filling in forms. You can also just use the Enzyme wrapper directly.

1. Submit the form using `simulate` ([docs](#Wrapper#simulate)) and wait for the page to settle.

1. Check that auth has succeeded by asserting the current route using `currentRoute`.

Hint: Use `page.find()` to explore 

For more detail, check out the [API section](#API).

## The API

### async mountRoute(route, [ options ])

Mount the app at the specified route using Enzyme's full DOM rendering, aka `mount()`.

Arguments:
 - `route`: _string_
 - `options`: _object_
     - `authenticated`: _boolean_ - simulate an app with an already-logged in user (default: `true`)
     - `clearApiAfterAuth`: _boolean_ - remove mock API responses gathered during auth (default: `true`)

Returns: a _Wrapper_ instance

Example:
```js
  import mountRoute from 'src/__testHelpers__/mountRoute';
  const page = await mountRoute('/account/profile', { authenticated: true });
```

### Wrapper

A thin wrapper on Enzyme's ReactWrapper with a few extra convenience methods.

#### Wrapper#find(selector)

Alias of `ReactWrapper.find()` ([docs](https://airbnb.io/enzyme/docs/api/ReactWrapper/find.html))

Arguments:
 - `selector`: _string_ - Enzyme selectors ([docs](https://airbnb.io/enzyme/docs/api/selector.html))

Returns: an Enzyme _ReactWrapper instance ([docs](https://airbnb.io/enzyme/docs/api/mount.html#reactwrapper-api))

Example:
```js
const page = await mountRoute('/auth');
const loginButton = page.find(`Button`);
```

#### Wrapper#simulate(selector, eventName)

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

#### Wrapper#currentLocation()

Returns: _object_: the router `history.location` object ([docs](https://reacttraining.com/react-router/web/api/history))

#### Wrapper#wrapper

The underlying Enzyme ReactWrapper ([docs](https://airbnb.io/enzyme/docs/api/mount.html)) containing the app.

#### Wrapper#mockApiCalls

Array of historical API calls made through the Axios mock. Shortcut for `wrapper.axiosMock.mock.calls`.

#### Wrapper#axiosMock

The singleton instance of axios used for functional testing. See the section on [Mock API responses](#mock-api-responses) for details.

#### Wrapper#store

The app's Redux store.

### getFormFiller(wrapper)

A utility to make filling forms easy.

Arguments:
 - `wrapper` - Enzyme _ReactWrapper_ instance

Returns:
 - _function_: form filling helper tied to the given wrapper

Example:

```js
import getFormFiller from 'src/__testHelpers__/fill';
const page = await mountRoute('/some-route');
const formFiller = getFormFiller(page.wrapper);
```

### formFiller(fieldValues)

Fills a form with given field values.

Arguments:
 - `fieldValues` - _Array|Object_ - field value specification

Takes a single field object (or an array of field objects so that the fields will be filled in the precise order you intend.)

Field value:
 - type: _string_ - text|select|checkbox|radio|typeahead|downshift
 - name: _string_ - field name attribute
 - selector: _string_ - Enzyme selector identifying the field
 - value: _string|boolean|object_ - see below

Each field type causes `formFiller` to interpret `value` appropriately:

| Type | What `value` represents |
|------|-------|
| text | the string value for the field |
| select | the value of the option to select from the group |
| checkbox | boolean representing whether this box should be checked or not |
| radio | find the option with this value and select it (can alternatively use `index`, which finds the option at this index and selects it) |
| typeahead | usually an object that matches the object to be selected from the typeahead list |

One of `name` or `selector` must be included in each field value spec:

 - `{ type: 'text', name: 'this-name' }` -> enzyme will look for `<input name='this-name' />`
 - `{ type: 'text', selector: 'id="myId"' }` -> enzyme will look for `<input id="myId" />`

Example:

```js
const page = await mountRoute('/some-route');
const formFiller = getFormFiller(page.wrapper);
formFiller([
  { name: 'firstName', value: 'Firsty' },
  { name: 'lastName', value: 'Lasty' },
  { type: 'checkbox', name: 'isCool', value: true },
  { type: 'radio', name: 'favoriteFruit', value: 'bananas' }
]);
```

## Mock API Responses

Our tests _all_ run with a mocked `axios` package. The mock implementation is at `__mocks__/axios.js` where Jest automatically loads it.

### Response Lookup Mechanism

When the app calls axios with the mock in place, the mock looks for a matching response under `src/__testHelpers__/http-responses/default/`, using the API call path and request method. For example, a call to `GET /api/v1/account` would produce a response from `.../v1/account/get.js`.

```
.
|-- default
|   `-- v1
.       |-- account
.       .   `-- get.js
.       .   .
        .   .
            .
```

A response script under `.../http-responses/...` can calculate a response by exporting a function:

```js
export default (request) => ({
  result: {
    username: request.data.username
  }
});
```

...or just export a static response:

```js
export default {
  result: { username: 'boingo-spoingo' }
};
```

### Controlling Response Behaviour

The default API mock responses might do what you want for your test. The easiest way to produce a particular API response is to create a response file under `src/__testHelpers__/http-responses/default`.

If that is not possible, posibly because one already exists and you want different behaviour in different situations, you can overlay named custom responses for particular situations:

```js
import { use } from 'src/__testHelpers__/mockApi';

test('My tasty testy', () => {
  use('paid'); // Overlay the 'paid' API responses for this test
  // ...
});
```

The under `src/__testHelpers__/http-responses/`, create a new directory (named `paid` in this example) containing just the responses you want to add or change. At test runtime, the API mock will use your responses before falling back to the default ones.

You can even overlay multiple layers by calling `use()` more than once.

### Available API Mock Response Flavours

#### The `default` Set
The `default` mock API responses present an account on a free plan with 2 users and no subaccounts. 

#### The `paid` Overlay
Provides `/account` responses for a paid account.

#### The `subaccounts` Overlay
Adds 2 subaccounts and a webhook tied to a subaccount.
