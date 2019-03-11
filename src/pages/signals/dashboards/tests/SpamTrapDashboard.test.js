import { shallow } from 'enzyme';
import React from 'react';
import { SpamTrapDashboard } from '../SpamTrapDashboard';

describe('Signals Spam Trap Dashboard Dashboard', () => {
  const subject = (props = {}) => shallow(
    <SpamTrapDashboard getSubaccounts={() => {}} {...props} />
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
