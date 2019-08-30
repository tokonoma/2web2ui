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

  describe('The duplicate template modal', () => {
    const wrapper = subject();
    const modalProps = wrapper.find('Modal').props();

    it('is initially closed on mount', () => {
      expect(modalProps.open).toBe(false);
    });

    it('has a close button', () => {
      expect(modalProps.showCloseButton).toBe(true);
    });

    it('has a `Panel` component with the title "Duplicate Template"', () => {
      expect(wrapper.find('Panel').props().title).toBe('Duplicate Template');
    });

    it('has a two `TextField` components', () => {
      expect(wrapper.find('TextField')).toHaveLength(2);
    });

    it('has a "Duplicate" button', () => {
      expect(wrapper.find('Button')).toExist();
    });
  });
});
