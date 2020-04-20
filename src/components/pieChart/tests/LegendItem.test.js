import React from 'react';
import LegendItem from '../LegendItem';
import { shallow } from 'enzyme';
import { useHibana } from 'src/context/HibanaContext';

jest.mock('src/context/HibanaContext');

describe('LegendItem: ', () => {
  const defaultProps = {
    name: 'name',
    count: 2,
    fill: '#000',
    children: ['children'],
    breadcrumb: false,
    onClick: jest.fn(),
    hovered: true,
    otherHovered: true,
  };
  const subject = props => shallow(<LegendItem {...defaultProps} {...props} />);

  it('renders the OG version of `LegendItem` when Hibana is not enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the Hibana version of `LegendItem` when Hibana is enabled', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render breadcrumb', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject({ breadcrumb: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render chevron without children', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);
    const wrapper = subject({ children: null });

    expect(wrapper.find('Icon')).toHaveLength(0);
  });
});
