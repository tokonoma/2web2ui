import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useEditorContent from '../useEditorContent';

describe('useEditorContent', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditorContent(value)} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns empty content by default', () => {
    const wrapper = useTestWrapper();
    const { content } = useHook(wrapper);

    expect(content).toEqual({});
  });

  it('hydrates when draft is provided', () => {
    const wrapper = useTestWrapper({
      draft: {
        content: { html: '<h1>Test</h1>', text: 'Test' },
        last_update_time: '2019-05-16T02:25:00+00:00'
      }
    });
    const { content } = useHook(wrapper);

    expect(content).toEqual({ html: '<h1>Test</h1>', text: 'Test' });
  });

  it('merges updated content', () => {
    const wrapper = useTestWrapper({
      draft: {
        content: { html: '<h1>Test</h1>', text: 'Test' },
        last_update_time: '2019-05-16T02:25:00+00:00'
      }
    });

    act(() => {
      useHook(wrapper).setContent({ html: '<h1>Updated!</h1>' });
    });

    const { content } = useHook(wrapper);

    expect(content).toEqual({ html: '<h1>Updated!</h1>', text: 'Test' });
  });
});
