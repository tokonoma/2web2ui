import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import SendTestEmailButton from '../SendTestEmailButton';

jest.mock('../../hooks/useEditorContext');

// Test Cases 🧪⚗️
/*
** The modal opening **
- [X] The open prop on the modal is controlled by clicking 'Send a test'
- [X] The `updateDraft` function fires when the modal is opened
- [X] The modal renders the `<Loading/>` component when initially opened
- [X] The `<Loading/>` component is no longer rendered when the promise resolves, rendering the 'To', 'From', and 'Subject' fields
- [X] The 'from' and 'subject' fields render with data from the template content and are disabled when initially rendered

** The modal closing **
- [X] The modal open prop is controlled by clicking the close button
- [X] The form is cleared when the modal is closed - the 'to' field is blank, the email list is also blank
- [X] The email error clears

** The 'to' form group **
- [X] The submit event does not fire when the user hits 'enter' on the field
- [X] If the user hits 'spacebar' on the keyboard, no spaces are written to the 'to' field
- [] If the user enters an email address and hits 'spacebar' the email address is rendered as a tag, the text field clears, and any error is removed
- [] If the user enters an email address and blurs the field, the email address is rendered as a tag, the text field clears, and any error is removed
- [] If there are items in the email list and to `toEmail` text field is blank, when the user hits backspace the last item from the `emailList` is removed
- [] If the user enters an email address, hits spacebar, and the email address is already in the list, an error is rendered
- [] if the user enters an invalid email address and hits spacebar, and error is rendered
- [] if the user clicks on the remove item button in an email list tag, then that particular instance is removed from the UI

** Submitting **
- [] If the `toEmailList` has no entries, the form renders an error
- [] If the form is submitted and there are emails in the `toEmailList`, then the form in the loading state
- [] If the `toEmailList` has a value, then the `<Loading/>` component is rendered and the `sendPreview()` method is invoked
- [] If the `sendPreview()` method succeeds, the `<Modal/>` prop `open` is set to `false`
- [] If the `sendPreview()` method fails, the `<Modal/>` remains open but the `<Loading/>` component is no longer rendered
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
      ...editorState
    });

    return shallow(<SendTestEmailButton {...props}/>);
  };

  const openModal = () => {
    const promise = Promise.resolve();
    const updateDraft = jest.fn(() => promise);
    const wrapper = subject({ updateDraft });

    wrapper.find('[children="Send a Test"]').simulate('click');

    return {
      wrapper,
      promise,
      updateDraft
    };
  };

  it('opens the modal and saves the draft when the "Send a Test" button is clicked', () => {
    const { promise, wrapper, updateDraft } = openModal();

    wrapper.find('[children="Send a Test"]').simulate('click');

    expect(wrapper.find('Modal')).toHaveProp('open', true);
    expect(updateDraft).toHaveBeenCalled();
    expect(wrapper.find('Loading')).toExist();

    return promise.then(() => {
      expect(wrapper.find('Loading')).not.toExist();
      expect(wrapper.find('[name="emailFrom"]')).toExist();
      expect(wrapper.find('[name="emailSubject"]')).toExist();
    });
  });

  it('closes the modal, clears form data, and clears errors for the `toEmail` field when the Modal is closed', () => {
    const { promise, wrapper } = openModal();

    return promise.then(() => {
      const emailToField = wrapper.find('[name="emailTo"]');

      wrapper.find('Modal').simulate('close'); // Simulates `onClose` prop

      expect(wrapper.find('Modal')).toHaveProp('open', false);

      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() }); // Used to trigger error rendering through premature form submission

      expect(wrapper.find('Loading')).not.toExist();
      expect(emailToField).toHaveProp('value', '');
      expect(emailToField).toHaveProp('selectedItems', []);
      expect(emailToField).toHaveProp('error', '');
    });
  });

  describe('the `emailTo` field', () => {
    it('does not submit the form when the user hits the "enter" key', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        const mockPreventDefault = jest.fn();

        wrapper.find('[name="emailTo"]').simulate('keydown', { keyCode: 13, preventDefault: mockPreventDefault });

        expect(mockPreventDefault).toHaveBeenCalled();
      });
    });

    it('does not write spaces to the `to` field when the user hits the spacebar', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        const mockPreventDefault = jest.fn();

        wrapper.find('[name="emailTo"]').simulate('keydown', { keyCode: 32, type: 'keydown', preventDefault: mockPreventDefault });
        expect(mockPreventDefault).toHaveBeenCalled();
        expect(wrapper).not.toHaveProp('value', ' ');
      });
    });

    // it('renders a tag when the user enters a valid email address and hits the space bar or tab key', () => {
    //   const { promise, wrapper } = openModal();

    //   return promise.then(() => {
    //     console.log(wrapper.debug());
    //   });
    // });
  });
});


