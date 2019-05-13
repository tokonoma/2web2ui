import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import UnsubscribeRateByCohortActions from '../UnsubscribeRateByCohortActions';

describe('Signals complaints by cohort actions component', () => {
  let wrapper;
  const c_new = 1;
  const c_14d = 1;
  const c_90d = 1;
  const c_365d = 1;
  const c_uneng = 1;

  const fullEngagementRecency = {
    c_new,
    c_14d,
    c_90d,
    c_365d,
    c_uneng
  };

  it('renders', () => {
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={{ p_total_unsub: 0 }}
      recencyByCohort={fullEngagementRecency}
    />);

    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  cases('should render', ({ unsubscribeByCohort, recencyByCohort }) => {
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={unsubscribeByCohort}
      recencyByCohort={recencyByCohort}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('bad');
  }, {
    'New engagement cohort bad value': ({
      unsubscribeByCohort: { p_new_unsub: 0.0026 },
      recencyByCohort: { c_new }}),
    'Unengaged bad value': ({
      unsubscribeByCohort: { p_uneng_unsub: 0.0051 },
      recencyByCohort: { c_uneng }}),
    'Not Recently Engaged bad value': ({
      unsubscribeByCohort: { p_365d_unsub: 0.0051 },
      recencyByCohort: { c_365d }}),
    'Semi-Recently Engaged bad value': ({
      unsubscribeByCohort: { p_90d_unsub: 0.0051 },
      recencyByCohort: { c_90d }}),
    'Recently Engaged bad value': ({
      unsubscribeByCohort: { p_14d_unsub: 0.0051 },
      recencyByCohort: { c_14d }}),
    'Total complaint rate bad value': ({
      unsubscribeByCohort: { p_total_unsub: 0.0051 },
      recencyByCohort: {}})
  });

  cases('should render', ({ unsubscribeByCohort, recencyByCohort }) => {
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={unsubscribeByCohort}
      recencyByCohort={recencyByCohort}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('warning');
  }, {
    'New engagement cohort warning value': ({
      unsubscribeByCohort: { p_new_unsub: 0.0011 },
      recencyByCohort: { c_new }}),
    'Unengaged warning value': ({
      unsubscribeByCohort: { p_uneng_unsub: 0.0011 },
      recencyByCohort: { c_uneng }}),
    'Not Recently Engaged warning value': ({
      unsubscribeByCohort: { p_365d_unsub: 0.0011 },
      recencyByCohort: { c_365d }}),
    'Semi-Recently Engaged warning value': ({
      unsubscribeByCohort: { p_90d_unsub: 0.0011 },
      recencyByCohort: { c_90d }}),
    'Recently Engaged warning value': ({
      unsubscribeByCohort: { p_14d_unsub: 0.0011 },
      recencyByCohort: { c_14d }})
  });

  it('should not render negative action message if that engagement cohort recency rate is <5%', () => {
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={{ p_new_unsub: 0 }}
      recencyByCohort={{ p_new_unsub: 0 }}
    />);
    //Will show the good message because there are no negative action messages, so it will default to the good message
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });

  it('renders good message', () => {
    const zeroUnsubscribeRate = {
      p_total_unsub: 0,
      p_new_unsub: 0,
      p_14d_unsub: 0,
      p_90d_unsub: 0,
      p_365d_unsub: 0,
      p_uneng_unsub: 0
    };
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={zeroUnsubscribeRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');

  });

  it('renders combination for semi/not/recently engaged cohorts', () => {
    const comboUnsubscribeRate = {
      p_14d_unsub: .0051,
      p_90d_unsub: .0051,
      p_365d_unsub: .0011
    };
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={comboUnsubscribeRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toMatchSnapshot();

  });

  it('renders only 3 messages in the correct order', () => {
    const fullUnsubscribeRate = {
      p_total_unsub: 1,
      p_new_unsub: 1,
      p_14d_unsub: 1,
      p_90d_unsub: 1,
      p_365d_unsub: 1,
      p_uneng_unsub: 1
    };
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={fullUnsubscribeRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toHaveLength(3);
    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  it('renders empty', () => {
    wrapper = shallow(<UnsubscribeRateByCohortActions
      unsubscribeByCohort={{ p_total_unsub: null }}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('empty')).toBe(true);
  });
});
