import React from 'react';
import { shallow } from 'enzyme';
import LabelledValue from '../LabelledValue';

describe('LabelledValue Component', () => {
  const subject = (props = {}) => shallow(<LabelledValue {...props} />);

  it('should render - no props', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('should render with label and value', () => {
    expect(subject({ label: 'Label', value: 'a value' })).toMatchSnapshot();
  });

  it('should render children', () => {
    const wrapper = subject({ label: 'Label', children: <h5>child</h5> });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with label and value when value is boolean', () => {
    expect(subject({ label: 'Label', value: false })).toMatchSnapshot();
  });

  it('should render with unbolded value', () => {
    const wrapper = subject({ bold: false, value: 'example' });
    expect(wrapper.find('p')).toHaveProp('children', 'example');
  });
});
