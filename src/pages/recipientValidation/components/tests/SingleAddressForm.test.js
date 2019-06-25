import React from 'react';

import { shallow } from 'enzyme';

import { SingleAddressForm } from '../SingleAddressForm';

describe('SingleAddressForm', () => {
  let props;
  let formValues;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn((a) => a),
      singleAddress: jest.fn(),
      history: {
        push: jest.fn()
      }
    };

    wrapper = shallow(<SingleAddressForm {...props} />);

    formValues = {
      address: 'foo@address.com'
    };
  });

  it('renders correctly', () => {
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should submit single email address', async () => {
    wrapper.setProps(props);
    wrapper.find('form').simulate('submit', formValues);
    expect(props.history.push).toHaveBeenCalledWith('/recipient-validation/result/foo@address.com');
  });

  it('should hide previous errors preSubmit', async () => {
    props.submitFailed = false;
    props.errors = {
      payload: {
        message: 'hide me'
      }
    };
    wrapper.setProps(props);
    wrapper.find('form').simulate('submit', formValues);
    expect(props.history.push).toHaveBeenCalledWith('/recipient-validation/result/foo@address.com');
  });

  it('should trim email value', () => {
    expect(wrapper.find('Field').props().normalize('  test  ')).toBe('test');
  });
});
