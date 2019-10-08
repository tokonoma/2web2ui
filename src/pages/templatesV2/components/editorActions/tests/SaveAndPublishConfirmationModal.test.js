import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../../hooks/useEditorContext';
import { routeNamespace } from '../../../constants/routes';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import SaveAndPublishConfirmationModal from '../SaveAndPublishConfirmationModal';

jest.mock('../../../hooks/useEditorContext');

describe('SaveAndPublishConfirmationModal', () => {
  const subject = (editorState, history, props) => {
    useEditorContext.mockReturnValue({
      draft: {
        id: 'foo'
      },
      isDraftPublishing: false,
      publishDraftV2: jest.fn(),
      getParsedTestData: jest.fn(),
      updateSnippet: jest.fn(),
      ...editorState
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

  it('on confirm, 1) calls publishDraftV2, 2) calls updateSnippet, and 3) redirects to published path upon publishing', async () => {
    const publishDraftPromise = Promise.resolve();
    const updateRecipientPromise = Promise.resolve();
    const testData = {
      options: {
        foo: 'bar'
      },
      metadata: {
        meta: 'data'
      },
      substitution_data: {
        substitution: 'data'
      }
    };
    const getParsedTestData = jest.fn();
    getParsedTestData.mockReturnValue(testData);
    const publishDraftV2 = jest.fn(() => publishDraftPromise);
    const updateSnippet = jest.fn(() => updateRecipientPromise);
    const draft = { id: 'foo', subaccount_id: 101 };
    const content = { text: 'foo text', html: '<h1>foo html</h1>' };
    const wrapper = subject({
      publishDraftV2,
      getParsedTestData,
      updateSnippet,
      draft,
      content
    });
    wrapper.find('ConfirmationModal').simulate('confirm');

    expect(publishDraftV2).toHaveBeenCalledWith(
      {
        ...draft,
        content,
        options: testData.options
      },
      101
    );
    expect(updateSnippet).toHaveBeenCalledWith(
      {
        id: draft.id,
        recipients: [{
          address: {
            email: 'sparkpost_templates_placeholder@sparkpost.com'
          },
          metadata: testData.metadata,
          substitution_data: testData.substitution_data
        }]
      }
    );

    /* eslint-disable arrow-body-style */
    return publishDraftPromise.then(() => {
      return updateRecipientPromise.then(() => {
        expect(wrapper.find('RedirectAndAlert')).toHaveProp('to', `/${routeNamespace}/edit/${draft.id}/published/content${setSubaccountQuery(draft.subaccount_id)}`);
      });
    });
    /* eslint-enable arrow-body-style */
  });
});
