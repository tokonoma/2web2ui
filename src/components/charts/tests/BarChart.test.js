import { shallow } from 'enzyme';
import React from 'react';
import BarChart from '../BarChart';
import { Bar, Rectangle } from 'recharts';


describe('BarChart Component', () => {

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

  const baseProps = {
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

  function subject(props) {
    return shallow(<BarChart {...baseProps} {...props} />);
  }

  it('renders a normal bar chart correctly', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders a pointer cursor on the entire chart if isLink is true', () => {
    const wrapper = subject({ isLink: true });
    expect(wrapper.find('ComposedChart')).toHaveProp('cursor', 'pointer');
  });

  it('renders a pointer cursor on only the bars if isLink is false', () => {
    const wrapper = subject({ isLink: false, hasBackgroundBars: true });
    expect(wrapper.find('ComposedChart')).toHaveProp('cursor', 'default');
    expect(wrapper.find('Bar').at(0)).toHaveProp('cursor', 'pointer');

  });

  it('renders a stacked bar chart correctly', () => {
    const wrapper = subject({ timeSeries: stacked, children: renderStacked });
    const bars = wrapper.find('Bar');
    expect(bars).toMatchSnapshot();
  });

  it('renders a tooltip when hovered over', () => {
    const key = 'health_score';
    const wrapper = subject({ hovered: '2011-01-01', yKey: key, timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }], disableHover: false });
    expect(wrapper.find('ComposedChart').find('Tooltip')).toExist();
  });

  it('renders background bars with no opacity when hasBackgroundBars is true', () => {
    const wrapper = subject({ hasBackgroundBars: true });
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(wrapper.find('Bar').at(0).props().shape(payload).props.opacity).toEqual(0);
  });

  it('should display x reference lines', () => {
    const wrapper = subject({ xAxisRefLines: [{ x: '2011-01-01', stroke: 'green', strokeWidth: 2 }, { x: '2011-01-03', stroke: 'red', strokeWidth: 2 }]});
    wrapper.find('ReferenceLine').forEach((line) => {
      expect(line).toMatchSnapshot();
    });
  });

  it('should display y reference lines', () => {
    const wrapper = subject({ yAxisRefLines: [{ y: 80, stroke: 'green', strokeWidth: 2 }, { y: 55, stroke: 'red', strokeWidth: 2 }]});
    wrapper.find('ReferenceLine').forEach((line) => {
      expect(line).toMatchSnapshot();
    });
  });
});
