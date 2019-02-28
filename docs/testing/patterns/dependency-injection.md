# Dependency Injection

```js
// myfile.js
export function one() {
  return 'a';
}

export function two({ localOne = one }) {
  return `${localOne()} - z`;
}
```

```js
// myfile.test.js
import { two } from '../myfile';

it('should return the right string', () => {
  const result = two({ localOne: jest.fn(() => 'x') });

  expect(result).toEqual('x - z');
})
```

#### Private Functions (or any functions in the same file as the one you're testing)

If a function isn't exported from a file (a "private" function) or if it's exported from the same file as your test function is, there's no good way to mock that function with Jest. In that case, you have three options:

1. Move the other function to its own file where it can be tested on its own and mocked in this file.
1. Let the public function test the other function by proxy. If the function is really private (not exported), this may be the only way to go.
1. Use dependency injection. See next section.

In extreme cases, you need to spy on or mock a function that is in the same file as the function you're testing. Jest doesn't make this easy, so using ES6 default parameters to provide a dependency injection interface is probably the least bad option.
