import React from 'react';
import { shallow } from 'enzyme';
import { SupportTicketLink } from '../SupportTicketLink';

describe('SupportTicketLink', () => {
  const subject = props =>
    shallow(
      <SupportTicketLink issueId="general_issue" {...props}>
        Help!
      </SupportTicketLink>,
    );

  it('renders a link', () => {
    expect(subject()).toHaveTextContent('Help!');
  });

  it('ignores to prop', () => {
    const wrapper = subject({ to: '/paradise' });
    expect(wrapper).not.toHaveProp('to');
  });

  it('sets a11y props', () => {
    const wrapper = subject();

    expect(wrapper).toHaveProp('href');
    expect(wrapper).toHaveProp('role');
  });

  it('opens support ticket form', () => {
    const openSupportTicketForm = jest.fn();
    const wrapper = subject({ issueId: 'my_issue', message: 'Help me!', openSupportTicketForm });

    wrapper.simulate('click');

    expect(openSupportTicketForm).toHaveBeenCalledWith({
      issueId: 'my_issue',
      message: 'Help me!',
    });
  });
});
