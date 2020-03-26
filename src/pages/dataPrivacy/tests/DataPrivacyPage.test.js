import { shallow } from 'enzyme';
import React from 'react';
import { DataPrivacyPage } from '../DataPrivacyPage';
import ApiDetailsTab from '../components/ApiDetailsTab';
import SingleRecipientTab from '../components/SingleRecipientTab';

describe('Page: Recipient Email Verification', () => {
  const defaultProps = {
    history: {
      replace: jest.fn(),
    },
    resetDataPrivacy: jest.fn(),
  };

  const subject = props => {
    return shallow(<DataPrivacyPage {...defaultProps} {...props} />);
  };

  it('renders Single Recipient tab correctly', () => {
    const props = {
      match: {
        params: { category: 'single-recipient' },
      },
    };
    const wrapper = subject(props);
    expect(wrapper.find(SingleRecipientTab)).toExist();
  });

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
