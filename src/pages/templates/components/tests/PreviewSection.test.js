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

  it('renders non-strict preview frame for AMP HTML', () => {
    const wrapper = subject({ editorState: { currentTabKey: 'amp_html' }});
    expect(wrapper.find('PreviewFrame')).toHaveProp('strict', false);
  });
});
