import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import { IpForm } from '../IpForm';

describe('IP Form tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      submitting: false,
      ip: {
        hostname: 'abcd.com'
      },
      pools: [],
      pool: null,
      change: jest.fn()
    };

    wrapper = shallow(<IpForm {...props} />);
  });

  it('should render form', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('disables field when submitting', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Field[name="ip_pool"]').prop('disabled')).toBe(true);
  });

  it('changes button texts to saving while submitting', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').shallow().text()).toEqual('Saving');
  });

  it('invokes onSubmit on submit button click', () => {
    const formData = { ip_pool: 'abc', auto_warmup_enabled: true, auto_warmup_stage: 1 };
    wrapper.find('form').simulate('submit', formData);
    expect(props.handleSubmit).toHaveBeenCalledWith(formData);
  });

  it('disables submit button when saving', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').prop('disabled')).toBe(true);
  });

  it('changes submit button text when saving', () => {
    wrapper.setProps({ submitting: true });
    expect(wrapper.find('Button').shallow().text()).toEqual('Saving');
  });

  describe('auto_warmup_enabled', () => {
    it('shows reconfirmation modal when ip warmup is going to enabled', async () => {
      wrapper.setState({ warningModal: true });
      wrapper.setProps({ ipAutoWarmupEnabled: true });
      expect(wrapper.find('ConfirmationModal')).toMatchSnapshot();
    });

    it('shows reconfirmation modal when ip warmup is going to disabled', () => {
      wrapper.setState({ warningModal: true });
      wrapper.setProps({ ipAutoWarmupEnabled: false });
      expect(wrapper.find('ConfirmationModal')).toMatchSnapshot();
    });

    it('gets re-enabled if not disabling was not confirmed from modal', () => {
      wrapper.setProps({ ipAutoWarmupEnabled: true });
      wrapper.find('ConfirmationModal').prop('onCancel')();
      expect(wrapper.state('warningModal')).toBe(false);
      expect(props.change).toHaveBeenCalledWith('auto_warmup_enabled', false);
    });

    it('gets re-disabled if not enabling was not confirmed from modal', () => {
      wrapper.setProps({ ipAutoWarmupEnabled: false });
      wrapper.find('ConfirmationModal').prop('onCancel')();
      expect(wrapper.state('warningModal')).toBe(false);
      expect(props.change).toHaveBeenCalledWith('auto_warmup_enabled', true);
    });
  });

  describe('auto_warmup_stage', () => {
    let componentSelector;
    beforeEach(() => {
      componentSelector = 'Field[name="auto_warmup_stage"]';
    });
    it('is not rendered when ip warmup is not enabled', () => {
      wrapper.find('Field[name="auto_warmup_enabled"]').simulate('change');
      expect(wrapper.find(componentSelector)).not.toExist();
    });

    it('disables stages beyond current stage', () => {
      wrapper.setProps({ ipAutoWarmupEnabled: true, ip: { auto_warmup_stage: 2 }, maxStages: 5 });
      expect(wrapper.find(componentSelector).prop('options')).toMatchSnapshot();
    });

    it('enables only stage 1 after enabling', () => {
      wrapper.setProps({ ipAutoWarmupEnabled: true, maxStages: 3 });
      const options = wrapper.find(componentSelector).prop('options');
      expect(_.map(options, (option) => option.disabled)).toEqual([false, true, true]);
    });
  });

});
