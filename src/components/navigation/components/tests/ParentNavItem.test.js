import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterNone } from '@sparkpost/matchbox-icons/matchbox-icons';

import { act } from 'react-dom/test-utils';
import ParentNavItem from '../ParentNavItem';
import { mount, shallow } from 'enzyme/build/index';
import styles from '../NavItem.module.scss';

describe('ParentNavItem tests', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      to: '/to',
      icon: FilterNone,
      label: 'label',
      location: { pathname: '/to' },
      children: [
        { to: '/child1', label: 'child 1', location },
        { to: '/child2', label: 'child 2', location }
      ]
    };
    act(() => {
      wrapper = shallow(<ParentNavItem {...props} />);
    });
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

  it('should be open if any children has matching path', () => {
    act(() => {
      wrapper = mount(
        <Router>
          <ParentNavItem {...props} location={{ pathname: '/child2' }}/>
        </Router>
      );
    });
    wrapper.update();
    expect(wrapper.find('a').first().hasClass(styles.isOpen)).toBe(true);
  });

});
