# Testing Reducers

```js
// src/reducers/example.js
const initialState = {
  examples: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EXAMPLES_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'GET_EXAMPLES_PENDING':
      return { ...initialState, loading: true };
    case 'GET_EXAMPLES_SUCCESS':
      return { ...state, loading: false, examples: action.payload };
    default:
      return state;
  }
};
```

```js
// src/reducers/tests/example.test.js
import exampleReducer from '../example';

describe('Example Reducer', () => {
  it('returns initial state', () => {
    const state = exampleReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ examples: [] });
  });

  it('returns pending state', () => {
    const state = exampleReducer(undefined, { type: 'GET_EXAMPLES_PENDING' });
    expect(state).toEqual({ examples: [], loading: true });
  });  

  // ...
});
```

Reducers can be easily unit tested and don't forget to test the '@@INIT' case.
