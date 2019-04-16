import { shallow } from 'enzyme';
import React from 'react';
import { CurrentHealthGauge } from '../CurrentHealthGauge';

describe('Signals Health Score Gauge Container', () => {
  const props = {
    loading: false,
    error: null,
    current_health_score: null
  };

  const subject = (options = {}) => shallow(
    <CurrentHealthGauge {...props} {...options} />
  );

  it('renders happy path correctly', () => {
    expect(subject({
      current_health_score: 88, WoW: -5, current_DoD: 5
    })).toMatchSnapshot();
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
    const wrapper = subject({
      WoW: -5, current_DoD: 5
    });
    expect(wrapper.find('Callout')).toMatchSnapshot();
  });

  it('renders no WoW, or Dod', () => {
    const wrapper = subject({ });
    expect(wrapper.find({ label: 'WoW Change' }).prop('value')).toEqual('n/a');
    expect(wrapper.find({ label: 'DoD Change' }).prop('value')).toEqual('n/a');
  });

  it('renders warning threshold color', () => {
    const wrapper = subject({ current_health_score: 60 });
    expect(wrapper.find({ className: 'DescriptionIcon' }).prop('style').fill).toMatchSnapshot();
  });

  it('renders bad threshold color', () => {
    const wrapper = subject({ current_health_score: 40 });
    expect(wrapper.find({ className: 'DescriptionIcon' }).prop('style').fill).toMatchSnapshot();
  });

  it('renders title with a custom date', () => {
    const wrapper = subject({ current_health_score: 40, filters: { relativeRange: 'custom', to: '2015-01-01' }});
    expect(wrapper.find({ className: 'Header' }).children().at(0)).toMatchSnapshot();
  });
});
