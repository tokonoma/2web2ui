# Testing Component Calling A Redux Action

```js
class MyComponent extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Table data={this.props.data} />
    );
  }
}
```

```js
it('calls load on mount', () => {
  const load = jest.fn();
  
  shallow(<MyComponent load={load} />);

  expect(load).toHaveBeenCalled();
})
```

To test `MyComponent` is loading data on mount, stub the `load` prop using `jest.fn()` and assert it has been called.
