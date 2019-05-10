import { shallow } from 'enzyme';
import React from 'react';
import { ComplaintsByCohortPage } from '../ComplaintsByCohortPage';

describe('Signals Complaints Page', () => {
  let wrapper;
  let props;
  const data = [
    {
      date: '2017-01-01',
      p_total_fbl: 1
    },
    {
      date: '2017-01-02',
      p_total_fbl: 10
    }
  ];
  const dataEngRecency = [
    {
      date: '2017-01-01',
      c_uneng: .25
    },
    {
      date: '2017-01-02',
      c_uneng: .5
    }];

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
    wrapper = shallow(<ComplaintsByCohortPage {...props}/>);
    wrapper.setProps({ data, dataEngRecency });
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Panel')).toMatchSnapshot();
  });

  it('does not render SpamTrapsPreview when facet is mb_provider', () => {
    wrapper.setProps({ facet: 'mb_provider' });
    wrapper.update();
    expect(wrapper.find('withRouter(Connect(WithDetails(SpamTrapsPreview)))')).not.toContainMatchingElement();
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
        p_uneng_fbl: 0.11111,
        p_365d_fbl: 0.2,
        p_90d_fbl: 0.3,
        p_14d_fbl: 0.4,
        p_new_fbl: 0.5,
        date: '2018-01-01',
        p_total_fbl: 10
      }} />)).toMatchSnapshot();
    });

    it('gets x axis props', () => {
      const axisProps = wrapper.find('LineChart').prop('xAxisProps');
      expect(axisProps.ticks).toEqual([1,2]);
      expect(axisProps.tickFormatter('2018-12-05')).toEqual('12/5');
    });

    it('gets y axis props with default domain', () => {
      wrapper.setProps({ data: [{ p_total_fbl: 0 }, { p_total_fbl: null }]});
      const axisProps = wrapper.find('LineChart').prop('yAxisProps');
      expect(axisProps.tickFormatter(.252344)).toEqual('25.234%');
      expect(axisProps.domain).toEqual([0,1]);
    });

    it('gets y axis props with domain', () => {
      wrapper.setProps({ data: [{ p_total_fbl: 0.5 }, { p_total_fbl: 0.6 }]});
      const axisProps = wrapper.find('LineChart').prop('yAxisProps');
      expect(axisProps.domain).toEqual(['auto', 'auto']);
    });
  });
});
