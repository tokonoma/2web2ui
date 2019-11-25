import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useEditorTabs from '../useEditorTabs';

describe('useEditorTabs', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditorTabs(value)} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns first tab by default', () => {
    const wrapper = useTestWrapper();

    expect(useHook(wrapper))
      .toEqual(expect.objectContaining({ currentTabIndex: 0, currentTabKey: 'html' }));
  });

  it('returns next tab when set', () => {
    const wrapper = useTestWrapper();

    act(() => {
      useHook(wrapper).setTab(1);
    });

    expect(useHook(wrapper))
      .toEqual(expect.objectContaining({ currentTabIndex: 1, currentTabKey: 'amp_html' }));
  });
});
