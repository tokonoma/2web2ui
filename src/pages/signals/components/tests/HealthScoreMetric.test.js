import { shallow } from 'enzyme';
import React from 'react';
import HealthScoreMetric from '../HealthScoreMetric';

describe('Signals Health Score Metric Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      date: '2019-10-10',
      score: 80,
      injections: 100
    };
    wrapper = shallow(<HealthScoreMetric {...props}/>);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

});
