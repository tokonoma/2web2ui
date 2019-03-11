import { shallow } from 'enzyme';
import React from 'react';
import { IPForm } from '../IPForm';

describe('IP Form tests', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(),
      currentIp: {
        hostname: 'abcd.com'
      }
    };

    wrapper = shallow(<IPForm {...props} />);
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
    wrapper.find('form').simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
