import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';
import EngagementRateByCohortActions from '../EngagementRateByCohortActions';

describe('Signals Engagement Rate by cohort actions component', () => {
  let wrapper;
  const fullEngagementRecency = {
    c_new: 1,
    c_14d: 1,
    c_90d: 1,
    c_365d: 1,
    c_uneng: 1
  };
  it('renders', () => {
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={{ p_total_eng: 0 }} recencyByCohort={fullEngagementRecency} sid={0}/>);
    expect(wrapper.prop('actions')).toMatchSnapshot();
  });

  cases('should render', (engagementByCohort) => {
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={engagementByCohort} recencyByCohort={fullEngagementRecency} sid={0}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('bad');
  }, {
    'new engagement cohort bad value': {
      ...fullEngagementRecency,
      p_new_eng: 0.09
    },
    'unengaged bad value': {
      ...fullEngagementRecency,
      p_uneng_eng: 0.01
    },
    'Not Recently Engaged bad value': {
      ...fullEngagementRecency,
      p_365d_eng: 0.04
    },
    'Recently Engaged bad value': {
      ...fullEngagementRecency,
      p_14d_eng: 0.04
    },
    'total complaint rate bad value': {
      ...fullEngagementRecency,
      p_total_eng: 0.04
    }
  });

  cases('should render', (engagementByCohort) => {
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={engagementByCohort} recencyByCohort={fullEngagementRecency} sid={0}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('warning');
  }, {
    'new engagement cohort warning value': {
      ...fullEngagementRecency,
      p_new_eng: 0.19
    },
    'Not Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_365d_eng: 0.14
    },
    'Semi Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_90d_eng: 0.14
    },
    'Recently Engaged warning value': {
      ...fullEngagementRecency,
      p_14d_eng: 0.14
    }
  });

  it('should not render negative action message if that engagement cohort recency rate is <5%', () => {
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={{ p_new_eng: 0 }} recencyByCohort={{ p_new_eng: 0 }} sid={0}/>);
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
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={zeroEngagementRate} recencyByCohort={fullEngagementRecency} sid={0}/>);
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
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={fullEngagementRate} recencyByCohort={fullEngagementRecency} sid={0}/>);
    expect(wrapper.prop('actions')).toHaveLength(1);
    expect(wrapper.prop('actions')[0].type).toEqual('good');
  });

  it('renders empty', () => {
    wrapper = shallow(<EngagementRateByCohortActions engagementByCohort={{ p_total_eng: null }} />);
    expect(wrapper.prop('empty')).toBe(true);
  });
});
