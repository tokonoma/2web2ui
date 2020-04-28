import { shallow } from 'enzyme';
import React from 'react';
import Section, { OGSection } from '../Section';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import styles from './Section.module.scss';

jest.mock('src/hooks/useHibanaOverride');
jest.mock('src/hooks/useHibanaToggle');
useHibanaToggle.mockReturnValue(OGSection);
useHibanaOverride.mockReturnValue(styles);

describe('Section Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Section title="a section">
        <Section.Left>left</Section.Left>
        <Section.Right>right</Section.Right>
      </Section>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Left').dive()).toMatchSnapshot();
    expect(wrapper.find('Right').dive()).toMatchSnapshot();
  });
});
