import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import EngagementRateByCohortActions from '../EngagementRateByCohortActions';

describe('Signals Engagement Rate by cohort actions component', () => {
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
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={{ p_total_eng: 0 }}
      recencyByCohort={fullEngagementRecency}
      facet={'facet'}
      facetId={'someId'}/>);

    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  cases('should render', ({ engagementByCohort, recencyByCohort }) => {
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={engagementByCohort}
      recencyByCohort={recencyByCohort}
      facet={'facet'}
      facetId={'someId'}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('bad');
  }, {
    'New engagement cohort bad value': {
      engagementByCohort: { p_new_eng: 0.09 },
      recencyByCohort: { c_new }
    },
    'Unengaged bad value': {
      engagementByCohort: { p_uneng_eng: 0.01 },
      recencyByCohort: { c_uneng }
    },
    'Not Recently Engaged bad value': {
      engagementByCohort: { p_365d_eng: 0.04 },
      recencyByCohort: { c_365d }
    },
    'Recently Engaged bad value': {
      engagementByCohort: { p_14d_eng: 0.04 },
      recencyByCohort: { c_14d }
    },
    'Total complaint rate bad value': {
      engagementByCohort: { p_total_eng: 0.04 },
      recencyByCohort: fullEngagementRecency
    }
  });

  cases('should render', ({ engagementByCohort, recencyByCohort }) => {
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={engagementByCohort}
      recencyByCohort={recencyByCohort}
      facet={'facet'}
      facetId={'someId'}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('warning');
  }, {
    'new engagement cohort warning value': {
      engagementByCohort: { p_new_eng: 0.19 },
      recencyByCohort: { c_new }
    },
    'Not Recently Engaged warning value': {
      engagementByCohort: { p_365d_eng: 0.14 },
      recencyByCohort: { c_365d }
    },
    'Semi Recently Engaged warning value': {
      engagementByCohort: { p_90d_eng: 0.14 },
      recencyByCohort: { c_90d }
    },
    'Recently Engaged warning value': {
      engagementByCohort: { p_14d_eng: 0.14 },
      recencyByCohort: { c_14d }
    }
  });

  it('should not render negative action message if that engagement cohort recency rate is <5%', () => {
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={{ p_new_eng: 0 }}
      recencyByCohort={{ p_new_eng: 0 }}
      facet={'facet'}
      facetId={'someId'}/>);
    //Will show the good message because there are no negative action messages, so it will default to the good message
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });

  it('renders only 3 messages in the correct order', () => {
    const zeroEngagementRate = {
      p_total_eng: 0,
      p_new_eng: 0,
      p_14d_eng: 0,
      p_90d_eng: 0,
      p_365d_eng: 0,
      p_uneng_eng: 0
    };
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={zeroEngagementRate}
      recencyByCohort={fullEngagementRecency}
      facet={'facet'}
      facetId={'someId'}/>);
    expect(wrapper.prop('actions')).toHaveLength(3);
    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  it('renders good message', () => {
    const fullEngagementRate = {
      p_total_eng: 1,
      p_new_eng: 1,
      p_14d_eng: 1,
      p_90d_eng: 1,
      p_365d_eng: 1,
      p_uneng_eng: 1
    };
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={fullEngagementRate}
      recencyByCohort={fullEngagementRecency}
      facet={'facet'}
      facetId={'someId'}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });

  it('renders empty', () => {
    wrapper = shallow(<EngagementRateByCohortActions
      engagementByCohort={{ p_total_eng: null }}
      recencyByCohort={fullEngagementRecency}
      facet={'facet'}
      facetId={'someId'}/>);
    expect(wrapper.prop('empty')).toBe(true);
  });
});
