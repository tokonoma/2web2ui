import React from 'react';
import { shallow } from 'enzyme';
import getConfig from 'src/helpers/getConfig';
import BounceSetupInstructionPanel from '../BounceSetupInstructionPanel';

jest.mock('src/helpers/getConfig');

describe('BounceSetupInstructionPanel', () => {
  const subject = (props = {}) => shallow(
    <BounceSetupInstructionPanel
      domain={{
        id: 'example.com',
        subaccount_id: 'sub-example',
        status: {
          cname_status: 'unverified'
        }
      }}
      hasAutoVerifyEnabled={false}
      isByoipAccount={false}
      loading={false}
      showAlert={() => {}}
      verify={() => {}}
      {...props}
    />
  );

  beforeEach(() => {
    getConfig.mockImplementation(() => ({ cnameValue: 'spark.mail' }));
  });

  it('renders cname setup instructions', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders cname setup instructions as verified', () => {
    const wrapper = subject({ domain: { status: { cname_status: 'valid' }}});
    expect(wrapper).toHaveProp('isVerified', true);
  });

  it('renders mx setup instructions when type is selected', () => {
    const wrapper = subject({ isByoipAccount: true });

    wrapper
      .find('Select') // select[name="select-bounce-verification-type"]')
      .simulate('change', { currentTarget: { value: 'MX' }});

    expect(wrapper).toHaveProp('recordType', 'MX');
  });

  it('renders mx setup instructions for previously setup BYOIP customer', () => {
    const wrapper = subject({ domain: { id: 'mx.com', status: { mx_status: 'valid' }}, isByoipAccount: true });

    expect(wrapper).toHaveProp('isVerified', true);
    expect(wrapper).toHaveProp('recordType', 'MX');
  });

  it('calls onVerify handler and shows success alert', async () => {
    const showAlert = jest.fn();
    const verify = jest.fn(() => Promise.resolve({ cname_status: 'valid' }));
    const wrapper = subject({ showAlert, verify });

    await wrapper.simulate('verify');

    expect(verify).toHaveBeenCalledWith({
      id: 'example.com',
      subaccount: 'sub-example',
      type: 'cname'
    });
    expect(showAlert).toHaveBeenCalledWith({
      type: 'success',
      message: expect.stringMatching(/verified CNAME record of example.com/)
    });
  });

  it('calls onVerify handler and shows error alert', async () => {
    const showAlert = jest.fn();
    const verify = jest.fn(() => Promise.resolve({
      cname_status: 'unverified',
      dns: { cname_error: 'Oh no!' }
    }));
    const wrapper = subject({ showAlert, verify });

    await wrapper.simulate('verify');

    expect(verify).toHaveBeenCalledWith({
      id: 'example.com',
      subaccount: 'sub-example',
      type: 'cname'
    });
    expect(showAlert).toHaveBeenCalledWith({
      type: 'error',
      message: expect.stringMatching(/verify CNAME record of example.com/),
      details: 'Oh no!'
    });
  });
});
