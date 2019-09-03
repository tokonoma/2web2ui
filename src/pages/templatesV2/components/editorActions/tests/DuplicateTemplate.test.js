import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import DuplicateTemplate from '../DuplicateTemplate';

jest.mock('../../../hooks/useEditorContext');

describe('DuplicateTemplate', () => {
  const subject = (editorState, props) => {
    useEditorContext.mockReturnValue({
      hasDraft: true,
      draft: {
        name: 'My Draft',
        id: 'my-draft'
      },
      ...editorState
    });

    return shallow(<DuplicateTemplate {...props}/>);
  };

  it('Opens a child modal component when clicked', () => {
    const wrapper = subject();

    wrapper.find('UnstyledLink').simulate('click');

    expect(wrapper.find('Modal').props().open).toBe(true);
  });
});
