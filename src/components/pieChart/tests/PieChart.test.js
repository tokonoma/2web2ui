import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { shallow } from 'enzyme';
import PieChart from '../PieChart';

jest.mock('src/context/HibanaContext');

describe('Pie Chart: ', () => {
  it('renders its children', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    expect(shallow(<PieChart.Legend />)).toMatchSnapshot();
    expect(shallow(<PieChart.Chart />)).toMatchSnapshot();
    expect(shallow(<PieChart.ActiveLabel />).dive()).toMatchSnapshot(); // TODO: `.dive()` can be removed when OG theme is removed
  });
});
