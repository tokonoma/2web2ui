import React from 'react';
import { shallow, mount } from 'enzyme';
import RecentActivity from '../RecentActivity';

describe('RecentActivity', () => {
  const publishedTemplate = {
    id: 'template-1',
    name: 'Template 1',
    last_update_time: '2019-10-18T17:30:49+00:00',
    list_status: 'published'
  };
  const publishedWithDraftTemplate = {
    id: 'template-2',
    name: 'Template 2',
    last_update_time: '2019-10-18T17:30:49+00:00',
    list_status: 'published_with_draft'
  };
  const draftTemplate = {
    id: 'template-3',
    name: 'Template 3',
    last_update_time: '2019-10-18T17:30:49+00:00',
    list_status: 'draft'
  };
  const subject = (props, isShallow = true) => {
    if (isShallow) {
      return shallow(
        <RecentActivity
          onToggleDeleteModal={jest.fn()}
          onToggleDuplicateModal={jest.fn()}
          {...props}
        />
      );
    }

    return mount(
      <RecentActivity
        onToggleDeleteModal={jest.fn()}
        onToggleDuplicateModal={jest.fn()}
        {...props}
      />
    );
  };

  it('renders an empty fragment when fewer than 2 templates are present', () => {
    const wrapper = subject({
      templates: [
        publishedTemplate,
        draftTemplate
      ]
    }, false);

    expect(wrapper).not.toHaveTextContent('Recent Activity');
  });

  it('renders when there are more than 2 templates', () => {
    const wrapper = subject({
      templates: [
        publishedWithDraftTemplate,
        publishedTemplate,
        draftTemplate
      ]
    });

    expect(wrapper).toHaveTextContent('Recent Activity');
    expect(wrapper).toHaveTextContent(publishedWithDraftTemplate.name);
    expect(wrapper).toHaveTextContent(publishedTemplate.name);
    expect(wrapper).toHaveTextContent(draftTemplate.name);
  });

  it('renders a maximum of four templates when more than four are present', () => {
    const wrapper = subject({
      templates: [
        publishedWithDraftTemplate,
        publishedTemplate,
        draftTemplate,
        draftTemplate,
        draftTemplate
      ]
    });

    expect(wrapper.find('Panel').length).toBe(4);
  });

  it('invokes the `onToggleDuplicateModal` propr when `DuplicateAction` is clicked', () => {
    const mockToggleDeleteModal = jest.fn();
    const mockToggleDuplicateModal = jest.fn();

    const wrapper = subject({
      templates: [
        publishedWithDraftTemplate,
        publishedTemplate,
        draftTemplate,
        draftTemplate
      ],
      onToggleDeleteModal: mockToggleDeleteModal,
      onToggleDuplicateModal: mockToggleDuplicateModal
    });

    wrapper.find('DuplicateAction').first().simulate('click');
    wrapper.find('DeleteAction').first().simulate('click');

    expect(mockToggleDeleteModal).toHaveBeenCalled();
    expect(mockToggleDuplicateModal).toHaveBeenCalled();
  });
});
