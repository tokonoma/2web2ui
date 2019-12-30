import React from 'react';
import { shallow } from 'enzyme';
import { SendMoreCTA } from '../SendMoreCTA';

describe('SendMoreCTA Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      verifyEmail: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(() => Promise.resolve()),
      openSupportTicketForm: jest.fn(),
    };

    wrapper = shallow(<SendMoreCTA {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders learn more about sending limits link', () => {
    wrapper.setProps({ hasSendingLimits: true });

    expect(wrapper.findWhere(node => node.text() === 'Learn more about these limits.')).toExist();
  });
});
