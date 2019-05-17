import React from 'react';
import { mount } from 'enzyme';
import useEditorPreview from '../useEditorPreview';

describe('useEditorPreview', () => {
  const useTestWrapper = (value = {}) => {
    const TestComponent = () => <div hooked={useEditorPreview(value)} />;
    return mount(<TestComponent />);
  };
  const useHook = (wrapper) => wrapper.update().children().prop('hooked');

  it('returns empty object by default', () => {
    const wrapper = useTestWrapper();
    expect(useHook(wrapper)).toEqual({ preview: {}});
  });

  it('returns received preview', () => {
    const preview = { html: '<h1>Test Example</h1>' };
    const wrapper = useTestWrapper({ preview });

    expect(useHook(wrapper)).toEqual({ preview });
  });

  it('calls getPreview when content changes', () => {
    const getPreview = jest.fn();
    const debounceAction = jest.fn((fn) => fn());
    const content = { html: '<h1>Test Example</h1>' };
    const draft = { id: 'test-template', subaccount_id: 123 };

    useTestWrapper({ content, debounceAction, draft, getPreview });

    expect(getPreview).toHaveBeenCalledWith({
      id: draft.id,
      content,
      mode: 'draft',
      subaccountId: draft.subaccount_id,
      substitution_data: {}
    });
  });

  it('ignores effect when content is empty', () => {
    const debounceAction = jest.fn();
    useTestWrapper({ content: {}, debounceAction });
    expect(debounceAction).not.toHaveBeenCalled();
  });

  it('cancels remaining debounced calls', () => {
    const debounceAction = { cancel: jest.fn() };
    const wrapper = useTestWrapper({ debounceAction });

    wrapper.unmount();

    expect(debounceAction.cancel).toHaveBeenCalled();
  });
});
