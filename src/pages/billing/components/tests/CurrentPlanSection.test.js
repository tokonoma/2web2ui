import React from 'react';
import { shallow } from 'enzyme';
import CurrentPlanSection from '../CurrentPlanSection';

describe('CurrentPlanSection', () => {
  const defaultProps = {
    currentPlan: {
      tier: 'starter',
      code: 'big-code',
      monthly: 300,
      name: 'Three',
      overage: 0.3,
      volume: 3
    }
  };
  const subject = (props) => shallow(
    <CurrentPlanSection
      {...defaultProps}
      {...props}
    />
  );

  it('renders correctly', () => {
    expect(subject()).toMatchSnapshot();
  });
});
