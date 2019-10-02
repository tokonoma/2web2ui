import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditNavigation from '../EditNavigation';

jest.mock('../../hooks/useEditorContext');

describe('EditNavigation', () => {
  const subject = ({ editorState, ...props } = {}) => {
    useEditorContext.mockReturnValue({
      currentNavigationKey: 'contents',
      ...editorState
    });

    return shallow(
      <EditNavigation
        primaryArea={<button>Click Me</button>}
        {...props}
      />
    );
  };

  it('renders navigation with primary area', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls setNavigation when link is clicked', () => {
    const setNavigation = jest.fn();
    const wrapper = subject({ editorState: { setNavigation }});

    wrapper
      .find('UnstyledLink')
      .filterWhere((node) => node.children().text() === 'Template Settings')
      .simulate('click');

    expect(setNavigation).toHaveBeenCalledWith('settings');
  });

  it('renders a "Saved" when the editor state `hasSaved` is `true`', () => {
    const wrapper = subject({ editorState: { hasSaved: true }});

    // TODO: Replace with `toHaveTextContent` matcher
    expect(wrapper.find('SavedIndicator')).toHaveProp('content', 'Saved');
  });

  it('renders "Unsaved Changes" when the editor state `hasSaved` is `false`', () => {
    const wrapper = subject({ editorState: { hasSaved: false }});

    // TODO: Replace with `toHaveTextContent` matcher
    expect(wrapper.find('SavedIndicator')).toHaveProp('content', 'Unsaved Changes');
  });
});
