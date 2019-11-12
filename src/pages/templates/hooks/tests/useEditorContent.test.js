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
        content: { html: '<h1>Test</h1>', text: 'Test' }
      }
    });
    const { content } = useHook(wrapper);

    expect(content).toEqual({ html: '<h1>Test</h1>', text: 'Test' });
  });

  describe('setContent', () => {
    let draft;
    let published;
    beforeEach(() => {
      draft = {
        content: {
          html: '<h1>Draft HTML</h1>',
          text: 'Draft Text'
        }
      };

      published = {
        content: {
          html: '<h1>Published HTML</h1>',
          text: 'Published Text'
        }
      };
    });

    it('merges draft content', () => {
      const wrapper = useTestWrapper({
        isPublishedMode: false,
        draft,
        published
      });

      act(() => {
        useHook(wrapper).setContent({ html: '<h1>Draft HTML Updated!</h1>' });
      });

      const { content } = useHook(wrapper);
      expect(content).toEqual({ html: '<h1>Draft HTML Updated!</h1>', text: 'Draft Text' });
    });

    it('does not allow merging published content', () => {
      const wrapper = useTestWrapper({
        isPublishedMode: true,
        draft,
        published
      });

      act(() => {
        useHook(wrapper).setContent({ html: '<h1>Published HTML Updated!</h1>' });
      });

      const { content } = useHook(wrapper);
      expect(content).toEqual({ html: '<h1>Published HTML</h1>', text: 'Published Text' });
    });
  });

});
