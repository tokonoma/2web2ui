import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { shallow } from 'enzyme';
import PieChart from '../PieChart';
import styles from '../Legend.module.scss';

jest.mock('src/context/HibanaContext');
jest.mock('src/hooks/useHibanaOverride');

describe('Pie Chart: ', () => {
  beforeEach(() => useHibanaOverride.mockReturnValue(styles));

  it('renders its children', () => {
    useHibana.mockImplementationOnce(() => [{ isHibanaEnabled: false }]);

    expect(shallow(<PieChart.Legend />)).toMatchSnapshot();
    expect(shallow(<PieChart.Chart />)).toMatchSnapshot();
    expect(shallow(<PieChart.ActiveLabel />).dive()).toMatchSnapshot(); // TODO: `.dive()` can be removed when OG theme is removed
  });
});
