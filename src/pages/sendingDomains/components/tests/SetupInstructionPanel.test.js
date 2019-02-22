import React from 'react';
import { shallow } from 'enzyme';
import SetupInstructionPanel from '../SetupInstructionPanel';

describe('SetupInstructionPanel', () => {
  const subject = (props = {}) => shallow(
    <SetupInstructionPanel
      recordType="CNAME"
      verifyButtonIdentifier="my-verify-button"
      {...props}
    >
      <p>
        enter panel contents here...
      </p>
    </SetupInstructionPanel>
  );

  const titleFactory = (wrapper) => shallow(wrapper.prop('title'));

  it('renders panel and children', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls onVerify when verify button is clicked', () => {
    const onVerify = jest.fn();
    const wrapper = subject({ onVerify });
    wrapper.prop('actions')[0].onClick();
    expect(onVerify).toHaveBeenCalled();
  });

  it('disables verify button when verifying', () => {
    const wrapper = subject({ isVerifying: true });
    expect(wrapper).toHaveProp('actions', [expect.objectContaining({ disabled: true })]);
  });

  describe('when verified', () => {
    const wrapper = subject({ isVerified: true });

    it('renders a re-verify button', () => {
      expect(wrapper).toHaveProp('actions', [
        expect.objectContaining({ content: 'Re-verify CNAME Record' })
      ]);
    });

    it('renders a verified icon', () => {
      const titleWrapper = titleFactory(wrapper);
      expect(titleWrapper.find('VerifiedIcon')).toExist();
    });
  });

  describe('when auto verify is enabled', () => {
    const wrapper = subject({ isAutoVerified: true });

    it('hides verify button', () => {
      expect(wrapper).toHaveProp('actions', []);
    });

    it('renders a auto-verified icon', () => {
      const titleWrapper = titleFactory(wrapper);
      expect(titleWrapper.find('AutoVerifiedIcon')).toExist();
    });
  });
});
