import { shallow } from 'enzyme';
import React from 'react';

import TestContent from '../TestContent';


describe('Inbox Placement Test Content', () => {
  const mockDetails = {
    subject: 'foo',
    message_size: 2580,
    from_address: 'foo@bar.com'
  };
  const mockContent = {
    raw_message: 'The Raw message',
    html: '<div>Cool HTML!</div>',
    text: 'Cool Text!',
    amp: 'Cool AMP!',
    headers: 'Some: Headers'
  };

  const props = {
    details: mockDetails,
    content: mockContent
  };

  it('renders page correctly with defaults', () => {
    const wrapper = shallow(<TestContent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

