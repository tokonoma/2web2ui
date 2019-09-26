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
});
