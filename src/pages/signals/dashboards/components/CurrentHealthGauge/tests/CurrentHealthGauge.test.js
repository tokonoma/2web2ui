import { shallow } from 'enzyme';
import React from 'react';
import { CurrentHealthGauge } from '../CurrentHealthGauge';

describe('Signals Health Score Gauge Container', () => {
  const props = {
    loading: false,
    error: null,
    data: []
  };

  const subject = (options = {}) => shallow(
    <CurrentHealthGauge {...props} {...options} />
  );

  it('renders happy path correctly', () => {
    expect(subject({ data: [{
      sid: -1, current_health_score: 88, WoW: -5, DoD: 5
    }]})).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('PanelLoading')).toExist();
  });

  it('renders error correctly', () => {
    const wrapper = subject({ error: { message: 'mock error' }});
    expect(wrapper.find('Callout')).toMatchSnapshot();
  });

  it('renders no current score correctly', () => {
    const wrapper = subject({ data: [{
      sid: -1, WoW: -5, DoD: 5
    }]});
    expect(wrapper.find('Callout')).toMatchSnapshot();
  });

  it('renders no WoW', () => {
    const wrapper = subject({ data: [{ sid: -1 }]});
    expect(wrapper.find({ label: 'WoW Change' }).prop('value')).toEqual('n/a');
  });
});
