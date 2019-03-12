# Testing Component Looks Good

```js
const MyComponent = ({ data, title }) => (
  <Banner status="info" title={title}>
    <ul>
      {data.map((value) => <li key={value}>Item {value}</li>)}
    </ul>
  </Banner>
);
```

```js
it('renders a banner list', () => {
  const data = [1, 2, 3];
  const wrapper = shallow(<MyComponent title="Test title" data={data} />);

  expect(wrapper).toMatchSnapshot();
});
```

To test `MyComponent` renders correctly, [`shallow`](https://airbnb.io/enzyme/docs/api/shallow.html) render `MyComponent` and take a snapshot.  Read more about [snapshot testing](https://jestjs.io/docs/en/snapshot-testing).
