import React from 'react';

import { shallow } from 'enzyme';
import styles from '../SingleAddressForm.module.scss';

import { SingleAddressFormClass } from '../SingleAddressForm';

describe('SingleAddressForm', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(a => a),
      singleAddress: jest.fn(),
      styles,
      history: {
        push: jest.fn(),
      },
    };

    wrapper = shallow(<SingleAddressFormClass {...props} />);
  });

  it('renders correctly', () => {
    wrapper.setProps(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should trim email value', () => {
    expect(
      wrapper
        .find('Field')
        .props()
        .normalize('  test  '),
    ).toBe('test');
  });
});
