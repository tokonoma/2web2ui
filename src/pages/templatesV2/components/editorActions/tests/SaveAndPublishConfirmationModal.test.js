import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import SaveAndPublishConfirmationModal from '../SaveAndPublishConfirmationModal';

jest.mock('../../../hooks/useEditorContext');

describe('SaveAndPublishConfirmationModal', () => {
  const subject = (editorState, props) => {
    useEditorContext.mockReturnValue({
      draft: {
        id: 'abcdefg',
        subaccount_id: 'hijklmnop'
      },
      isDraftPublishing: false,
      publishDraft: jest.fn(),
      history: jest.fn(),
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
});
