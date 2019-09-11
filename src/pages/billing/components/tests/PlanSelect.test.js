import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import PlanSelect, { SelectedPlan, useModal } from '../PlanSelect';

describe('Plan Select:', () => {

  const defaultProps = {
    onSelect: jest.fn(),
    currentPlan: {
      code: '2'
    },
    plans: {
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
      }],
      'premier': [{
        code: '4',
        includesIp: true,
        monthly: 400,
        name: 'Four',
        overage: 0.4,
        volume: 4
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
      tier: 'test',
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

describe('useModal:', () => {
  const TestModal = (props) => {
    const { isShowing, toggle } = useModal(props.isShowing);
    return (
      <div open={isShowing} onClick={toggle} />
    );
  };
  const subject = (isShowing) => mount(
    <TestModal isShowing={isShowing}/>
  );

  it('toggles open when clicked', () => {
    const wrapper = subject(false);
    act(() => {
      wrapper.children().props().onClick();
    });
    wrapper.update();
    expect(wrapper.children().props().open).toBe(true);
  });
});
