import React from 'react';
import { shallow } from 'enzyme';
import EditSettings from '../EditSettings';


describe('EditSettings', () => {
  it('renders form', () => {
    expect(shallow(<EditSettings />)).toMatchSnapshot();
  });
});
