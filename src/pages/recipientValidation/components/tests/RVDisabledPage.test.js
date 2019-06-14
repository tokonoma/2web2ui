import React from 'react';
import { shallow } from 'enzyme';
import { RVDisabledPage } from '../RVDisabledPage';

describe('Recipient Validation Disabled Page', () => {
  let wrapper; let props;
  beforeEach(() => {
    props = {
      isSelfServeBilling: true,
      isFree: false,
      updateAccount: jest.fn(() => Promise.resolve())
    };

    wrapper = shallow(<RVDisabledPage {...props} />);
  });

  it('should render' , () => {
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Loading page when updating account' , () => {
    wrapper.setProps({ ...props, accountUpdateLoading: true });
    expect(wrapper).toMatchSnapshot();
  });
  it('should show no button when customer is manually billed' , () => {
    wrapper.setProps({ ...props, isSelfServeBilling: false });
    expect(wrapper.find('Button')).not.toExist();
  });

  it('should redirect to billing page when customer is self serve and on free plan' , () => {
    wrapper.setProps({ isSelfServeBilling: true, isFree: true });
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').prop('to')).toEqual('/account/billing');
    expect(wrapper.find('Button').prop('children')).toEqual('Upgrade your plan');

  });

  it('should show enable RV button when customer is self serve and on paid plan' , () => {
    wrapper.setProps(props);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('Button').prop('children')).toEqual('Enable Recipient Validation');
  });

  it('should make API call to enable RV when button is clicked.' , () => {
    wrapper.setProps(props);
    wrapper.find('Button').simulate('click');
    expect(props.updateAccount).toHaveBeenCalledWith({ options: { recipient_validation: true }});
  });
});
