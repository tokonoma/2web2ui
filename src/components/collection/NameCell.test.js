import React from 'react';
import { shallow } from 'enzyme';
import NameCell from './NameCell';
import TestApp from 'src/__testHelpers__/TestApp';

describe('NameCell', () => {
  const subject = props =>
    shallow(
      <TestApp>
        <NameCell id="example-item" to="/example/item" {...props} />
      </TestApp>,
    );

  it('renders with id as name', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders with a name', () => {
    expect(subject({ name: 'The Example Item' })).toMatchSnapshot();
  });
});
