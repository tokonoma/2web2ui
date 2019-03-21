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
        status: {}
      }}
      hasAutoVerifyEnabled={false}
      id="example.com"
      onVerify={() => {}}
      verifyCnameLoading={false}
      {...props}
    />
  );

  beforeEach(() => {
    getConfig.mockImplementation(() => ({ cnameValue: 'spark.mail' }));
  });

  it('renders cname setup instructions', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls onVerify handler', () => {
    const onVerify = jest.fn();
    const wrapper = subject({ onVerify });

    wrapper
      .find('SetupInstructionPanel[recordType="CNAME"]')
      .simulate('verify');

    expect(onVerify).toHaveBeenCalled();
  });
});
