import { mount } from 'enzyme';
import React from 'react';
import Gauge from '../Gauge';

describe('Signals Health Score Gauge SVG', () => {

  const subject = (props = {}) => mount(
    <Gauge {...props} />
  );

  it('renders correct color', () => {
    expect(subject({
      threshold: {
        color: '#color'
      }
    })).toMatchSnapshot();
  });

  it('renders score', () => {
    const wrapper = subject({ score: 50 });
    expect(wrapper.find({ className: 'Needle' }).prop('style').transform).toMatchSnapshot();
    expect(wrapper.find({ className: 'Score' }).prop('children')).toEqual('50.0');
  });
});
