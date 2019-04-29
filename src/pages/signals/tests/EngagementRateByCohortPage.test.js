import { shallow } from 'enzyme';
import React from 'react';
import { EngagementRateByCohortPage } from '../EngagementRateByCohortPage';

describe('Signals Engagement Rate By Cohort Page', () => {
  let wrapper;
  let props;
  const data = [
    {
      date: '2017-01-01',
      c_total: 1
    },
    {
      date: '2017-01-02',
      c_total: 10
    }
  ];

  beforeEach(() => {
    props = {
      facetId: 'test.com',
      facet: 'sending-domain',
      data: [{ c_total: 10 }],
      handleDateSelect: jest.fn(),
      gap: 0.25,
      loading: false,
      empty: false,
      xTicks: [1,2],
      selectedDate: '2017-01-02'
    };
    wrapper = shallow(<EngagementRateByCohortPage {...props}/>);
    wrapper.setProps({ data });
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Panel')).toMatchSnapshot();
  });

  it('renders empty correctly', () => {
    wrapper.setProps({ empty: true });
    expect(wrapper.find('Panel')).toMatchSnapshot();
  });

  it('renders error correctly', () => {
    wrapper.setProps({ error: { message: 'error message' }});
    expect(wrapper).toMatchSnapshot();
  });

  describe('bar chart props', () => {
    it('renders tooltip content', () => {
      const Tooltip = wrapper.find('LineChart').prop('tooltipContent');
      expect(shallow(<Tooltip payload={{
        p_uneng_eng: 0.111,
        p_365d_eng: 0.2,
        p_90d_eng: 0.3,
        p_14d_eng: 0.4,
        p_new_eng: 0.5,
        date: '2018-01-01',
        p_total_eng: 10
      }} />)).toMatchSnapshot();
    });

    it('gets x axis props', () => {
      const axisProps = wrapper.find('LineChart').prop('xAxisProps');
      expect(axisProps).toMatchSnapshot();
      expect(axisProps.tickFormatter('2018-12-05')).toEqual('12/5');
    });

    it('gets y axis props', () => {
      wrapper.setProps({ data: [{ p_total_eng: 0 }, { p_total_eng: null }]});
      const axisProps = wrapper.find('LineChart').prop('yAxisProps');
      expect(axisProps.tickFormatter(.253)).toEqual('25.3%');
      expect(axisProps.domain).toEqual([0,1]);
    });

    it('gets y axis props with domain', () => {
      wrapper.setProps({ data: [{ p_total_eng: 0.5 }, { p_total_eng: 0.6 }]});
      const axisProps = wrapper.find('LineChart').prop('yAxisProps');
      expect(axisProps.domain).toEqual(['auto', 'auto']);
    });
  });
});
