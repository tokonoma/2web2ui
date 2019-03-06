# Testing Component By Inspection

```js
const MyComponent = ({ disabled = false, label }) => (
  <div>
    <button disabled={disabled}>{label}</button>
  </div>
);
```

```js
it('renders a disabled button', () => {
  const wrapper = shallow(<MyComponent disabled={true} />);
  const button = wrapper.find('button');

  expect(button).toHaveProp('disabled', true);
})
```

Do not snapshot every component test case.  Instead, to test `MyComponent` renders a disabled button when `disabled` prop is provided, [`find`](https://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html) the button and inspect its disabled prop value.
