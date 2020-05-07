import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import User from '../User';
import styles from '../User.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('Component: User', () => {
  let props;
  let wrapper;

  beforeAll(() => useHibanaOverride.mockReturnValue(styles));

  beforeEach(() => {
    props = {
      name: 'foo bar',
      email: 'foo@bar.com',
      username: 'foo-bar',
    };
    wrapper = shallow(<User {...props} />);
  });

  it('renders name & email & username link', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
