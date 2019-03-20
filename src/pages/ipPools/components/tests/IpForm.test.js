import { shallow } from 'enzyme';
import React from 'react';
import _ from 'lodash';
import { IpForm } from '../IpForm';
import * as constants from '../../constants';

describe('IP Form tests', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    constants.IP_WARMUP_STAGES = [
      { name: 'Stage 1', id: 1, volume: 200 },
      { name: 'Stage 2', id: 2, volume: 500 },
      { name: 'Stage 3', id: 3, volume: 1000 }
    ];

    props = {
      handleSubmit: jest.fn(),
      onSubmit: jest.fn(),
      submitting: false,
      ip: {
        hostname: 'abcd.com'
      },
      pools: [],
      pool: null,
      change: jest.fn(),
      isAutoWarmupEnabled: true,
      submit: jest.fn()
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
    it('shows confirmation modal on submit to enable ip auto warmup', async () => {
      wrapper.setProps({ isAutoWarmupEnabled: true });
      wrapper.find('Button').simulate('click');
      expect(wrapper.find('ConfirmationModal')).toMatchSnapshot();
    });

    it('shows confirmation modal on submit to disable ip auto warmup', async () => {
      wrapper.setProps({ ip: { auto_warmup_enabled: true }, isAutoWarmupEnabled: false });
      wrapper.find('Button').simulate('click');
      expect(wrapper.find('ConfirmationModal')).toMatchSnapshot();
    });

    it('invokes submit form upon enabling confirmed', () => {
      wrapper.setProps({ isAutoWarmupEnabled: true, formValues: { auto_warmup_enabled: true }});
      wrapper.setState({ confirmationModal: true });
      wrapper.find('ConfirmationModal').prop('onConfirm')();
      expect(props.submit).toHaveBeenCalledWith('ipForm');
    });

    it('invokes submit form upon disabling confirmed', () => {
      wrapper.setProps({ isAutoWarmupEnabled: false, formValues: { auto_warmup_enabled: false }});
      wrapper.setState({ confirmationModal: true });
      wrapper.find('ConfirmationModal').prop('onConfirm')();
      expect(props.submit).toHaveBeenCalledWith('ipForm');
    });

    it('does not submit form if modal is cancelled', () => {
      wrapper.setProps({ isAutoWarmupEnabled: false, formValues: { auto_warmup_enabled: false }});
      wrapper.setState({ confirmationModal: true });
      wrapper.find('ConfirmationModal').prop('onCancel')();
      expect(props.submit).not.toHaveBeenCalled();
    });
  });

  describe('auto_warmup_stage', () => {
    let componentSelector;
    beforeEach(() => {
      componentSelector = 'Field[name="auto_warmup_stage"]';
    });

    it('renders auto_warmup_stage when ip warmup is enabled', () => {
      wrapper.setProps({ isAutoWarmupEnabled: true });
      expect(wrapper.find(componentSelector)).toExist();
    });

    it('does not render when ip warmup is not enabled', () => {
      wrapper.setProps({ isAutoWarmupEnabled: false });
      expect(wrapper.find(componentSelector)).not.toExist();
    });

    it('disables stages beyond current stage', () => {
      wrapper.setProps({ isAutoWarmupEnabled: true, ip: { auto_warmup_stage: 2 }});
      expect(wrapper.find(componentSelector).prop('options')).toMatchSnapshot();
    });

    it('makes only stage 1 selectable from options upon enabling', () => {
      wrapper.setProps({ isAutoWarmupEnabled: true });
      const options = wrapper.find(componentSelector).prop('options');
      expect(_.map(options, (option) => option.disabled)).toEqual([false, true, true]);
    });

    it('casts stage to integer', () => {
      wrapper.setProps({ isAutoWarmupEnabled: true });
      expect(wrapper.find(componentSelector).prop('parse')('1')).toEqual(1);
    });
  });

});
