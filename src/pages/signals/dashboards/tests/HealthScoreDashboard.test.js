import { shallow } from 'enzyme';
import React from 'react';
import { HealthScoreDashboard } from '../HealthScoreDashboard';

describe('Signals Health Score Dashboard', () => {
  const subject = (props = {}) => shallow(
    <HealthScoreDashboard getSubaccounts={() => {}} filters={{ relativeRange: '90days' }} getInjections={() => {}} {...props} />
  );

  it('renders page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getSubaccounts on mount', () => {
    const getSubaccounts = jest.fn();
    subject({ getSubaccounts });
    expect(getSubaccounts).toHaveBeenCalled();
  });

  it('calls getInjections on mount', () => {
    const getInjections = jest.fn();
    subject({ getInjections });
    expect(getInjections).toHaveBeenCalled();
  });
});
