import { shallow } from 'enzyme';
import React from 'react';
import ApiDetailsTab from '../ApiDetailsTab';

describe('Page: Recipient Email Verification', () => {
  const defaultProps = {
    history: {
      replace: jest.fn(),
    },
  };

  const subject = () => {
    return shallow(<ApiDetailsTab {...defaultProps} />);
  };

  it('renders Generate Key Button', () => {
    const wrapper = subject();
    expect(wrapper.find({ children: 'Generate key' })).toExist();
  });

  it('renders a link to api documentation for data privacy', () => {
    const wrapper = subject();
    expect(wrapper.find({ href: 'https://developers.sparkpost.com/api/data-privacy' })).toExist();
  });
});
