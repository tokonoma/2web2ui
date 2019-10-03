import { shallow } from 'enzyme';
import React from 'react';
import HealthScoreLegend from '../HealthScoreLegend';

describe('Signals Health Score legend Component', () => {
  it('renders correctly', () => {
    expect(shallow(<HealthScoreLegend />)).toMatchSnapshot();
  });
});
