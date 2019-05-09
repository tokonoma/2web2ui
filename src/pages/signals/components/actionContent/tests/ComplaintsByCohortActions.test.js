import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import ComplaintsByCohortActions from '../ComplaintsByCohortActions';

describe('Signals complaints by cohort actions component', () => {
  let wrapper;
  const fullEngagementRecency = {
    c_new: 1,
    c_14d: 1,
    c_90d: 1,
    c_365d: 1,
    c_uneng: 1
  };
  cases('render cases', (cohorts) => {
    const wrapper = shallow(<ComplaintsByCohortActions cohorts={cohorts} />);
    expect(wrapper.prop('actions')).toMatchSnapshot();
  }, {
    'should render unengaged bad value': {
      ...fullEngagementRecency,
      p_uneng_fbl: 0.0051
    },
    'should render unengaged warning value': {
      ...fullEngagementRecency,
      p_uneng_fbl: 0.0011
    },
    'should render new bad value': {
      ...fullEngagementRecency,
      p_new_fbl: 0.0025
    },
    'should render new warning value': {
      ...fullEngagementRecency,
      p_new_fbl: 0.0011
    },
    'should render Not Recently Engaged bad value': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0051
    },
    'should render Not Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0011
    },
    'should render Semi Recently Engaged bad value': {
      ...fullEngagementRecency,
      p_90d_fbl: 0.0051
    },
    'should render Semi Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_90d_fbl: 0.0011
    },
    'should render Recently Engaged bad value': {
      ...fullEngagementRecency,
      p_14d_fbl: 0.0051
    },
    'should render Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_14d_fbl: 0.0011
    },
    'should render all 3 Recently engaged bad values': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0051,
      p_90d_fbl: 0.0051,
      p_14d_fbl: 0.0051
    },
    'should render all 3 Recently engaged warning values': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0011,
      p_90d_fbl: 0.0011,
      p_14d_fbl: 0.0011
    },
    'should render all 2 Recently engaged bad values amd 1 warning value': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0051,
      p_90d_fbl: 0.0051,
      p_14d_fbl: 0.0011
    },
    'should render all 2 Recently engaged warning values amd 1 bad value': {
      ...fullEngagementRecency,
      p_365d_fbl: 0.0011,
      p_90d_fbl: 0.0011,
      p_14d_fbl: 0.0051
    },
    'should render total complaint rate bad value': {
      ...fullEngagementRecency,
      p_total_fbl: 0.0051
    },
    'should render only 3 items': {
      ...fullEngagementRecency,
      p_14d_fbl: 1,
      p_new_fbl: 1,
      p_uneng_fbl: 1,
      p_90_fbl: 1
    }
  });

  it('renders empty', () => {
    wrapper = shallow(<ComplaintsByCohortActions cohorts={{ p_total_fbl: null }} />);
    expect(wrapper.prop('empty')).toBe(true);
  });
});
