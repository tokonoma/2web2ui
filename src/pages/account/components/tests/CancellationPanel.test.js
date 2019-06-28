import React from 'react';
import { shallow } from 'enzyme';
import { CancellationPanel } from '../CancellationPanel';
import Brightback from 'src/components/brightback/Brightback';

describe('CancellationPanel', () => {
  const accountPendingCancellation = {
    pending_cancellation: { effective_date: '2019-07-20T00:00:00.000Z' }
  };
  const subject = (props) => shallow(<CancellationPanel
    account={{ pending_cancellation: null }}
    renewAccount = {() => {}}
    showAlert = {() => {}}
    fetchAccount = {() => {}}
    {...props}/>);

  const getButton = ({ wrapper = subject(), enabled = false, to = '' }) => wrapper
    .find(Brightback)
    .renderProp('render')({ enabled, to });

  it('renders', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders renew button when pending cancellation ', () => {
    expect(subject({ account: accountPendingCancellation })
      .find('Button')
      .prop('children')).toEqual(expect.stringMatching(/Don't cancel my account/));
  });

  it('cancellation button goes to cancellation link when not enabled', () => {
    expect(getButton({ enabled: false }).prop('to')).toEqual('/account/cancel');
  });

  it('cancellation button goes to brightback when enabled', () => {
    const bbUrl = 'https://brightback.url';
    expect(getButton({ enabled: true, to: bbUrl }).prop('to')).toEqual(bbUrl);
  });

  it('refresh button renews account and retrieves new account state', async () => {
    const renewAccount = jest.fn(() => Promise.resolve());
    const showAlert = jest.fn();
    const fetchAccount = jest.fn();

    const wrapper = subject({
      account: accountPendingCancellation,
      renewAccount,
      showAlert,
      fetchAccount
    });
    await wrapper.find('Button').simulate('click');
    expect(showAlert).toHaveBeenCalledWith({ type: 'success', message: 'Your account will not be cancelled.' });
    expect(renewAccount).toHaveBeenCalled();
    expect(fetchAccount).toHaveBeenCalled();
  });
});
