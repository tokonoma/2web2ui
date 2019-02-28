# Testing Component Events

```js
const MyComponent = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)
```

```js
it('calls onClick when button is clicked', () => {
  const onClick = jest.fn();

  shallow(<MyComponent label="Click Me" onClick={onClick} />)
    .simulate('click');

  expect(onClick).toHaveBeenCalled();
})
```

To test `MyComponent` calls `onClick` when `button` is clicked, stub the `onClick` prop using `jest.fn()`, [`simulate`](https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html) a click, and assert it has been called.
