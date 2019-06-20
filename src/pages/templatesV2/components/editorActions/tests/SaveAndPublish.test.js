import React from 'react';
import { shallow } from 'enzyme';
import SaveAndPublish from '../SaveAndPublish';
import useEditorContext from '../../../hooks/useEditorContext';

jest.mock('../../../hooks/useEditorContext');

describe('SaveAndPublish', () => {
  const subject = (editorState, children = null) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'foo' },
      history: { push: jest.fn() },
      ...editorState
    });

    return shallow(<SaveAndPublish className={'Foo'}>{children}</SaveAndPublish>);
  };

  it('renders SaveAndPublish action', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders SaveAndPublish action with provided children', () => {
    expect(subject(null,
      <span>Click here</span>).find('UnstyledLink').html()).toMatch('<a><span>Click here</span></a>');
  });

  it('renders confirmation modal upon clicking', () => {
    const wrapper = subject();
    expect(wrapper.find('ConfirmationModal').prop('open')).toBe(false);
    wrapper.find('UnstyledLink').simulate('click');
    expect(wrapper.find('ConfirmationModal').prop('open')).toBe(true);
  });

  it('publishes content upon confirmation', () => {
    const publishDraft = jest.fn(() => Promise.resolve());
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({ publishDraft, content });
    wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalledWith({ id: 'foo', content }, undefined);
  });

  it('publishes content with subaccount upon confirmation', () => {
    const publishDraft = jest.fn(() => Promise.resolve());
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({ publishDraft, content, draft: { id: 'foo', subaccount_id: 101 }});
    wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalledWith({ id: 'foo', content }, 101);
  });

  it('redirects to published path upon publishing', async () => {
    const push = jest.fn();
    const publishDraft = jest.fn(() => Promise.resolve());
    const wrapper = subject({ history: { push }, publishDraft });
    await wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content');
  });

  it('redirects to published path with subaccount upon publishing', async () => {
    const push = jest.fn();
    const publishDraft = jest.fn(() => Promise.resolve());
    const wrapper = subject({ history: { push }, publishDraft, draft: { id: 'foo', subaccount_id: 101 }});
    await wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content?subaccount=101');
  });

});
