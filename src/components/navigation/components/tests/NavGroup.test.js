import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Providers from 'src/Providers';
import { FilterNone } from '@sparkpost/matchbox-icons/matchbox-icons';

import NavGroup from '../NavGroup';
import { mount, shallow } from 'enzyme/build/index';
import styles from '../NavItem.module.scss';

describe('NavGroup tests', () => {
  let wrapper;
  let props;
  // TODO: Check why the location keyword is used in the props object... eslint is not happy and i didn't write it...
  beforeEach(() => {
    props = {
      to: '/to',
      icon: FilterNone,
      label: 'label',
      location: { pathname: '/to' },
      children: [
        // eslint-disable-next-line no-restricted-globals
        { to: '/child1', label: 'child 1', location },
        // eslint-disable-next-line no-restricted-globals
        { to: '/child2', label: 'child 2', location },
      ],
    };
    wrapper = shallow(<NavGroup {...props} />);
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
    expect(wrapper.find('a')).toHaveProp('aria-expanded', 'false');
    wrapper
      .children()
      .find('a')
      .simulate('click');
    expect(wrapper.find('a').hasClass('isOpen')).toBe(true);
    expect(wrapper.find('a')).toHaveProp('aria-expanded', 'true');
    wrapper
      .children()
      .find('a')
      .simulate('click');
    expect(wrapper.find('a').hasClass('isOpen')).toBe(false);
    expect(wrapper.find('a')).toHaveProp('aria-expanded', 'false');
  });

  it('should be open if any children has matching path', () => {
    wrapper = mount(
      <Providers>
        <Router>
          <NavGroup {...props} location={{ pathname: '/child2' }} />
        </Router>
      </Providers>,
    );
    wrapper.update();
    expect(
      wrapper
        .find('a')
        .first()
        .hasClass(styles.isOpen),
    ).toBe(true);
  });
});
