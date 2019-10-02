import React from 'react';
import { shallow } from 'enzyme';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  const subject = (props = {}) => shallow(
    <Tooltip
      children={<button>Learn More</button>}
      content={<div>More</div>}
      {...props}
    />
  );

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('opens content when hovered', () => {
    const wrapper = subject();
    const triggerWrapper = shallow(wrapper.prop('trigger'));

    triggerWrapper.simulate('mouseenter');

    expect(wrapper).toHaveProp('open', true);
  });

  it('closes content when mouse leaves trigger', () => {
    const wrapper = subject({ initialOpen: true });
    const triggerWrapper = shallow(wrapper.prop('trigger'));

    triggerWrapper.simulate('mouseleave');

    expect(wrapper).toHaveProp('open', false);
  });
});
