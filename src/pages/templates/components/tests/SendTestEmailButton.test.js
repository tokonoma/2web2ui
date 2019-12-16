import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useEditorContext from '../../hooks/useEditorContext';
import SendTestEmailButton from '../SendTestEmailButton';

jest.mock('../../hooks/useEditorContext');

describe('SendTestEmailButton', () => {
  const subject = (editorState, props) => {
    useEditorContext.mockReturnValue({
      content: {
        from: {
          email: 'nick@bounce.uat.sparkpost.com',
        },
        subject: 'Mock Subject',
        text: 'Here is some text',
        html: '<p>Here is some HTML',
      },
      template: {
        id: '123456',
        subaccount_id: 123,
      },
      isPublishedMode: false,
      updateDraft: jest.fn(() => Promise.resolve()),
      setHasSaved: jest.fn(),
      ...editorState,
    });

    return render(<SendTestEmailButton {...props} />);
  };

  it('opens the modal in the loading state and saves the draft when the "Send a Test" button is clicked', () => {
    const mockUpdateDraft = jest.fn(() => Promise.resolve());
    const { getByText, queryByTestId } = subject({
      updateDraft: mockUpdateDraft,
    });

    userEvent.click(getByText('Send a Test'));

    expect(mockUpdateDraft).toHaveBeenCalled();
    expect(queryByTestId('panel-loading')).toBeInTheDocument();
  });

  it('opens the modal and resolves the loading state after the draft is updated, rendering the form', () => {
    const promise = Promise.resolve();
    const mockUpdateDraft = jest.fn(() => promise);
    const { queryByText, queryByLabelText, queryByTestId } = subject({
      updateDraft: mockUpdateDraft,
    });

    userEvent.click(queryByText('Send a Test'));

    return promise.then(() => {
      expect(queryByTestId('panel-loading')).not.toBeInTheDocument();
      expect(queryByLabelText('To')).toBeInTheDocument();
      expect(queryByLabelText('From')).toBeInTheDocument();
      expect(queryByLabelText('Subject')).toBeInTheDocument();
      expect(queryByText('Send Email')).toBeInTheDocument();
    });
  });

  it('renders "Please enter a valid email address" when submitting the form with no values and then clears the error when the modal closes', () => {
    const { getByText, queryByText } = subject();

    userEvent.click(getByText('Send a Test'));

    return Promise.resolve().then(async () => {
      userEvent.click(getByText('Send Email'));

      expect(queryByText('Please enter a valid email address')).toBeInTheDocument();

      userEvent.click(queryByText('Close'));

      return Promise.resolve().then(() => {
        expect(queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('submitting the form', () => {
    it('invokes the sendPreview function with loading UI, followed by showAlert without the loading UI when there are values in the to email list', () => {
      const updateDraftPromise = Promise.resolve();
      const sendPreviewPromise = Promise.resolve();
      const mockSendPreview = jest.fn(() => sendPreviewPromise);
      const mockUpdateDraft = jest.fn(() => updateDraftPromise);
      const mockShowAlert = jest.fn();
      const { getByText, queryByText, queryByLabelText, queryByTestId } = subject({
        sendPreview: mockSendPreview,
        showAlert: mockShowAlert,
        updateDraft: mockUpdateDraft,
      });

      userEvent.click(getByText('Send a Test'));

      return updateDraftPromise.then(() => {
        userEvent.type(queryByLabelText('To'), 'toEmail@sparkpost.com');
        // Hit the enter key to add the email address to the list of values
        fireEvent.keyDown(queryByLabelText('To'), { preventDefault: jest.fn(), keyCode: 13 });
        expect(queryByText('toEmail@sparkpost.com')).toBeInTheDocument(); // The email address is stored in the DOM instead of the `value` attribute
        expect(queryByLabelText('From')).toHaveValue('nick@bounce.uat.sparkpost.com');
        userEvent.click(getByText('Send Email'));

        expect(queryByTestId('panel-loading')).toBeInTheDocument();
        expect(mockSendPreview).toHaveBeenCalledWith({
          id: '123456',
          mode: 'draft',
          emails: ['toEmail@sparkpost.com'],
          from: 'nick@bounce.uat.sparkpost.com',
          subaccountId: 123,
        });

        return sendPreviewPromise.then(() => {
          expect(mockShowAlert).toHaveBeenCalledWith({
            type: 'success',
            message: 'Successfully sent a test email',
          });
        });
      });
    });

    it('no longer renders the loading UI if sending succeeds or catches', () => {
      const updateDraftPromise = Promise.resolve();
      const sendPreviewPromise = Promise.resolve();
      const mockSendPreview = jest.fn(() => sendPreviewPromise);
      const mockUpdateDraft = jest.fn(() => updateDraftPromise);
      const mockShowAlert = jest.fn();
      const { getByText, getByLabelText, queryByTestId } = subject({
        sendPreview: mockSendPreview,
        showAlert: mockShowAlert,
        updateDraft: mockUpdateDraft,
      });

      userEvent.click(getByText('Send a Test'));

      return updateDraftPromise.then(() => {
        userEvent.type(getByLabelText('To'), 'toEmail@sparkpost.com');
        // Hit the enter key to add the email address to the list of values
        fireEvent.keyDown(getByLabelText('To'), { preventDefault: jest.fn(), keyCode: 13 });
        userEvent.click(getByText('Send Email'));

        expect(queryByTestId('panel-loading')).toBeInTheDocument();

        return sendPreviewPromise.finally(() => {
          expect(queryByTestId('panel-loading')).not.toBeInTheDocument();
        });
      });
    });

    it('invokes the set test data action (without updating the template otherwise) when the template is in published mode', () => {
      const mockSetTestData = jest.fn();
      const mockUpdateDraft = jest.fn();
      const mockParsedTestData = {
        options: {},
        substitution_data: {
          foo: 'bar',
        },
        metadata: {},
      };

      const { getByText } = subject({
        isPublishedMode: true,
        updateDraft: mockUpdateDraft,
        parsedTestData: mockParsedTestData,
        setTestDataAction: mockSetTestData,
      });

      userEvent.click(getByText('Send a Test'));

      expect(mockUpdateDraft).not.toHaveBeenCalled();
      expect(mockSetTestData).toHaveBeenCalledWith({
        id: '123456',
        mode: 'published',
        data: mockParsedTestData,
      });
    });
  });
});
