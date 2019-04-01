import { mount, shallow } from 'enzyme';
import React from 'react';
import { HealthScoreDashboard } from '../HealthScoreDashboard';

// Going to great lengths to use hooks
jest.mock('../../containers/HealthScoreOverviewContainer');
jest.mock('../components/CurrentHealthGauge/CurrentHealthGauge');
jest.mock('../components/HealthScoreChart/HealthScoreChart');
jest.mock('../../components/filters/FacetFilter');
jest.mock('../../components/filters/DateFilter');
jest.mock('../../components/filters/SubaccountFilter');

describe('Signals Health Score Dashboard', () => {
  const subject = (props = {}, render = shallow) => render(
    <HealthScoreDashboard
      getCurrentHealthScore={() => {}}
      getSubaccounts={() => {}}
      getInjections={() => {}}
      filters={{ relativeRange: '90days' }}
      {...props}
    />
  );

  it('renders page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getSubaccounts on mount', () => {
    const getSubaccounts = jest.fn();
    subject({ getSubaccounts }, mount);
    expect(getSubaccounts).toHaveBeenCalled();
  });

  it('calls getCurrentHealthScore getInjections on mount', () => {
    const getInjections = jest.fn();
    const getCurrentHealthScore = jest.fn();
    subject({ getInjections, getCurrentHealthScore }, mount);
    expect(getInjections).toHaveBeenCalled();
    expect(getCurrentHealthScore).toHaveBeenCalled();
  });
});
