import { shallow } from 'enzyme';
import React from 'react';
import { OGSection } from '../Section';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('Section Component', () => {
  it('should render correctly', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = shallow(
      <OGSection title="a section">
        <OGSection.Left>left</OGSection.Left>
        <OGSection.Right>right</OGSection.Right>
      </OGSection>,
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Left').dive()).toMatchSnapshot();
    expect(wrapper.find('Right').dive()).toMatchSnapshot();
  });
});
