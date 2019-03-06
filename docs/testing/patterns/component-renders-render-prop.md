# Testing Component Using Render Prop Component

```js
const MyComponent = ({ label }) => (
  <MyRenderPropComponent>
    {(onClick) => (
      <div>
        <button onClick={onClick}>{label}</button>
      </div>
    )}
  </MyRenderPropComponent>
);
```

```js
it('calls onClick when button is clicked', () => {
  const onClick = jest.fn();
  const RenderProp = shallow(<MyComponent />).prop('children');
  const renderPropWrapper = shallow(<RenderProp onClick={onClick} />);

  renderPropWrapper.find('button').simulate('click');

  expect(onClick).toHaveBeenCalled();
})
```

[Render Props](https://reactjs.org/docs/render-props.html) is a common React pattern, used by several popular libraries (e.g. [Downshift](https://github.com/downshift-js/downshift)), but requires a little more test setup your average Component.  To test `MyComponent` calls `MyRenderPropComponent`'s `onClick` when `button` is clicked, `shallow` render `MyComponent` to get its `children` prop (our render function) and then test it like every other component.
