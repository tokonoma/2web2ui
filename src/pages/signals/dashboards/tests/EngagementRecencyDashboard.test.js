import { shallow } from 'enzyme';
import React from 'react';
import { EngagementRecencyDashboard } from '../EngagementRecencyDashboard';

describe('Signals Engagement Recency Dashboard', () => {
  const subject = (props = {}) => shallow(
    <EngagementRecencyDashboard getSubaccounts={() => {}} {...props} />
  );

  it('renders page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getSubaccounts on mount', () => {
    const getSubaccounts = jest.fn();
    subject({ getSubaccounts });
    expect(getSubaccounts).toHaveBeenCalled();
  });
});
