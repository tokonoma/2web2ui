import { shallow } from 'enzyme';
import React from 'react';
import Divider from '../Divider';

describe('Signals Divider Component', () => {
  it('renders correctly', () => {
    expect(shallow(<Divider />)).toMatchSnapshot();
  });
});
