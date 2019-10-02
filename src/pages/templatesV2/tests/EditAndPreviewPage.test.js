import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../hooks/useEditorContext';
import EditAndPreviewPage from '../EditAndPreviewPage';

jest.mock('../hooks/useEditorContext');

describe('EditAndPreviewPage', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      currentNavigationIndex: 0,
      draft: { id: 'test-template', name: 'Test Template' },
      hasDraftFailedToLoad: false,
      isDraftLoading: false,
      ...editorState
    });

    return shallow(<EditAndPreviewPage />);
  };

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders a page in published mode', () => {
    expect(subject({ editorState: { isPublishedMode: true }}).prop('primaryArea')).toMatchSnapshot();
  });

  it('renders the title with the content "(DRAFT)" appended when not in published mode', () => {
    const wrapper = subject({ editorState: { isPublishedMode: false }});

    expect(wrapper).toHaveProp('title', 'Test Template (DRAFT)');
  });

  it('does not render with the content "(DRAFT)" appended when in published mode', () => {
    const wrapper = subject({ editorState: { isPublishedMode: true }});

    expect(wrapper).toHaveProp('title', 'Test Template');
  });

  it('renders loading', () => {
    const wrapper = subject({ editorState: { isDraftLoading: true }});
    expect(wrapper.find('Loading')).toExist();
  });

  it('redirects and alerts when fails to load', () => {
    const wrapper = subject({ editorState: { hasDraftFailedToLoad: true }});
    expect(wrapper.find('RedirectAndAlert')).toExist();
  });
});
