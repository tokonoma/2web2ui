import React from 'react';
import { shallow } from 'enzyme';
import NavItem from '../NavItem';

describe('NavItem tests', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      to: '/to',
      icon: 'Mail',
      label: 'label',
      location: { pathname: 'to' }
    };
    wrapper = shallow(<NavItem {...props} />);
  });

  it('should render a link correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a link with beta tag', () => {
    wrapper.setProps({ tag: 'beta' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a link with labs tag', () => {
    wrapper.setProps({ tag: 'labs' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a link with new tag', () => {
    wrapper.setProps({ tag: 'new' });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call toggle nav when on mobile', () => {
    const toggle = jest.fn();
    wrapper.setProps({ toggleMobileNav: toggle, mobile: true });
    expect(wrapper).toMatchSnapshot();
    wrapper.children().find('Link').simulate('click');
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
