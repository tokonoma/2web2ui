import { shallow } from 'enzyme';
import React from 'react';
import { DataPrivacyPage } from '../DataPrivacyPage';
import ApiDetailsTab from '../components/ApiDetailsTab';

describe('Page: Recipient Email Verification', () => {
  const defaultProps = {
    history: {
      replace: jest.fn(),
    },
  };

  const subject = props => {
    return shallow(<DataPrivacyPage {...defaultProps} {...props} />);
  };

  it('renders Api tab correctly', () => {
    const props = {
      match: {
        params: { category: 'api' },
      },
    };
    const wrapper = subject(props);
    expect(wrapper.find(ApiDetailsTab)).toExist();
  });
});
