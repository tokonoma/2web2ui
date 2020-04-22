import { shallow } from 'enzyme';
import React from 'react';
import Section, { OGSection } from '../Section';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

jest.mock('src/hooks/useHibanaToggle');
useHibanaToggle.mockReturnValue(OGSection);

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
