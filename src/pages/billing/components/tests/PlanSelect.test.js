import React from 'react';
import { shallow } from 'enzyme';

import PlanSelect, { SelectedPlan } from '../PlanSelect';

describe('Plan Select:', () => {

  const defaultProps = {
    onSelect: jest.fn(),
    currentPlan: {
      code: '2'
    },
    plans: {
      'default': [{
        code: '1',
        includesIp: true,
        monthly: 100,
        name: 'One',
        overage: 0.1,
        volume: 1
      }],
      'test': [{
        code: '2',
        includesIp: false,
        monthly: 0,
        name: 'Two',
        overage: 0.2,
        volume: 2,
        isFree: true
      }],
      'starter': [{
        code: '3',
        monthly: 300,
        name: 'Three',
        overage: 0.3,
        volume: 3
      }]
    }
  };

  const subject = (props) => shallow(
    <PlanSelect
      {...defaultProps}
      {...props}
    />);

  it('should render correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

});

describe('Selected Plan:', () => {
  const defaultProps = {
    onChange: jest.fn(),
    plan: {
      tier: 'starter',
      code: '2',
      includesIp: false,
      monthly: 0,
      name: 'Two',
      overage: 0.2,
      volume: 2,
      isFree: true
    }
  };

  const subject = (props) => shallow(
    <SelectedPlan
      {...defaultProps}
      {...props}
    />
  );

  it('should render plan price with the plan', () => {
    expect(subject()).toMatchSnapshot();
  });
});
