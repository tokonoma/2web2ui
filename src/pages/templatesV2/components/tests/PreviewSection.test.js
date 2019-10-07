import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewSection from '../PreviewSection';

jest.mock('../../hooks/useEditorContext');

describe('PreviewSection', () => {
  const subject = ({ editorState = {}} = {}) => {
    useEditorContext.mockReturnValue({
      currentTabKey: 'html',
      preview: { html: '<h1>Test Example</h1>' },
      ...editorState
    });

    return shallow(<PreviewSection />);
  };

  it('renders preview frame', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders empty string', () => {
    const wrapper = subject({ editorState: { preview: {}}});
    expect(wrapper.find('PreviewFrame')).toHaveProp('content', '');
  });

  it('wraps text content with styles paragraph tag', () => {
    const wrapper = subject({
      editorState: {
        currentTabKey: 'text',
        preview: { text: 'Test Example' }
      }
    });

    expect(wrapper.find('PreviewFrame'))
      .toHaveProp('content', '<p style="white-space: pre-wrap">Test Example</p>');
  });

  it('sets the "PreviewFrame" content to the html preview when the "currentTabKey" is set to "test_data"', () => {
    const wrapper = subject({
      editorState: {
        currentTabKey: 'test_data',
        preview: { html: '<h1>Test Example</h1>' }
      }
    });

    expect(wrapper.find('PreviewFrame')).toHaveProp('content', '<h1>Test Example</h1>');
  });

  it('sets the "PreviewFrame" content to the amp HTML preview when the "currentTabKey" is set to "test_data" but no HTML is present', () => {
    const wrapper = subject({
      editorState: {
        currentTabKey: 'test_data',
        preview: {
          html: null,
          amp_html: '<p>AMP HTML</p>'
        }
      }
    });

    expect(wrapper.find('PreviewFrame')).toHaveProp('content', '<p>AMP HTML</p>');
  });

  it('sets the "PreviewFrame" content to the text preview when the "currentTabKey" is set to "test_data" and the preview does not have HTML or AMP HTML present', () => {
    const wrapper = subject({
      editorState: {
        currentTabKey: 'test_data',
        preview: {
          html: null,
          amp_html: null,
          text: 'Some text'
        }
      }
    });

    expect(wrapper.find('PreviewFrame')).toHaveProp('content', '<p style="white-space: pre-wrap">Some text</p>');
  });

  it('sets the "PreviewFrame" content to "" when the "currentTabKey" is set to "test_data" and no HTML, AMP HTML, or text are present in the preview', () => {
    const wrapper = subject({
      editorState: {
        currentTabKey: 'test_data',
        preview: {
          html: null,
          amp_html: null,
          text: null
        }
      }
    });

    expect(wrapper.find('PreviewFrame')).toHaveProp('content', '');
  });

  it('renders non-strict preview frame for AMP HTML', () => {
    const wrapper = subject({ editorState: { currentTabKey: 'amp_html' }});
    expect(wrapper.find('PreviewFrame')).toHaveProp('strict', false);
  });

  it('renders error frame', () => {
    const previewLineErrors = [{ line: 1, message: 'Oh no!' }];
    const wrapper = subject({ editorState: { hasFailedToPreview: true, previewLineErrors }});

    expect(wrapper.find('PreviewErrorFrame')).toHaveProp('errors', previewLineErrors);
  });
});
