import { shallow } from 'enzyme';
import React from 'react';
import LineChart from '../LineChart';

describe('LineChart Component', () => {
  let wrapper;
  let props;
  const single = [{ value: 2, date: '2011-01-01' }];
  const multiple = [
    { ab: 2, cd: 3, date: '2011-01-01' },
    { ab: 5, cd: 8, date: '2011-01-02' }
  ];
  const yKeys = [
    { key: 'ab', stroke: 'blue' },
    { key: 'cd', stroke: 'red' }
  ];

  beforeEach(() => {
    props = {
      lines: single,
      xKey: 'date',
      yRange: [0,5],
      height: 50,
      width: 100,
      onClick: jest.fn(),
      tooltipContent: jest.fn(),
      stroke: '#stroke'
    };
    wrapper = shallow(<LineChart {...props}/>);
  });

  it('renders a line chart with a single line correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a multiple lines correctly', () => {
    wrapper.setProps({ lines: multiple, yKeys });
    expect(wrapper.find('Line')).toMatchSnapshot();
  });

  it('renders background bars with no opacity if unselected', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload)).toMatchSnapshot();
  });

  it('renders background bars with opacity if selected', () => {
    wrapper.setProps({ selected: '2011-01-01' });
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload)).toMatchSnapshot();
  });

  it('renders a dot if selected', () => {
    wrapper.setProps({ selected: '2011-01-01' });
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Line').props().dot(payload)).toMatchSnapshot();
  });

  it('does not renders a dot if not selected', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Line').props().dot(payload)).toBe(null);
  });

  it('renders active dot', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Line').props().activeDot(payload)).toMatchSnapshot();
  });

  it('should handle click on background bar', () => {
    wrapper.setProps({ timeSeries: multiple, yKeys });
    wrapper.find('Bar').simulate('click');
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it('should handle click on all lines', () => {
    wrapper.setProps({ timeSeries: multiple, yKeys });
    wrapper.find('Line').forEach((n) => n.simulate('click'));
    expect(props.onClick).toHaveBeenCalledTimes(2);
  });
});
