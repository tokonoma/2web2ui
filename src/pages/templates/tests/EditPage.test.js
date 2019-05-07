import React from 'react';
import { shallow } from 'enzyme';
import EditPage from '../EditPage';
import ImportSnippetLink from '../components/ImportSnippetLink';

describe('EditPage', () => {
  const subject = (props = {}) => {
    // formValues and template must be same on mount
    const template = props.template || { id: 'test-template' };

    return shallow(
      <EditPage
        getDraft={() => {}}
        getTestData={() => {}}
        formValues={template}
        handleSubmit={(fn) => fn}
        isFormValid={true}
        loading={false}
        match={{
          params: {
            id: 'test-template'
          }
        }}
        subaccountId={123}
        template={template}
        {...props}
      />
    );
  };

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });

  it('calls getDraft on mount', () => {
    const getDraft = jest.fn();
    subject({ getDraft });
    expect(getDraft).toHaveBeenCalledWith('test-template', 123);
  });

  it('calls getTestData on mount', () => {
    const getTestData = jest.fn();
    subject({ getTestData });
    expect(getTestData).toHaveBeenCalledWith({ id: 'test-template', mode: 'draft' });
  });

  it('redirect and displays error message on loading error', () => {
    const historyPush = jest.fn();
    const showAlert = jest.fn();
    const wrapper = subject({ history: { push: historyPush }, showAlert });

    wrapper.setProps({ getDraftError: new Error('Oh no!') });

    expect(showAlert).toHaveBeenCalledWith(expect.objectContaining({ type: 'error' }));
    expect(historyPush).toHaveBeenCalledWith('/templates');
  });

  it('renders primary action', () => {
    const wrapper = subject({ canModify: true });
    expect(wrapper).toHaveProp('primaryAction', expect.objectContaining({ content: 'Publish Template' }));
  });

  it('renders disabled primary action', () => {
    const wrapper = subject({ canModify: true, submitting: true });
    expect(wrapper).toHaveProp('primaryAction', expect.objectContaining({ disabled: true }));
  });

  it('redirects and displays success message when template is published', async () => {
    const historyPush = jest.fn();
    const publish = jest.fn(() => Promise.resolve());
    const showAlert = jest.fn();
    const wrapper = subject({ canModify: true, history: { push: historyPush }, publish, showAlert });
    const values = {
      name: 'Test Template',
      published: false
    };

    await wrapper.prop('primaryAction').onClick(values);

    expect(publish).toHaveBeenCalledWith({ name: 'Test Template' }, 123);
    expect(historyPush).toHaveBeenCalledWith('/templates/edit/test-template/published?subaccount=123');
    expect(showAlert).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('disabled secondary actions when submitting', () => {
    const wrapper = subject({ canModify: true, submitting: true, template: { has_published: true }});
    const actions = wrapper.prop('secondaryActions');

    expect(actions).toHaveLength(5);
    expect(actions.every((action) => action.disabled)).toEqual(true);
  });

  it('redirects to published version', () => {
    const historyPush = jest.fn();
    const wrapper = subject({
      history: { push: historyPush },
      template: {
        content: {
          html: '<h1>Test Template</h1>'
        },
        has_published: true,
        id: 'test-template'
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'View Published')
      .onClick();

    expect(historyPush).toHaveBeenCalledWith('/templates/edit/test-template/published?subaccount=123');
  });

  it('displays success message when saved', async () => {
    const showAlert = jest.fn();
    const update = jest.fn(() => Promise.resolve());
    const wrapper = subject({ canModify: true, showAlert, update });

    await wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Save as Draft')
      .onClick({ id: 'test-template', published: true });

    expect(update).toHaveBeenCalledWith({ id: 'test-template' }, 123);
    expect(showAlert).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('opens delete confirmation modal', () => {
    const wrapper = subject({ canModify: true });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Delete')
      .onClick();

    expect(wrapper.find('DeleteModal')).toHaveProp('open', true);
  });

  it('closes delete confirmation modal when cancel button is clicked', () => {
    const wrapper = subject({ canModify: true });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Delete')
      .onClick();

    wrapper.find('DeleteModal').simulate('cancel');

    expect(wrapper.find('DeleteModal')).toHaveProp('open', false);
  });

  it('redirects to templates page and displays success messsage when deletion is confirmed', async () => {
    const deleteTemplate = jest.fn(() => Promise.resolve());
    const historyPush = jest.fn();
    const showAlert = jest.fn();
    const wrapper = subject({
      canModify: true,
      deleteTemplate,
      history: { push: historyPush },
      showAlert
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Delete')
      .onClick();

    await wrapper.find('DeleteModal').simulate('delete');

    expect(deleteTemplate).toHaveBeenCalledWith('test-template', 123);
    expect(historyPush).toHaveBeenCalledWith('/templates');
    expect(showAlert).toHaveBeenCalledWith(expect.objectContaining({ type: 'success' }));
  });

  it('redirects to duplicate page', () => {
    const historyPush = jest.fn();
    const wrapper = subject({
      canModify: true,
      history: { push: historyPush },
      template: {
        content: {
          html: '<h1>Test Template</h1>'
        },
        id: 'test-template'
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Duplicate')
      .onClick();

    expect(historyPush).toHaveBeenCalledWith('/templates/create/test-template');
  });

  it('redirects to preview page', async () => {
    const historyPush = jest.fn();
    const setTestData = jest.fn(() => Promise.resolve());
    const testData = {};
    const wrapper = subject({
      history: { push: historyPush },
      template: {
        content: {
          html: '<h1>Test Template</h1>'
        },
        id: 'test-template',
        testData: {}
      },
      setTestData
    });

    await wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Preview')
      .onClick();

    expect(setTestData).toHaveBeenCalledWith({ id: 'test-template', mode: 'draft', data: testData });
    expect(historyPush).toHaveBeenCalledWith('/templates/preview/test-template?subaccount=123');
  });

  it('displays preview and send when user has permission to send', () => {
    const wrapper = subject({ canSend: true });

    expect(wrapper.prop('secondaryActions'))
      .toContainEqual(expect.objectContaining({ content: 'Preview & Send' }));
  });

  it('displays snippet link when user has permission to modify', () => {
    const wrapper = subject({ canModify: true });
    expect(wrapper.find('ContentEditor')).toHaveProp('action', <ImportSnippetLink />);
  });

  it('opens unsaved changes action modal and displays list of dirty fields', () => {
    const template = {
      content: {
        html: '<h1>Test Template</h1>'
      },
      id: 'test-template'
    };
    const wrapper = subject({ canModify: true, template });

    // update content
    wrapper.setProps({
      formValues: {
        ...template,
        content: {
          html: '<h1>Updated Test Template</h1>',
          text: 'Updated Test Template'
        }
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Duplicate')
      .onClick();

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', true);
    expect(wrapper.find('ActionsModal').prop('content')).toMatchSnapshot();
  });

  it('closes unsaved changes action modal', () => {
    const template = {
      content: {
        html: '<h1>Test Template</h1>'
      },
      id: 'test-template'
    };
    const wrapper = subject({ canModify: true, template });

    // update content
    wrapper.setProps({
      formValues: {
        ...template,
        content: {
          html: '<h1>Updated Test Template</h1>'
        }
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Duplicate')
      .onClick();

    wrapper
      .find('ActionsModal')
      .simulate('cancel');

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', false);
  });

  it('continues to duplicate page without saving changes', () => {
    const historyPush = jest.fn();
    const update = jest.fn();
    const template = {
      content: {
        html: '<h1>Test Template</h1>'
      },
      id: 'test-template'
    };
    const wrapper = subject({ canModify: true, history: { push: historyPush }, template, update });

    wrapper.setProps({
      formValues: {
        ...template,
        content: {
          html: '<h1>Updated Test Template</h1>'
        }
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Duplicate')
      .onClick();

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', true);

    wrapper
      .find('ActionsModal')
      .prop('actions')
      .find((action) => action.content === 'Continue Without Saving')
      .onClick();

    expect(update).not.toHaveBeenCalled();
    expect(historyPush).toHaveBeenCalledWith('/templates/create/test-template');
  });

  it('saves then continues to duplicate page', async () => {
    const historyPush = jest.fn();
    const showAlert = jest.fn();
    const update = jest.fn(() => Promise.resolve());
    const template = {
      content: {
        html: '<h1>Test Template</h1>'
      },
      id: 'test-template'
    };
    const wrapper = subject({
      canModify: true,
      history: { push: historyPush },
      template,
      showAlert,
      update
    });

    wrapper.setProps({
      formValues: {
        ...template,
        content: {
          html: '<h1>Updated Test Template</h1>'
        }
      }
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'Duplicate')
      .onClick();

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', true);

    await wrapper
      .find('ActionsModal')
      .prop('actions')
      .find((action) => action.content === 'Save as Draft and Continue')
      .onClick();

    expect(update).toHaveBeenCalled();
    expect(showAlert).toHaveBeenCalled();
    expect(historyPush).toHaveBeenCalledWith('/templates/create/test-template');
  });

  it('hides cancel button in unsaved changes action modal when form is invalid', () => {
    const wrapper = subject({
      isFormValid: false
    });

    expect(wrapper.find('ActionsModal')).toHaveProp('onCancel', undefined);
  });

  it('displays custom instructions in unsaved changes modal when form is invalid', () => {
    const wrapper = subject({
      isFormValid: false
    });

    expect(wrapper.find('ActionsModal').prop('content')).toMatchSnapshot();
  });

  it('closes unsaved changes action modal when keep editing button is clicked', async () => {
    const template = {
      content: {
        html: '<h1>Test Template</h1>'
      },
      id: 'test-template'
    };
    const wrapper = subject({ template });

    wrapper.setProps({
      formValues: { ...template, content: { html: '' }},
      isFormValid: false
    });

    wrapper
      .prop('secondaryActions')
      .find((action) => action.content === 'View Published')
      .onClick();

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', true);

    await wrapper
      .find('ActionsModal')
      .prop('actions')
      .find((action) => action.content === 'Keep Editing')
      .onClick();

    expect(wrapper.find('ActionsModal')).toHaveProp('isOpen', false);
  });
});
