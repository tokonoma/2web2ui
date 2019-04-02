import React from 'react';
import { shallow } from 'enzyme';

import { VerifyEmail } from '../VerifyEmail';

describe('VerifyEmail component', () => {
  const subject = (props) => {
    const baseProps = {
      id: 'xyz.com',
      verifyAbuse: jest.fn(() => Promise.resolve()),
      verifyMailbox: jest.fn(() => Promise.resolve()),
      verifyPostmaster: jest.fn(() => Promise.resolve()),
      showAlert: jest.fn(),
      verifyEmailLoading: false,
      subaccount: 'submarine',
      hasAnyoneAtEnabled: false
    };
    return shallow(<VerifyEmail {...baseProps} {...props} />);
  };

  it('should render with postmaster and abuse email verification', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('updates localpart onchange', () => {
    const wrapper = subject({ hasAnyoneAtEnabled: true });
    wrapper.find('#localPart').simulate('change', { currentTarget: { value: 'new-value' }});
    expect(wrapper.state('localPart')).toEqual('new-value');
  });

  it('validates localpart onblur', () => {
    const wrapper = subject({ hasAnyoneAtEnabled: true });
    wrapper.find('#localPart').simulate('blur', { currentTarget: { value: '' }});
    expect(wrapper.state('error')).toEqual('Required');
  });

  it('should render with mailbox verification', () => {
    const wrapper = subject({ hasAnyoneAtEnabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should send abuse-at email', () => {
    const wrapper = subject();
    wrapper.find('Button').at(1).simulate('click');
    expect(wrapper.instance().props.verifyAbuse).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should send postmaster-at email', () => {
    const wrapper = subject();
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.instance().props.verifyPostmaster).toHaveBeenCalledTimes(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should send custom mailbox email', () => {
    const wrapper = subject({ hasAnyoneAtEnabled: true });
    wrapper.setState({ localPart: 'krombopulos.michael' });

    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.instance().props.verifyMailbox).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().props.verifyMailbox).toHaveBeenCalledWith({
      id: wrapper.instance().props.id,
      mailbox: 'krombopulos.michael',
      subaccount: wrapper.instance().props.subaccount
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should error if custom mailbox field is invalid', () => {
    const wrapper = subject({ hasAnyoneAtEnabled: true });
    wrapper.find('Button').at(0).simulate('click');
    expect(wrapper.instance().props.verifyMailbox).not.toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('should disable the send button while sending', () => {
    const wrapper = subject({ submitting: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render success message', async () => {
    const wrapper = subject();
    await wrapper.instance().verifyWithPostmaster();

    expect(wrapper.instance().props.verifyPostmaster).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().props.showAlert).toHaveBeenCalledWith({ type: 'success', message: `Email sent to postmaster@${wrapper.instance().props.id}` });
    expect(wrapper).toMatchSnapshot();
  });
});
