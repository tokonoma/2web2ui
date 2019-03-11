import { shallow } from 'enzyme';
import React from 'react';
import { IPForm } from '../IPForm';
import config from 'src/config';
jest.mock('src/config');

describe('IP Form tests', () => {
  let props;
  let wrapper;
  let onSubmit;
  beforeEach(() => {
    onSubmit = jest.fn();

    props = {
      handleSubmit: jest.fn(() => onSubmit()),
      currentIp: {
        hostname: 'abcd.com'
      },
      onSubmit: jest.fn()
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
