import { shallow } from 'enzyme';
import React from 'react';
import Legend from '../Legend';

describe('Legend Component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      items: [
        { fill: 'blue', label: 'label 1' },
        { label: 'label 2' },
        { label: 'label 2', fill: 'white', hasBorder: true }
      ]
    };
    wrapper = shallow(<Legend {...props}/>);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.find('Item').forEach((item) => {
      expect(item.dive()).toMatchSnapshot();
    });
  });

  it('renders correctly with tooltip content', () => {
    wrapper.setProps({ tooltipContent: (label) => label });
    wrapper.find('Item').forEach((item) => {
      expect(item.dive().find('Tooltip')).toExist();
    });
  });
});
