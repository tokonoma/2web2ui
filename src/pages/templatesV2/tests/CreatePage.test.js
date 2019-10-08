import React from 'react';
import { shallow } from 'enzyme';

import CreatePage from '../CreatePage';

describe('CreatePage', () => {
  const subject = (props = {}) => shallow(
    <CreatePage
      loading={false}
      submitting={false}
      pristine={true}
      handleSubmit={(handler) => handler}
      listDomains={jest.fn()}
      history={{ push: jest.fn() }}
      showAlert={jest.fn()}
      createSnippet={jest.fn()}
      {...props}
    />
  );

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders correctly on loading', () => {
    expect(subject({ loading: true }).find('Loading')).toExist();
  });

  it('loads domains on load', () => {
    const mockListDomains = jest.fn();
    subject({ listDomains: mockListDomains });
    expect(mockListDomains).toHaveBeenCalledTimes(1);
  });

  describe('Submit button', () => {
    it('renders disable states correctly', () => {
      expect(subject({ submitting: true, pristine: false, valid: true }).find('Button').prop('disabled')).toBe(true);
      expect(subject({ submitting: false, pristine: true, valid: true }).find('Button').prop('disabled')).toBe(true);
      expect(subject({ submitting: false, pristine: false, valid: false }).find('Button').prop('disabled')).toBe(true);
    });

    it('renders enabled states correctly', () => {
      expect(subject({ submitting: false, pristine: false, valid: true }).find('Button').prop('disabled')).toBe(false);
    });
  });

  describe('handleCreate', () => {
    it('calls "create" and "createSnippet" with form data when submitting', () => {
      const mockCreate = jest.fn(() => Promise.resolve());
      const mockCreateSnippet = jest.fn(() => Promise.resolve());
      const formData = {
        name: 'Foo',
        id: 'foo',
        content: {}
      };
      const wrapper = subject({
        create: mockCreate,
        createSnippet: mockCreateSnippet,
        history: { push: jest.fn() }
      });
      wrapper.find('form').simulate('submit', formData);
      expect(mockCreate).toHaveBeenCalledWith({
        ...formData,
        content: {
          ...formData.content,
          text: ''
        }
      });
      expect(mockCreateSnippet).toHaveBeenCalledWith({
        id: formData.id,
        recipients: [{
          address: {
            email: 'sparkpost_templates_placeholder@sparkpost.com'
          },
          metadata: {},
          substitution_data: {}
        }]
      });
    });

    it('alerts & redirects to edit page', async () => {
      const mockPush = jest.fn();
      const mockAlert = jest.fn();
      const createPromise = Promise.resolve();
      const createSnippetPromise = Promise.resolve();
      const wrapper = subject({
        create: jest.fn(() => createPromise),
        createSnippet: jest.fn(() => createSnippetPromise),
        history: { push: mockPush }, showAlert: mockAlert
      });

      wrapper.find('form').simulate('submit', { id: 'foo', content: {}});

      /* eslint-disable arrow-body-style */
      return createPromise.then(() => {
        return createSnippetPromise.then(() => {
          expect(mockPush).toHaveBeenCalledWith('/templatesv2/edit/foo/draft/content');
          expect(mockAlert).toHaveBeenCalledWith({ type: 'success', message: 'Template Created.' });
        });
      });
      /* eslint-enable arrow-body-style */
    });
  });
});
