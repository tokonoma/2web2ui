import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import useEditorContext from '../../hooks/useEditorContext';
import SendTestEmailButton from '../SendTestEmailButton';

jest.mock('../../hooks/useEditorContext');

describe('SendTestEmailButton', () => {
  afterEach(() => cleanup());

  const subject = (editorState, props) => {
    useEditorContext.mockReturnValue({
      content: {
        from: 'nick@bounce.uat.sparkpost.com',
        subject: 'Mock Subject',
        text: 'Here is some text',
        html: '<p>Here is some HTML'
      },
      match: {
        params: {
          id: '123456'
        }
      },
      updateDraft: jest.fn(() => Promise.resolve()),
      setHasSaved: jest.fn(),
      ...editorState
    });

    return render(<SendTestEmailButton {...props}/>);
  };

  it('opens the modal in the loading state and saves the draft when the "Send a Test" button is clicked', () => {
    const mockUpdateDraft = jest.fn(() => Promise.resolve());
    const { getByText, getByTestId } = subject({
      updateDraft: mockUpdateDraft
    });

    fireEvent.click(getByText('Send a Test'));

    expect(mockUpdateDraft).toHaveBeenCalled();
    expect(getByTestId('panel-loading')).toBeInTheDocument();
  });

  it('opens the modal and resolves the loading state after the draft is updated, rendering the form', () => {
    const promise = Promise.resolve();
    const mockUpdateDraft = jest.fn(() => promise);
    const { getByText, getByLabelText, queryByTestId } = subject({
      updateDraft: mockUpdateDraft
    });

    fireEvent.click(getByText('Send a Test'));

    return promise.then(() => {
      expect(queryByTestId('panel-loading')).not.toBeInTheDocument();
      expect(getByLabelText('To')).toBeInTheDocument();
      expect(getByLabelText('From')).toBeInTheDocument();
      expect(getByLabelText('Subject')).toBeInTheDocument();
      expect(getByText('Send Email')).toBeInTheDocument();
    });
  });

  it('renders "Please enter a valid email address" when submitting the form with no values and then clears the error when the modal closes', () => {
    const { getByText, queryByText } = subject();

    fireEvent.click(getByText('Send a Test'));

    return Promise.resolve().then(() => {
      fireEvent.click(getByText('Send Email'));

      expect(getByText('Please enter a valid email address')).toBeInTheDocument();

      fireEvent.click(queryByText('Close'));

      expect(queryByText('Send Email')).not.toBeInTheDocument();

      fireEvent.click(getByText('Send a Test'));

      return Promise.resolve().then(() => {
        expect(queryByText('Please enter a valid email address')).not.toBeInTheDocument();
      });
    });
  });
});

// describe('SendTestEmailButton', () => {
//   const subject = (editorState, props) => {
//     useEditorContext.mockReturnValue({
//       content: {
//         from: 'nick@bounce.uat.sparkpost.com',
//         subject: 'Mock Subject',
//         text: 'Here is some text',
//         html: '<p>Here is some HTML'
//       },
//       match: {
//         params: {
//           id: '123456'
//         }
//       },
//       ...editorState
//     });

//     return shallow(<SendTestEmailButton {...props}/>);
//   };

//   const getMultiEmailField = (wrapper) => wrapper.find('[name="emailTo"]');

//   // Render the subject, open the modal, and return relevant variables for use in test cases
//   const openModal = () => {
//     const promise = Promise.resolve();
//     const updateDraft = jest.fn(() => promise);
//     const sendPreview = jest.fn(() => promise);
//     const showAlert = jest.fn(() => promise);
//     const setTestData = jest.fn(() => promise);
//     const setHasSaved = jest.fn();
//     const wrapper = subject({
//       isPublishedMode: false,
//       updateDraft,
//       sendPreview,
//       showAlert,
//       setTestData,
//       setHasSaved
//     });

//     wrapper.find('[children="Send a Test"]').simulate('click');

//     return {
//       wrapper,
//       promise,
//       updateDraft,
//       sendPreview,
//       showAlert,
//       setTestData,
//       setHasSaved
//     };
//   };

//   it('opens the modal and saves the draft when the "Send a Test" button is clicked', () => {
//     const {
//       promise,
//       wrapper,
//       updateDraft,
//       setHasSaved
//     } = openModal();

//     wrapper.find('[children="Send a Test"]').simulate('click');

//     expect(wrapper.find('Modal')).toHaveProp('open', true);
//     expect(updateDraft).toHaveBeenCalled();
//     expect(wrapper.find('PanelLoading')).toExist();

//     return promise.then(() => {
//       expect(wrapper.find('PanelLoading')).not.toExist();
//       expect(setHasSaved).toHaveBeenCalled();
//       expect(wrapper.find('[name="emailFrom"]')).toExist();
//       expect(wrapper.find('[name="emailSubject"]')).toExist();
//     });
//   });

//   it('closes the modal, clears form data, and clears errors for the `toEmail` field when the Modal is closed', () => {
//     const { promise, wrapper } = openModal();

//     return promise.then(() => {
//       const emailToField = getMultiEmailField(wrapper);

//       wrapper.find('Modal').simulate('close'); // Simulates `onClose` prop

//       expect(wrapper.find('Modal')).toHaveProp('open', false);

//       wrapper.find('form').simulate('submit', { preventDefault: jest.fn() }); // Used to trigger error rendering through premature form submission

//       expect(wrapper.find('PanelLoading')).not.toExist();
//       expect(emailToField).toHaveProp('value', '');
//       expect(emailToField).toHaveProp('emailList', []);
//       expect(emailToField).toHaveProp('error', '');
//     });
//   });

//   describe('the form submission', () => {
//     it('renders an error on the to email field when the user submits the form with no values in the email list', () => {
//       const { promise, wrapper } = openModal();

//       return promise.then(() => {
//         wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

//         expect(getMultiEmailField(wrapper)).toHaveProp('error', 'Please enter a valid email address');
//       });
//     });

//     it('invokes the sendPreview function with loading UI, followed by showAlert without the loading UI when there are values in the to email list', () => {
//       const {
//         promise,
//         wrapper,
//         sendPreview,
//         showAlert
//       } = openModal();

//       return promise.then(() => {
//         getMultiEmailField(wrapper).simulate('change', { target: { value: 'hello@me.com' }});
//         getMultiEmailField(wrapper).simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });
//         wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

//         expect(wrapper.find('PanelLoading')).toExist();
//         expect(sendPreview).toHaveBeenCalled();

//         return promise.then(() => {
//           expect(wrapper.find('PanelLoading')).not.toExist();
//           expect(wrapper.find('Modal')).toHaveProp('open', false);
//           expect(showAlert).toHaveBeenCalled();
//           expect(getMultiEmailField(wrapper)).toHaveProp('value', '');
//           expect(getMultiEmailField(wrapper)).toHaveProp('emailList', []);
//         });
//       });
//     });

//     it('no longer renders the loading UI if sending succeeds or catches', () => {
//       const { promise, wrapper } = openModal();

//       return promise.then(() => {
//         getMultiEmailField(wrapper).simulate('change', { target: { value: 'hello@me.com' }});
//         getMultiEmailField(wrapper).simulate('keyDownAndBlur', { keyCode: 32, preventDefault: jest.fn() });
//         wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

//         expect(wrapper.find('PanelLoading')).toExist();

//         return promise.finally(() => {
//           expect(wrapper.find('PanelLoading')).not.toExist();
//         });
//       });
//     });
//   });
// });
