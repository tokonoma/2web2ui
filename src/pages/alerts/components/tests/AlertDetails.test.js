import { shallow } from 'enzyme';
import React from 'react';
import { AlertDetails } from '../AlertDetails';

describe('Alert Details Component', () => {

  const alert = {
    name: 'My Alert Name',
    metric: 'health_score',
    channels: {
      emails: ['Myemail@email.com', 'email@ddress.com'],
      slack: { target: 'https://hooks.slack.com/services/X' },
      webhook: { target: 'target.com/200' }
    },
    filters: [{ filter_type: 'mailbox_provider', filter_values: ['gmail']}],
    threshold_evaluator: { source: 'raw', operator: 'lt', value: 80 },
    subaccounts: [-1],
    any_subaccount: false,
    muted: false
  };
  const props = {
    alert,
    id: 'alert-id',
    subaccountIdToString: jest.fn((a) => a)
  };

  it('should render the alert details component correctly', () => {
    const wrapper = shallow(<AlertDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show Any Subaccount tag in the subaccounts field if no subaccounts and any_subaccount is true', () => {
    const newAlert = { ...alert, subaccounts: [], any_subaccount: true };
    const wrapper = shallow(<AlertDetails {...props} alert={newAlert} />);
    expect(wrapper.findWhere((node) => node.text() === 'Any Subaccount')).toExist();
  });

  it('should prepend change to the operator when source is WOW change', () => {
    const newAlert = { ...alert, threshold_evaluator: { source: 'week_over_week', operator: 'gt', value: 5 }};
    const wrapper = shallow(<AlertDetails {...props} alert={newAlert} />);
    expect(wrapper.findWhere((node) => node.text() === 'change above')).toExist();
  });

  it('should show % in suffix when source is WOW change', () => {
    const newAlert = { ...alert, threshold_evaluator: { source: 'week_over_week', operator: 'gt', value: 5 }};
    const wrapper = shallow(<AlertDetails {...props} alert={newAlert} />);
    expect(wrapper.findWhere((node) => node.text() === '%')).toExist();
  });

  it('should show only email tags when email is the only channel', () => {
    const newAlert = { ...alert, channels: { emails: ['Myemail@email.com', 'email@ddress.com']}};
    const wrapper = shallow(<AlertDetails {...props} alert={newAlert} />);
    expect(wrapper.find('EmailIcon')).toExist();
    expect(wrapper.find('SlackIcon')).not.toExist();
    expect(wrapper.find('WebhookIcon')).not.toExist();
  });

  it('should show other channels even if emails are not present', () => {
    const newAlert = { ...alert, channels: { slack: { target: 'myslackTarget' }}};
    const wrapper = shallow(<AlertDetails {...props} alert={newAlert} />);
    expect(wrapper.find('EmailIcon')).not.toExist();
    expect(wrapper.find('SlackIcon')).toExist();
  });
});
