import React from 'react';
import { shallow } from 'enzyme';
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
  const subject = (props) => shallow(
    <RecentActivity
      onToggleDeleteModal={jest.fn()}
      onToggleDuplicateModal={jest.fn()}
      {...props}
    />
  );

  it('renders an empty fragment when fewer than 2 templates are present', () => {
    const wrapper = subject({
      templates: [
        publishedTemplate,
        draftTemplate
      ]
    });

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
  });
});
