import { shallow } from 'enzyme';
import React from 'react';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { SendingDomainSection } from '../SendingDomainSection';
import styles from '../SendingDomainSection.module.scss';

jest.mock('src/hooks/useHibanaOverride');

describe('SendingDomainSection', () => {
  beforeEach(() => useHibanaOverride.mockImplementationOnce(() => styles));

  it('should render sending domain section', () => {
    const props = {
      title: 'Title',
      children: ['Bill', 'Brasky'],
    };
    const wrapper = shallow(<SendingDomainSection {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Left section', () => {
    const props = {
      children: ['Bill', 'Brasky'],
    };
    const wrapper = shallow(<SendingDomainSection.Left {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Right section', () => {
    const props = {
      children: ['Bill', 'Brasky'],
    };
    const wrapper = shallow(<SendingDomainSection.Right {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
