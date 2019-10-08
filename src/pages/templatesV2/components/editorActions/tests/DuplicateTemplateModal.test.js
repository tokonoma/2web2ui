import React from 'react';
import { shallow } from 'enzyme';
import DuplicateTemplateModal from '../DuplicateTemplateModal';

describe('DuplicateTemplateModal', () => {
  const mockFn = jest.fn();
  const subject = (props) => shallow(<DuplicateTemplateModal onClose={mockFn} open={false} {...props}/>);

  it('renders with default props and some data from the current draft', () => {
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('has a close button', () => {
    const wrapper = subject();
    const modalProps = wrapper.find('Modal').props();

    expect(modalProps.showCloseButton).toBe(true);
  });

  it('has a `Panel` component with the title "Duplicate Template"', () => {
    const wrapper = subject();

    expect(wrapper.find('Panel').props().title).toBe('Duplicate Template');
  });

  it('has a two `TextField` components', () => {
    const wrapper = subject();

    expect(wrapper.find('TextField')).toHaveLength(2);
  });

  it('has a "Duplicate" button', () => {
    const wrapper = subject();

    expect(wrapper.find('Button')).toExist();
  });

  it('determines the child Modal component `open` prop value via the `open` prop', () => {
    const wrapper = subject({ open: true });

    expect(wrapper.find('Modal').props().open).toEqual(true);
  });

  it('determines the child Modal component `onClose` prop value via the `onClose` prop', () => {
    const mockFn = jest.fn();
    const wrapper = subject({ onClose: mockFn });

    expect(wrapper.find('Modal').props().onClose).toEqual(mockFn);
  });

  it('renders the default value of the "templateName" `TextField` with the word `(COPY)` appended', () => {
    const exampleTemplate = {
      name: 'My Draft',
      id: 'my-draft'
    };
    const wrapper = subject({ template: exampleTemplate });

    expect(wrapper.find('[name="templateName"]').props().value).toEqual('My Draft (COPY)');
  });

  it('renders the default value of the "templateId" `TextField` with the word "-copy"', () => {
    const exampleTemplate = {
      name: 'My Draft',
      id: 'my-draft'
    };
    const wrapper = subject({ template: exampleTemplate });

    expect(wrapper.find('[name="templateId"]').props().value).toEqual('my-draft-copy');
  });

  it('renders with an error message if the user does not type in a value for the draft name or for draft ID', () => {
    const wrapper = subject({ draft: { name: null }});
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
      templateName: '',
      templateId: ''
    });

    expect(wrapper.find('[name="templateName"]').props().error).toEqual('Please enter a template name.');
    expect(wrapper.find('[name="templateId"]').props().error).toEqual('Please enter a unique template ID.');
  });

<<<<<<< HEAD
  it('invokes the `createTemplate` prop on submit, shows an alert, and then invokes the `onClose` prop', () => {
    const promise = Promise.resolve();
    const mockCreateTemplate = jest.fn(() => promise);
    const mockOnClose = jest.fn();
    const mockShowAlert = jest.fn();
    const mockContent = {
      html: '<p>Some HTML.</p>'
    };
    const mockTemplate = {
      name: 'My template',
      id: 'my-template',
      options: {
        myOption: true
      },
      shared_with_subaccounts: false
    };
=======
  it('invokes "createTemplate" an "createSnippet" with relevant data on submit', () => {
    const createTemplatePromise = Promise.resolve();
    const createSnippetPromise = Promise.resolve();
    const mockCreateTemplate = jest.fn(() => createTemplatePromise);
    const mockCreateSnippet = jest.fn(() => createSnippetPromise);
>>>>>>> TR-1374-lemmon-flavor - Replace recipient list implementation with snippets implementation

    const wrapper = subject({
      onClose: mockOnClose,
      showAlert: mockShowAlert,
      createTemplate: mockCreateTemplate,
<<<<<<< HEAD
      template: mockTemplate,
      contentToDuplicate: mockContent
    });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.find('Loading')).toExist();

    expect(mockCreateTemplate).toHaveBeenCalledWith({
      name: 'My template (COPY)',
      id: 'my-template-copy',
      content: mockContent,
      options: mockTemplate.options,
      shared_with_subaccounts: mockTemplate.shared_with_subaccounts
    });

    return promise.then(() => {
      expect(mockOnClose).toHaveBeenCalled();
      expect(mockShowAlert).toHaveBeenCalledWith({
        type: 'success',
        message: 'Template duplicated.'
=======
      createSnippet: mockCreateSnippet
    });

    wrapper.find('form').simulate('submit');

    /* eslint-disable arrow-body-style */
    return createTemplatePromise.then(() => {
      return createSnippetPromise.then(() => {
        expect(mockCreateTemplate).toHaveBeenCalledWith({
          name: 'My Draft (COPY)',
          id: 'my-draft-copy',
          content: { text: 'my content' },
          options: { option1: true },
          shared_with_subaccounts: true
        });

        expect(mockCreateSnippet).toHaveBeenCalled({
          id: 'my-draft-copy',
          recipients: [{
            address: {
              email: 'sparkpost_templates_placeholder@sparkpost.com'
            },
            metadata: { meta: 'data' },
            substitution_data: { substitution: 'data' }
          }]
        });
>>>>>>> TR-1374-lemmon-flavor - Replace recipient list implementation with snippets implementation
      });
    });
  });
});
