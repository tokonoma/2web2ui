import { shallow } from 'enzyme';
import React from 'react';
import BarChart from '../BarChart';
import { Bar, Rectangle } from 'recharts';


describe('BarChart Component', () => {
  let wrapper;
  let props;
  const normal = [{ value: 2, date: '2011-01-01' }];
  const stacked = [
    { ab: 2, cd: 3, date: '2011-01-01' },
    { ab: 5, cd: 8, date: '2011-01-02' }
  ];
  const yKeys = [
    { key: 'ab', fill: 'blue' },
    { key: 'cd', fill: 'red' }
  ];
  const renderStacked = yKeys.map(({ key, fill }) => (
    <Bar
      stackId='stack'
      key={key}
      dataKey={key}
      fill={fill}
      isAnimationActive={false}
      minPointSize={1}
      cursor='pointer'
      shape={
        ({ background, ...rest }) => (
          <Rectangle {...rest} {...background} opacity={0} />
        )
      }
    />)
  );

  beforeEach(() => {
    props = {
      timeSeries: normal,
      xKey: 'date',
      yRange: [0,100],
      height: 50,
      width: 100,
      onClick: jest.fn(),
      tooltipContent: jest.fn(),
      fill: '#fill',
      activeFill: '#activeFill'
    };
    wrapper = shallow(<BarChart {...props}/>);
  });

  it('renders a normal bar chart correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a pointer cursor on the entire chart if isLink is true', () => {
    wrapper.setProps({ isLink: true });
    expect(wrapper.find('ComposedChart')).toHaveProp('cursor', 'pointer');
  });

  it('renders a pointer cursor on only the bars if isLink is false', () => {
    wrapper.setProps({ isLink: false });
    expect(wrapper.find('ComposedChart')).toHaveProp('cursor', 'default');
    expect(wrapper.find('Bar').at(0)).toHaveProp('cursor', 'pointer');

  });

  it('renders a stacked bar chart correctly', () => {
    wrapper.setProps({ timeSeries: stacked, children: renderStacked });
    const bars = wrapper.find('Bar').slice(1);
    expect(bars).toMatchSnapshot();
  });

  it('renders a tooltip when hovered over', () => {
    const key = 'health_score';
    wrapper.setProps({ hovered: '2011-01-01', yKey: key, timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }], disableHover: false });
    expect(wrapper.find('ComposedChart').find('Tooltip')).toExist();
  });

  it('renders background bars with no opacity', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props.opacity).toEqual(0);
  });

  it('should display x reference lines', () => {
    wrapper.setProps({ xAxisRefLines: [{ x: '2011-01-01', stroke: 'green', strokeWidth: 2 }, { x: '2011-01-03', stroke: 'red', strokeWidth: 2 }]});
    wrapper.find('ReferenceLine').forEach((line) => {
      expect(line).toMatchSnapshot();
    });
  });

  it('should display y reference lines', () => {
    wrapper.setProps({ yAxisRefLines: [{ y: 80, stroke: 'green', strokeWidth: 2 }, { y: 55, stroke: 'red', strokeWidth: 2 }]});
    wrapper.find('ReferenceLine').forEach((line) => {
      expect(line).toMatchSnapshot();
    });
  });
});
