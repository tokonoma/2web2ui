import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import useEditorNavigation from '../useEditorNavigation';

jest.mock('src/hooks/useRouter');

describe('useEditorNavigation', () => {
  const useTestWrapper = ({ routerState } = {}) => {
    useRouter.mockReturnValue({
      requestParams: { id: 'test-template' },
      ...routerState
    });

    const TestComponent = () => <div hooked={useEditorNavigation()} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns first link by default', () => {
    const wrapper = useTestWrapper();

    expect(useHook(wrapper))
      .toEqual(expect.objectContaining({ currentNavigationIndex: 0, currentNavigationKey: 'content' }));
  });

  it('returns matched link', () => {
    const wrapper = useTestWrapper({
      routerState: {
        requestParams: {
          id: 'test-template',
          navKey: 'settings'
        }
      }
    });

    expect(useHook(wrapper))
      .toEqual(expect.objectContaining({ currentNavigationIndex: 1, currentNavigationKey: 'settings' }));
  });

  it('redirects when link is clicked', () => {
    const historyPush = jest.fn();
    const wrapper = useTestWrapper({ routerState: { history: { push: historyPush }}});

    act(() => {
      useHook(wrapper).setNavigation('settings');
    });

    expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/test-template/settings');
  });

  it('redirects with subaccount id', () => {
    const historyPush = jest.fn();
    const wrapper = useTestWrapper({ routerState: { history: { push: historyPush }, requestParams: { id: 'test-template', subaccount: 102 }}});

    act(() => {
      useHook(wrapper).setNavigation('settings');
    });

    expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/test-template/settings?subaccount=102');
  });
});
