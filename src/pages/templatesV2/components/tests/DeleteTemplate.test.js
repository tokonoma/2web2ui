import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import DeleteTemplate from '../DeleteTemplate';

jest.mock('../../hooks/useEditorContext');

describe('DeleteTemplate', () => {
  const subject = (editorState = {}, props = {}) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      isDeletePending: false,
      deleteTemplate: jest.fn(() => Promise.resolve()),
      ...editorState
    });

    return shallow(<DeleteTemplate {...props}>Delete</DeleteTemplate>);
  };

  it('renders delete button', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('shows modal upon clicking delete button', () => {
    const wrapper = subject();
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('DeleteModal').prop('open')).toBe(true);
  });

  it('deletes template upon confirmation', async () => {
    const mockDelete = jest.fn(() => Promise.resolve());
    const wrapper = subject({ deleteTemplate: mockDelete });
    wrapper.find('Button').simulate('click');
    await wrapper.find('DeleteModal').prop('onDelete')();
    expect(mockDelete).toHaveBeenCalledWith('foo', undefined);
  });

  it('hides modal upon clicking on cancel', () => {
    const wrapper = subject();
    wrapper.find('Button').simulate('click'); //clicks Delete component
    expect(wrapper.find('DeleteModal').prop('open')).toBe(true);
    wrapper.find('DeleteModal').prop('onCancel')(); //invokes onCancel callback
    expect(wrapper.find('DeleteModal').prop('open')).toBe(false);
  });

  it('deletes template with subaccount upon confirmation', async () => {
    const mockDelete = jest.fn(() => Promise.resolve());
    const wrapper = subject({ deleteTemplate: mockDelete, subaccountId: 101 });
    wrapper.find('Button').simulate('click');
    await wrapper.find('DeleteModal').prop('onDelete')();
    expect(mockDelete).toHaveBeenCalledWith('foo', 101);
  });

  it('invokes afterDelete upon deletion', async () => {
    const mockAfterDelete = jest.fn();
    const wrapper = subject({}, { afterDelete: mockAfterDelete });
    wrapper.find('Button').simulate('click');
    await wrapper.find('DeleteModal').prop('onDelete')();
    expect(mockAfterDelete).toHaveBeenCalled();
  });


});
