import { shallow, mount } from 'enzyme';
import React from 'react';

import TestContent from '../TestContent';


describe('Component: TestContent', () => {
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

  it('changes tabs correctly', () => {
    const wrapper = mount(<TestContent {...props} />);
    expect(wrapper.find('Tabs').prop('selected')).toEqual(0);
    wrapper.find('Tab').last().simulate('click');
    expect(wrapper.find('Tabs').prop('selected')).toEqual(4);
  });
});

