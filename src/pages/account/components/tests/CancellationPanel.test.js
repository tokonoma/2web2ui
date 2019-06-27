import React from 'react';
import { shallow } from 'enzyme';
import { CancellationPanel } from '../CancellationPanel';
import Brightback from 'src/components/brightback/Brightback';

describe('CancellationPanel', () => {
  let props;
  let wrapper;
  const getButton = (props = {}) => wrapper.find(Brightback).props().render(props);

  const subject = (props) => shallow(<CancellationPanel {...props}/>);
  beforeEach(() => {
    props = {
      account: {
        pending_cancellation: null
      },
      renewAccount: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      fetchAccount: jest.fn()
    };

    wrapper = shallow(<CancellationPanel {...props}/>);
  });

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders renew button when pending cancellation ', () => {
    props.account.pending_cancellation = { effective_date: '2019-07-20T00:00:00.000Z' };
    wrapper = subject(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('cancellation button goes to cancellation link when not enabled', () => {
    expect(getButton()).toMatchSnapshot();
  });

  it('cancellation button goes to brightback when enabled', () => {
    expect(getButton({ enabled: true, to: 'https://brightback.url' })).toMatchSnapshot();
  });

  it('refresh button renews account and retrieves new account state', async () => {
    props.account.pending_cancellation = { effective_date: '2019-07-20T00:00:00.000Z' };
    wrapper = subject(props);
    await wrapper.find('Button').simulate('click');
    expect(props.showAlert).toHaveBeenCalledWith({ type: 'success', message: 'Your account will not be cancelled.' });
    expect(props.renewAccount).toHaveBeenCalled();
    expect(props.fetchAccount).toHaveBeenCalled();

  });


});
