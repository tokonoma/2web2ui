# Testing When Component State Changes

```js
class MyComponent extends Component {
  state = {
    isOpen: false
  }

  handleClick = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <button onClick={this.handleClick} />
        <Modal isOpen={isOpen} />
      </div>
    );
  }
}
```

```js
it('opens modal when button is clicked', () => {
  const wrapper = shallow(<MyComponent />);
  wrapper.find('button').simulate('click');
  expect(wrapper.find('Modal')).toHaveProp('isOpen', true);
})
```

Do not inspect the state of `MyComponent`.  Instead, to test `MyComponent` opens `Modal` when `button` is clicked, [`simulate`](https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html) a click of `button` and assert `isOpen` prop is `true`.
