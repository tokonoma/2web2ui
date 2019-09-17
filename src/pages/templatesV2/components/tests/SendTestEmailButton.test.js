import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import SendTestEmailButton from '../SendTestEmailButton';

jest.mock('../../hooks/useEditorContext');

// Test Cases 🧪⚗️
/*
** The modal opening **
- The open prop on the modal is controlled by clicking 'Send a test'
- The `updateDraft` function fires when the modal is opened
- The modal renders the `<Loading/>` component when initially opened
- The `<Loading/>` component is no longer rendered when the promise resolves, rendering the 'To', 'From', and 'Subject' fields
- The 'from' and 'subject' fields render with data from the template content and are disabled when initially rendered

** The modal closing **
- The modal open prop is controlled by clicking the close button
- The form is cleared when the modal is closed - the 'to' field is blank, the email list is also blank
- The email error clears

** The 'to' form group **
- The submit event does not fire when the user hits 'enter' on the field
- If there are items in the email list and to `toEmail` text field is blank, when the user hits backspace the last item from the `emailList` is removed
- If the user hits 'spacebar' on the keyboard, no spaces are written to the 'to' field
- If the user enters an email address and hits 'spacebar' the email address is rendered as a tag, the text field clears, and any error is removed
- If the user enters an email address and blurs the field, the email address is rendered as a tag, the text field clears, and any error is removed
- If the user enters an email address, hits spacebar, and the email address is already in the list, an error is rendered
- if the user enters an invalid email address and hits spacebar, and error is rendered
- if the user clicks on the remove item button in an email list tag, then that particular instance is removed from the UI

** Submitting **
- if the `toEmailList` has no entries, the form renders an error
- If the form is submitted and there are emails in the `toEmailList`, then the form in the loading state
- If the `toEmailList` has a value, then the `<Loading/>` component is rendered and the `sendPreview()` method is invoked
- If the `sendPreview()` method succeeds, the `<Modal/>` prop `open` is set to `false`
- If the `sendPreview()` method fails, the `<Modal/>` remains open but the `<Loading/>` component is no longer rendered
*/

describe('SendTestEmailButton', () => {
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
      sendPreview: jest.fn(() => Promise.resolve()),
      updateDraft: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      ...editorState
    });

    return shallow(<SendTestEmailButton {...props}/>);
  };

  it('renders with the content "Send a Test"', () => {
    const wrapper = subject();

    expect(wrapper).toHaveTextContent('Send a Test');
    expect(wrapper.find('[title="Opens a dialog"]')).toExist();
  });

  it('updates the modal `open` prop to `true` when the "Send a Test" button is clicked', () => {
    const wrapper = subject();

    expect(wrapper.find('Modal')).toHaveProp('open', false);

    wrapper.find('[children="Send a Test"]').simulate('click');

    expect(wrapper.find('Modal')).toHaveProp('open', true);
  });
});
