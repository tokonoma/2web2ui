import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditPrimaryArea from '../EditPrimaryArea';

jest.mock('../../hooks/useEditorContext');

describe('EditPrimaryArea', () => {
  const subject = ({ editorState = {}} = {}) => {
    useEditorContext.mockReturnValue(editorState);
    return shallow(<EditPrimaryArea />);
  };

  it('renders save button', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders disabled save button', () => {
    const wrapper = subject({ editorState: { isDraftUpdating: true }});
    expect(wrapper).toHaveProp('disabled', true);
  });

  it('renders save button with pending label', () => {
    const wrapper = subject({ editorState: { isDraftUpdating: true }});
    expect(wrapper.children()).toHaveText('Saving');
  });

  it('calls updateDraft on click', () => {
    const updateDraft = jest.fn();
    const content = { html: '<h1>Test Content</h1>' };
    const draft = { id: 'test-template', subaccount_id: '123' };
    const wrapper = subject({ editorState: { content, draft, isDraftUpdating: true, updateDraft }});

    wrapper.simulate('click');

    expect(updateDraft).toHaveBeenCalledWith({ id: draft.id, content }, draft.subaccount_id);
  });
});
