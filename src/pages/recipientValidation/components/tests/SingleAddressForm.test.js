import React from 'react';

import { shallow } from 'enzyme';

import { SingleAddressForm } from '../SingleAddressForm';

describe('SingleAddressForm', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      handleSubmit: jest.fn(a => a),
      singleAddress: jest.fn(),
      history: {
        push: jest.fn(),
      },
    };

    wrapper = shallow(<SingleAddressForm {...props} />);
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
