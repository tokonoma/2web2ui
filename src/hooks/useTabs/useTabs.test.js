import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useTabs from '../useTabs';

describe('useTabs', () => {
  const HoodedComponent = (props) => {
    const [tabIndex, tabs] = useTabs(props.tabs, props.initialIndex);

    return (
      <div tabIndex={tabIndex} tabs={tabs} />
    );
  };

  const subject = (initialIndex) => mount(
    <HoodedComponent tabs={[{ content: 'A' }, { content: 'B' }]} initialIndex={initialIndex} />
  );

  it('sets initial index to zero', () => {
    const wrapper = subject();
    expect(wrapper.children()).toHaveProp('tabIndex', 0);
  });

  it('sets initial index to initial index prop', () => {
    const wrapper = subject(1);
    expect(wrapper.children()).toHaveProp('tabIndex', 1);
  });

  it('changes index when clicked', () => {
    const wrapper = subject();

    act(() => {
      wrapper.children().prop('tabs')[1].onClick();
    });

    wrapper.update();

    expect(wrapper.children()).toHaveProp('tabIndex', 1);
  });
});
