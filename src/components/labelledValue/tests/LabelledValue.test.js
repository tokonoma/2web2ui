import React from 'react';
import { shallow } from 'enzyme';
import LabelledValue from '../LabelledValue';
jest.mock('src/context/HibanaContext', () => ({
  useHibana: jest.fn().mockReturnValue([{ isHibanaEnabled: false }]),
}));
jest.mock('src/hooks/useHibanaOverride', () => jest.fn(a => a));

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
    expect(wrapper.find('div[name="value"]')).toHaveProp('children', 'example');
  });
});
