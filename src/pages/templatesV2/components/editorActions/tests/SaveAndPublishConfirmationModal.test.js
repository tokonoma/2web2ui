import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import useRouter from 'src/hooks/useRouter';
import SaveAndPublishConfirmationModal from '../SaveAndPublishConfirmationModal';

jest.mock('../../../hooks/useEditorContext');
jest.mock('src/hooks/useRouter');

describe('SaveAndPublishConfirmationModal', () => {
  const subject = (editorState, history, props) => {
    useEditorContext.mockReturnValue({
      draft: {
        id: 'foo'
      },
      isDraftPublishing: false,
      publishDraft: jest.fn(),
      ...editorState
    });
    useRouter.mockReturnValue({
      history: {
        push: jest.fn(),
        ...history
      }
    });

    return shallow(
      <SaveAndPublishConfirmationModal
        onCancel={jest.fn()}
        open={true}
        {...props}
      />
    );
  };

  it('renders', () => {
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets the `ConfirmationModal` `open` prop to `false` when set via the `open` prop of the wrapper', () => {
    const wrapper = subject(undefined, undefined, { open: false });

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
    const promise = Promise.resolve();
    const publishDraft = jest.fn(() => promise);
    const wrapper = subject({ publishDraft });
    const { history } = useRouter();

    wrapper.find('ConfirmationModal').simulate('confirm');

    return promise.then(() => {
      expect(publishDraft).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content');
    });
  });

  it('redirects to published path with subaccount upon publishing', async () => {
    const promise = Promise.resolve();
    const publishDraft = jest.fn(() => promise);
    const wrapper = subject({ publishDraft, draft: { id: 'foo', subaccount_id: 101 }});
    const { history } = useRouter();

    wrapper.find('ConfirmationModal').simulate('confirm');

    return promise.then(() => {
      expect(publishDraft).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith('/templatesv2/edit/foo/published/content?subaccount=101');
    });
  });
});
