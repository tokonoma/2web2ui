import { shallow } from 'enzyme';
import React from 'react';
import { AlertDetails } from '../AlertDetails';

describe('Alert Details Component', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      alert: {
        name: 'My Alert Name',
        metric: 'health_score',
        channels: { email: 'Myemail@email.com' },
        filters: [{ filter_type: 'mailbox_provider', filter_values: ['gmail']}],
        subaccounts: [-1],
        any_subaccount: false,
        muted: false
      },
      id: 'alert-id',
      subaccountIdToString: jest.fn((a) => a)
    };

    wrapper = shallow(<AlertDetails {...props} />);
  });

  it('should render the alert details component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
