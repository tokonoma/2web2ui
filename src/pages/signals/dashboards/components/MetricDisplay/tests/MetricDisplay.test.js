import { shallow } from 'enzyme';
import React from 'react';
import MetricDisplay from '../MetricDisplay';

describe('Signals Metrics Display', () => {

  const subject = (props = {}) => shallow(
    <MetricDisplay {...props} />
  );

  it('renders label and value with no caret', () => {
    expect(subject({
      label: 'Metric Name',
      value: '10%'
    })).toMatchSnapshot();
  });

  it('renders caret direction up with color', () => {
    expect(subject({
      label: 'Metric Name',
      value: '10%',
      direction: 'up',
      color: '#mock'
    }).find({ className: 'Icon' })).toMatchSnapshot();
  });

  it('renders caret direction down with color', () => {
    expect(subject({
      label: 'Metric Name',
      value: '10%',
      direction: 'down',
      color: '#mock'
    }).find({ className: 'Icon' })).toMatchSnapshot();
  });
});
