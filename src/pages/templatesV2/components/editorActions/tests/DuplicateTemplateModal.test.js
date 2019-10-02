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

  it('Renders the default value of the "templateName" `TextField` with the word `(COPY)` appended', () => {
    const exampleTemplate = {
      name: 'My Draft',
      id: 'my-draft'
    };
    const wrapper = subject({ template: exampleTemplate });

    expect(wrapper.find('[name="templateName"]').props().value).toEqual('My Draft (COPY)');
  });

  it('Renders the default value of the "templateId" `TextField` with the word "-copy"', () => {
    const exampleTemplate = {
      name: 'My Draft',
      id: 'my-draft'
    };
    const wrapper = subject({ template: exampleTemplate });

    expect(wrapper.find('[name="templateId"]').props().value).toEqual('my-draft-copy');
  });

  it('Renders with an error message if the user does not type in a value for the draft name or for draft ID', () => {
    const wrapper = subject({ template: { name: null }});
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn(),
      templateName: '',
      templateId: ''
    });

    expect(wrapper.find('[name="templateName"]').props().error).toEqual('Please enter a template name.');
    expect(wrapper.find('[name="templateId"]').props().error).toEqual('Please enter a unique template ID.');
  });
});
