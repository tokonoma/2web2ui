
import useDateHover from '../useDateHover';
import { mount } from 'enzyme/build';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('useDateHover', () => {

  const HoodedComponent = ({ initial, node }) => {
    const [hoveredDate, handleDateHover, resetDateHover] = useDateHover(initial);
    return (
      <div name={hoveredDate} onClick={() => handleDateHover(node)} onMouseOut={() => resetDateHover()}/>
    );
  };

  const subject = ({ initial, node }) => mount(
    <HoodedComponent initial={initial} node={node} />
  );

  it('sets hovered state when there is valid data', () => {
    const node = { payload: { date: '2019-11-11' }};
    const wrapper = subject({ node });
    expect(wrapper.children()).toHaveProp('name', '');
    act(() => {
      wrapper.children().props().onClick();
    });
    wrapper.update();
    expect(wrapper.children()).toHaveProp('name', '2019-11-11');
  });

  it('resets hovered date when mouse out', () => {
    const wrapper = subject({ initial: 'todays date', node: {}});
    expect(wrapper.children()).toHaveProp('name', 'todays date');
    act(() => {
      wrapper.children().props().onMouseOut();
    });
    wrapper.update();
    expect(wrapper.children()).toHaveProp('name', '');
  });

});
