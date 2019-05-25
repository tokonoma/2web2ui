import React from 'react';
import ItemWithChildren from '../ItemWithChildren';
import { shallow } from 'enzyme/build/index';

describe('ItemWithChildren tests', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      to: '/to',
      icon: 'Mail',
      label: 'label',
      location: { pathname: '/to' },
      children: [
        { to: '/child1', label: 'child 1', location },
        { to: '/child2', label: 'child 2', location }
      ]
    };
    wrapper = shallow(<ItemWithChildren {...props} />);
  });

  it('should render children correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly on mobile', () => {
    wrapper.setProps({ mobile: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle open state when clicking link', () => {
    expect(wrapper.find('a').hasClass('isOpen')).toBe(false);
    wrapper.children().find('a').simulate('click');
    expect(wrapper.find('a').hasClass('isOpen')).toBe(true);
    wrapper.children().find('a').simulate('click');
    expect(wrapper.find('a').hasClass('isOpen')).toBe(false);
  });

});
