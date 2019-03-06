import * as hoc from '../hoc';

describe('getDisplayName', () => {
  it('should return displayName without a wrapper name', () => {
    const component = { displayName: 'MockClassComponent' };
    expect(hoc.getDisplayName(component)).toEqual('container(MockClassComponent)');
  });

  it('should return function name with a wrapper name', () => {
    const MockFunctionComponent = () => null;
    expect(hoc.getDisplayName(MockFunctionComponent, 'withTest')).toEqual('withTest(MockFunctionComponent)');
  });

  it('should return default component name with a wrapper name', () => {
    const MockFunctionComponent = {};
    expect(hoc.getDisplayName(MockFunctionComponent, 'withTest')).toEqual('withTest(Component)');
  });
});
