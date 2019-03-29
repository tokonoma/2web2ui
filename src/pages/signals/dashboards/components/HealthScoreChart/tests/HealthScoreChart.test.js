import { shallow } from 'enzyme';
import React from 'react';
import { HealthScoreChart } from '../HealthScoreChart';
Date.now = jest.fn(() => 1553699129000);

describe('Signals Health Score Chart', () => {
  let props;
  let subject;

  beforeEach(() => {
    props = {
      loading: false,
      error: null,
      injections: {
        data: [{
          dt: '2019-03-24',
          injections: 75000000000,
          spam_hits: 1
        },{
          dt: '2019-03-25',
          injections: 75000000000,
          spam_hits: 1
        },{
          dt: '2019-03-26',
          injections: 75000000000,
          spam_hits: 1
        }]
      },
      data: [{
        sid: -1,
        current_health_score: 88,
        WoW: -5, current_DoD: 5,
        history: [{
          date: '2019-03-24',
          health_score: 75,
          ranking: 'warning'
        },{
          date: '2019-03-25',
          health_score: 96,
          ranking: 'good'
        },{
          date: '2019-03-26',
          health_score: 23,
          ranking: 'danger'
        },{
          date: '2019-03-27',
          health_score: null,
          ranking: null
        }]
      }],
      filters: {
        relativeRange: '90days'
      }
    };

    subject = (options = {}) => shallow(
      <HealthScoreChart {...props} {...options} />
    );
  });

  it('renders happy path correctly', () => {
    expect(subject(props)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('PanelLoading')).toExist();
  });

  it('renders error correctly', () => {
    const wrapper = subject({ error: { message: 'mock error' }});
    expect(wrapper.find('Callout')).toMatchSnapshot();
  });

  it('renders no account level data callout correctly', () => {
    props.data = [];
    const wrapper = subject(props);
    expect(wrapper.find('Callout')).toMatchSnapshot();
  });

  it('renders metric displays', () => {
    const wrapper = subject({ defaultHovered: '2019-03-26' });
    expect(wrapper.find('MetricDisplay').at(0)).toMatchSnapshot();
    expect(wrapper.find('MetricDisplay').at(1)).toMatchSnapshot();
  });
});
