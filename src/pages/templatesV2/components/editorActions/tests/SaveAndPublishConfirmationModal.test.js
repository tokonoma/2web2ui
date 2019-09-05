import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import SaveAndPublishConfirmationModal from '../SaveAndPublishConfirmationModal';

jest.mock('../../../hooks/useEditorContext');

describe('SaveAndPublishConfirmationModal', () => {
  const subject = (editorState, props) => {
    useEditorContext.mockReturnValue({
      draft: {
        id: 'foo'
      },
      isDraftPublishing: false,
      publishDraft: jest.fn(),
      history: { push: jest.fn() },
      ...editorState
    });

    return shallow(<SaveAndPublishConfirmationModal onCancel={jest.fn()} open={true} {...props} />);
  };

  it('renders', () => {
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets the `ConfirmationModal` `open` prop to `false` when set via the `open` prop of the wrapper', () => {
    const wrapper = subject(undefined, { open: false });

    expect(wrapper.find('ConfirmationModal').props().open).toEqual(false);
  });

  it('publishes content upon confirmation', () => {
    const publishDraft = jest.fn(() => Promise.resolve());
    const draft = { id: 'foo', content: { text: 'foo text', html: '<h1>foo html</h1>' }};
    const wrapper = subject({ publishDraft, draft });
    wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalledWith(draft, undefined);
  });

  it('publishes content with subaccount upon confirmation', () => {
    const publishDraft = jest.fn(() => Promise.resolve());
    const draft = { id: 'foo', content: { text: 'foo text', html: '<h1>foo html</h1>' }, subaccount_id: 101 };
    const wrapper = subject({ publishDraft, draft });
    wrapper.find('ConfirmationModal').prop('onConfirm')(); //invoke attached func
    expect(publishDraft).toHaveBeenCalledWith(draft, 101);
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
