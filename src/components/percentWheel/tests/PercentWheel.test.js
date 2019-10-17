import React from 'react';
import { shallow } from 'enzyme';

import PercentWheel from '../PercentWheel';

describe('PercentWheel', () => {
  const subject = (props = {}) => shallow(
    <PercentWheel
      {...props}
    />
  );

  it('should render with data', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render with the correct label and value', () => {
    const wrapper = subject({ label: 'my label', value: .034 });
    expect(wrapper.find('div[name="percentWheel_label"]').text()).toEqual('my label');
    expect(wrapper.find('div[name="percentWheel_value"]').text()).toEqual('3.4%');
  });
});
