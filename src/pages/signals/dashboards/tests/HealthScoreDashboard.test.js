import { mount, shallow } from 'enzyme';
import React from 'react';
import { HealthScoreDashboard } from '../HealthScoreDashboard';

// Child components are mocked because
// 1. useEffect requires enzyme mount to test
// 2. child components are connected to redux
// This avoids setting up a mock store
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
      relativeRange='90days'
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
    expect(getInjections).toHaveBeenCalledWith({ relativeRange: '90days' });
    expect(getCurrentHealthScore).toHaveBeenCalledWith({
      limit: 1,
      order: 'asc',
      relativeRange: '90days'
    });
  });
});
