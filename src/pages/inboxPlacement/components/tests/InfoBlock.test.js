import React from 'react';
import { shallow } from 'enzyme';

import InfoBlock from '../InfoBlock';

describe('Component: InfoBlock', () => {
  const subject = ({ ...props }) => shallow(<InfoBlock{...props}/>);

  it('renders correctly', () => {
    expect(subject({ label: 'Foo', value: 'bar' })).toMatchSnapshot();
  });

  it('renders correctly with grid override', () => {
    expect(subject({ columnProps: { md: 5 }}).prop('md')).toEqual(5);
  });

  it('renders correctly with custom classname', () => {
    const wrapper = subject({ labelClassName: 'foo', valueClassName: 'bar' });
    expect(wrapper.find('div').first()).toHaveProp('className', 'foo');
    expect(wrapper.find('div').last()).toHaveProp('className', 'bar');
  });

});
