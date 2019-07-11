import { shallow } from 'enzyme';
import React from 'react';
import { AlertDetails } from '../AlertDetails';

describe('Alert Details Component', () => {

  it('should render the alert details component correctly', () => {
    const props = {
      alert: {
        name: 'My Alert Name',
        metric: 'health_score',
        channels: { emails: ['Myemail@email.com']},
        filters: [{ filter_type: 'mailbox_provider', filter_values: ['gmail']}],
        subaccounts: [-1],
        any_subaccount: false,
        muted: false
      },
      id: 'alert-id',
      subaccountIdToString: jest.fn((a) => a)
    };

    const wrapper = shallow(<AlertDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
