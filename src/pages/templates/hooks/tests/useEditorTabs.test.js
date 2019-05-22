import React from 'react';
import { shallow } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import useEditorTabs from '../useEditorTabs';

jest.mock('src/hooks/useRouter');

describe('useEditorTabs', () => {
  const subject = () => {
    const TestComponent = () => <div {...useEditorTabs()} />;
    return shallow(<TestComponent />).props();
  };

  it('returns first tab state when no match found', () => {
    useRouter.mockReturnValue({ requestParams: { tabKey: undefined }});

    expect(subject())
      .toEqual(expect.objectContaining({ currentTabIndex: 0, currentTabKey: 'html' }));
  });

  it('returns tab state when found', () => {
    useRouter.mockReturnValue({ requestParams: { tabKey: 'AMP-HTML' }});

    expect(subject())
      .toEqual(expect.objectContaining({ currentTabIndex: 1, currentTabKey: 'amp_html' }));
  });

  it('updates route when tab is set', () => {
    const historyPush = jest.fn();

    useRouter.mockReturnValue({
      history: { push: historyPush },
      requestParams: { tabKey: 'html' }
    });

    subject().setTab(1);

    expect(historyPush).toHaveBeenCalledWith('/templates/edit/amp/next/amp-html');
  });
});
