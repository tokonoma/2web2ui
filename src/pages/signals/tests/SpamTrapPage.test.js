import { shallow } from 'enzyme';
import React from 'react';
import { SpamTrapPage } from '../SpamTrapPage';

describe('Signals Spam Trap Page', () => {
  let wrapper;
  let props;
  const data = [
    {
      date: '2017-01-01',
      injections: 1240,
      relative_trap_hits: 0.1,
      relative_trap_hits_parked: 0.025,
      relative_trap_hits_recycled: 0.025,
      relative_trap_hits_typo: 0.05,
      trap_hits: 124,
      trap_hits_parked: 31,
      trap_hits_recycled: 31,
      trap_hits_typo: 62
    },
    {
      date: '2017-01-02',
      injections: 424,
      relative_trap_hits: 0.5,
      relative_trap_hits_parked: 0.125,
      relative_trap_hits_recycled: 0.125,
      relative_trap_hits_typo: 0.25,
      trap_hits: 212,
      trap_hits_parked: 53,
      trap_hits_recycled: 53,
      trap_hits_typo: 106
    }
  ];

  beforeEach(() => {
    props = {
      facetId: 'test.com',
      facet: 'sending-domain',
      data,
      gap: 0.25,
      handleDateSelect: jest.fn(),
      loading: false,
      empty: false,
      selectedDate: '2017-01-01',
      xTicks: []
    };
    wrapper = shallow(<SpamTrapPage {...props}/>);
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

  describe('local state', () => {
    it('handles calculation type', () => {
      const calculation = shallow(wrapper.find('ChartHeader').props().primaryArea);
      calculation.simulate('change', 'absolute');

      expect(wrapper.find('BarChart').prop('yKeys')).toEqual([
        expect.objectContaining({ key: 'trap_hits_typo' }),
        expect.objectContaining({ key: 'trap_hits_recycled' }),
        expect.objectContaining({ key: 'trap_hits_parked' })
      ]);
    });
  });

  describe('bar chart props', () => {
    it('renders tooltip content', () => {
      const Tooltip = wrapper.find('BarChart').prop('tooltipContent');
      expect(shallow(<Tooltip payload={data[0]} />)).toMatchSnapshot();
    });

    it('gets x axis props', () => {
      const axisProps = wrapper.find('BarChart').prop('xAxisProps');
      expect(axisProps).toMatchSnapshot();
      expect(axisProps.tickFormatter('2018-12-05')).toEqual('12/5');
    });

    it('gets y axis props with relative calculation', () => {
      wrapper.setState({ calculation: 'relative' });
      const axisProps = wrapper.find('BarChart').prop('yAxisProps');
      expect(axisProps.tickFormatter(0.2468)).toEqual('24.68%');
    });

    it('gets y axis props with absolute calculation', () => {
      wrapper.setState({ calculation: 'absolute' });
      const axisProps = wrapper.find('BarChart').prop('yAxisProps');
      expect(axisProps.tickFormatter((2468))).toEqual('2.47K');
      expect(axisProps.domain).toEqual(['auto', 'auto']);
    });

    it('gets y axis props with relative calculation and 0 values', () => {
      wrapper.setState({ calculation: 'relative' });
      wrapper.setProps({ data: [{ relative_trap_hits: 0 }, { relative_trap_hits: null }]});
      const axisProps = wrapper.find('BarChart').prop('yAxisProps');
      expect(axisProps.domain).toEqual([0, 1]);
    });
  });
});
