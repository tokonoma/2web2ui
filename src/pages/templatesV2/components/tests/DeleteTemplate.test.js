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
      deleteSnippet: jest.fn(() => Promise.resolve()),
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
    const mockDeleteTemplate = jest.fn(() => Promise.resolve());
    const mockDeleteSnippet = jest.fn(() => Promise.resolve);
    const wrapper = subject({
      deleteTemplate: mockDeleteTemplate,
      deleteSnippet: mockDeleteSnippet
    });
    wrapper.find('Button').simulate('click');
    await wrapper.find('DeleteModal').prop('onDelete')();
    expect(mockDeleteTemplate).toHaveBeenCalledWith('foo', undefined);
    expect(mockDeleteSnippet).toHaveBeenCalledWith('foo', undefined);
  });

  it('hides modal upon clicking on cancel', () => {
    const wrapper = subject();
    wrapper.find('Button').simulate('click'); //clicks Delete component
    expect(wrapper.find('DeleteModal').prop('open')).toBe(true);
    wrapper.find('DeleteModal').prop('onCancel')(); //invokes onCancel callback
    expect(wrapper.find('DeleteModal').prop('open')).toBe(false);
  });

  it('deletes template with subaccount upon confirmation', async () => {
    const mockDeleteTemplate = jest.fn(() => Promise.resolve());
    const mockDeleteSnippet = jest.fn(() => Promise.resolve());
    const wrapper = subject({
      deleteTemplate: mockDeleteTemplate,
      deleteSnippet: mockDeleteSnippet,
      subaccountId: 101
    });
    wrapper.find('Button').simulate('click');
    await wrapper.find('DeleteModal').prop('onDelete')();
    expect(mockDeleteTemplate).toHaveBeenCalledWith('foo', 101);
    expect(mockDeleteSnippet).toHaveBeenCalledWith('foo', 101);
  });

  it('invokes afterDelete upon deletion', async () => {
    const templatePromise = Promise.resolve();
    const snippetPromise = Promise.resolve();
    const mockDeleteTemplate = jest.fn(() => templatePromise);
    const mockDeleteSnippet = jest.fn(() => snippetPromise);
    const mockAfterDelete = jest.fn();
    const wrapper = subject({
      deleteTemplate: mockDeleteTemplate,
      deleteSnippet: mockDeleteSnippet
    }, { afterDelete: mockAfterDelete });

    wrapper.find('DeleteModal').simulate('delete');

    /* eslint-disable arrow-body-style */
    return templatePromise.then(() => {
      return snippetPromise.then(() => {
        expect(mockAfterDelete).toHaveBeenCalled();
      });
    });
    /* eslint-enable arrow-body-style */
  });
});
