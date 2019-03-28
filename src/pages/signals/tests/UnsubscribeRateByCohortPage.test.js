import { shallow } from 'enzyme';
import React from 'react';
import { UnsubscribeRateByCohortPage } from '../UnsubscribeRateByCohortPage';

describe('Signals Unsubscribe Rate Page', () => {
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
    wrapper = shallow(<UnsubscribeRateByCohortPage {...props}/>);
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
    expect(wrapper.find('Callout').prop('children')).toEqual('error message');
    expect(wrapper.find('Callout').prop('title')).toEqual('Unable to Load Data');
  });

  describe('bar chart props', () => {
    it('renders tooltip content', () => {
      const Tooltip = wrapper.find('LineChart').prop('tooltipContent');
      expect(shallow(<Tooltip payload={{
        p_uneng_unsub: 0.1,
        p_365d_unsub: 0.2,
        p_90d_unsub: 0.3,
        p_14d_unsub: 0.4,
        p_new_unsub: 0.5,
        date: '2018-01-01',
        p_total_unsub: 10
      }} />)).toMatchSnapshot();
    });

    it('gets x axis props', () => {
      const axisProps = wrapper.find('LineChart').prop('xAxisProps');
      expect(axisProps.ticks).toEqual([1,2]);
      expect(axisProps.tickFormatter('2018-12-05')).toEqual('12/5');
    });

    it('gets y axis props', () => {
      const axisProps = wrapper.find('LineChart').prop('yAxisProps');
      expect(axisProps.tickFormatter(.2523)).toEqual('25%');
    });
  });
});
