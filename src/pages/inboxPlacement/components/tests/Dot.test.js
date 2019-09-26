import { shallow } from 'enzyme';
import React from 'react';
import Dot from '../Dot';

describe('TestCollection Component', () => {
  const props = {
    backgroundColor: 'red'
  };

  it('should render', () => {
    const wrapper = shallow(<Dot {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change background color', () => {
    props.backgroundColor = 'green';
    const greenDot = shallow(<Dot {...props} />);
    expect(greenDot).toMatchSnapshot();
  });
});
