import { shallow } from 'enzyme';
import React from 'react';
import AlertIncidents from '../AlertIncidents';

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

  const incidents = [
    {
      first_fired: '2019-08-06T21:00:00.000Z',
      last_fired: '2019-08-06T21:00:00.000Z',
      status: 'Resovled',
      triggered_value: 30,
      filters: {}
    },
    {
      first_fired: '2019-08-06T21:00:00.000Z',
      last_fired: '2019-08-06T21:00:00.000Z',
      status: 'Active',
      triggered_value: 30,
      filters: {}
    }
  ];

  const defaultProps = {
    alert,
    incidents,
    subaccountIdToString: jest.fn((a) => a)
  };

  const subject = (props = {}) => shallow(
    <AlertIncidents
      {...defaultProps}
      {...props}
    />
  );

  it('renders empty when no incidents', () => {
    expect(subject({ incidents: []}).find('Empty')).toExist();
  });

  it('renders table with an incident', () => {
    expect(subject().find('TableCollection')).toExist();
  });

});
