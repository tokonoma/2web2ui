import React from 'react';
import { shallow } from 'enzyme';
import PlanSummary from '../PlanSummary';

describe('PlanSummary', () => {
  const subject = ({ plan = {}, pendingCancellation = {}}) => shallow(
    <PlanSummary plan={{ plan_volume: 1000, recurring_charge: 100, ...plan }} pendingCancellation={pendingCancellation} />
  );

  it('renders summary', () => {
    expect(subject({})).toMatchSnapshot();
  });

  it('renders summary for free plan', () => {
    expect(subject({ plan: { recurring_charge: 0 }})).toMatchSnapshot();
  });

  it('renders summary with overages', () => {
    expect(subject({ plan: { overage: 0.0123 }})).toMatchSnapshot();
  });

  it('renders summary with custom plan', () => {
    const plan = {
      plan_volume: 1000,
      plan_volume_per_period: 12000,
      recurring_charge: 100,
      period: 'year'
    };

    expect(subject({ plan })).toMatchSnapshot();
  });

  it('renders pending cancellation date', () => {
    expect(subject({ pendingCancellation: { effective_date: '2019-06-20T12:00:00.000Z' }})).toMatchSnapshot();
  });
});
