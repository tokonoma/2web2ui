import { shallow } from 'enzyme';
import React from 'react';
import HSLegend from '../HSLegend';

describe('Signals Health Score legend Component', () => {
  it('renders correctly', () => {
    expect(shallow(<HSLegend />)).toMatchSnapshot();
  });
});
