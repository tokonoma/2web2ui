import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import ComplaintsByCohortActions from '../ComplaintsByCohortActions';

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
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={{ p_total_fbl: 1 }}
      recencyByCohort={fullEngagementRecency}
    />);

    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  cases('should render bad value actions for', ({ complaintsByCohort, recencyByCohort }) => {
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={complaintsByCohort}
      recencyByCohort={recencyByCohort}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('bad');
  }, {
    'New cohort': {
      complaintsByCohort: { p_new_fbl: 0.0026 },
      recencyByCohort: { c_new }
    },
    'Unengaged cohort': {
      complaintsByCohort: { p_uneng_fbl: 0.0051 },
      recencyByCohort: { c_uneng }
    },
    'Not Recently Engaged cohort': {
      complaintsByCohort: { p_365d_fbl: 0.0051 },
      recencyByCohort: { c_365d }
    },
    'Semi Recently Engaged cohort': {
      complaintsByCohort: { p_90d_fbl: 0.0051 },
      recencyByCohort: { c_90d }
    },
    'Recently Engaged cohort': {
      complaintsByCohort: { p_14d_fbl: 0.0051 },
      recencyByCohort: { c_14d }
    },
    'Total complaint rate cohort': {
      complaintsByCohort: { p_total_fbl: 0.0051 },
      recencyByCohort: fullEngagementRecency
    }
  });

  cases('should render warning value actions for', ({ complaintsByCohort, recencyByCohort }) => {
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={complaintsByCohort}
      recencyByCohort={recencyByCohort}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('warning');
  }, {
    'New cohort': {
      complaintsByCohort: { p_new_fbl: 0.0011 },
      recencyByCohort: { c_new }
    },
    'Unengaged cohort': {
      complaintsByCohort: { p_uneng_fbl: 0.0011 },
      recencyByCohort: { c_uneng }
    },
    'Not Recently Engaged cohort': {
      complaintsByCohort: { p_365d_fbl: 0.0011 },
      recencyByCohort: { c_365d }
    },
    'Semi Recently Engaged cohort': {
      complaintsByCohort: { p_90d_fbl: 0.0011 },
      recencyByCohort: { c_90d }
    },
    'Recently Engaged cohort': {
      complaintsByCohort: { p_14d_fbl: 0.0011 },
      recencyByCohort: { c_14d }
    }
  });

  it('renders combination for semi/not/recently engaged cohorts', () => {
    const comboComplaintRate = {
      p_365d_fbl: 0.0051,
      p_90d_fbl: 0.0051,
      p_14d_fbl: 0.0011
    };
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={comboComplaintRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toMatchSnapshot();

  });

  it('should not render negative action message if that engagement cohort recency rate is <5%', () => {
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={{ p_new_fbl: 1 }}
      recencyByCohort={{ p_new_fbl: 0 }}
    />);
    //Will show the good message because there are no negative action messages, so it will default to the good message
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });

  it('renders only 3 messages in the correct order', () => {
    const fullComplaintRate = {
      p_total_fbl: 1,
      p_new_fbl: 1,
      p_14d_fbl: 1,
      p_90d_fbl: 1,
      p_365d_fbl: 1,
      p_uneng_fbl: 1
    };
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={fullComplaintRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toHaveLength(3);
    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  it('renders good message', () => {
    const zeroComplaintRate = {
      p_total_fbl: 0,
      p_new_fbl: 0,
      p_14d_fbl: 0,
      p_90d_fbl: 0,
      p_365d_fbl: 0,
      p_uneng_fbl: 0
    };
    wrapper = shallow(<ComplaintsByCohortActions
      complaintsByCohort={zeroComplaintRate}
      recencyByCohort={fullEngagementRecency}
    />);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });


  it('renders empty', () => {
    wrapper = shallow(<ComplaintsByCohortActions complaintsByCohort={{ p_total_fbl: null }} />);
    expect(wrapper.prop('empty')).toBe(true);
  });
});
