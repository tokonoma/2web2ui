import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import SendTestEmailButton from '../SendTestEmailButton';

jest.mock('../../hooks/useEditorContext');

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
  const toEmailSelector = '[name="emailTo"]';

  // Render the subject, open the modal, and return relevant variables for use in test cases
  const openModal = () => {
    const promise = Promise.resolve();
    const updateDraft = jest.fn(() => promise);
    const sendPreview = jest.fn(() => promise);
    const showAlert = jest.fn(() => promise);
    const wrapper = subject({
      updateDraft,
      sendPreview,
      showAlert
    });

    wrapper.find('[children="Send a Test"]').simulate('click');

    return {
      wrapper,
      promise,
      updateDraft,
      sendPreview,
      showAlert
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

    it('updates the `selectedItems` prop, clears the `value` prop a valid email address and hits the space bar or tab key', () => {
      const { promise, wrapper } = openModal();
      const toEmailSelector = '[name="emailTo"]';

      return promise.then(() => {
        // Adding a selected item via the spacebar
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});

        expect(wrapper.find(toEmailSelector)).toHaveProp('value', 'hello@me.com');

        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).not.toHaveProp('value', 'hello@me.com');
        expect(wrapper.find(toEmailSelector)).toHaveProp('selectedItems', [ { email: 'hello@me.com' } ]);
      });
    });

    it('updates the `error` prop when the user enters an invalid email and hits the spacebar or blurs the field', () => {
      const { promise, wrapper } = openModal();
      const toEmailSelector = '[name="emailTo"]';

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'invalidEmail' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('error', 'Please enter valid email addresses without duplicates');

        wrapper.find(toEmailSelector).simulate('change', { target: { value: '' }}); // Clear the error

        expect(wrapper.find(toEmailSelector)).toHaveProp('error', '');

        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'invalidEmailAgain' }});

        wrapper.find(toEmailSelector).simulate('blur', { type: 'blur' });

        expect(wrapper.find(toEmailSelector)).toHaveProp('error', 'Please enter valid email addresses without duplicates');
      });

    });

    it('removes the last item in the `selectedItems` array when the user uses the backspace key', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('selectedItems', [ { email: 'hello@me.com' } ]);

        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@you.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });

        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 8, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('selectedItems', [ { email: 'hello@me.com' } ]);

        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 8, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('selectedItems', []);
      });
    });

    it('renders an error if the user enters a duplicate email address', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('error', 'Please enter valid email addresses without duplicates');
      });
    });

    it('removes an item from the `selectedItems` prop when `removeItem` is invoked', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
        wrapper.find(toEmailSelector).props().removeItem({ email: 'hello@me.com' });

        expect(wrapper.find(toEmailSelector)).toHaveProp('selectedItems', []);
      });
    });
  });

  describe('the form submission', () => {
    it('renders an error on the to email field when the user submits the form with no values in the email list', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.find(toEmailSelector)).toHaveProp('error', 'Please enter valid email addresses without duplicates');
      });
    });

    it('invokes the sendPreview function with loading UI, followed by showAlert without the loading UI when there are values in the to email list', () => {
      const {
        promise,
        wrapper,
        sendPreview,
        showAlert
      } = openModal();

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.find('Loading')).toExist();
        expect(sendPreview).toHaveBeenCalled();

        return promise.then(() => {
          expect(wrapper.find('Loading')).not.toExist();
          expect(wrapper.find('Modal')).toHaveProp('open', false);
          expect(showAlert).toHaveBeenCalled();
        });
      });
    });

    it('no longer renders the loading UI if sending succeeds or catches', () => {
      const { promise, wrapper } = openModal();

      return promise.then(() => {
        wrapper.find(toEmailSelector).simulate('change', { target: { value: 'hello@me.com' }});
        wrapper.find(toEmailSelector).simulate('keydown', { keyCode: 32, preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.find('Loading')).toExist();

        return promise.finally(() => {
          expect(wrapper.find('Loading')).not.toExist();
        });
      });
    });
  });
});


