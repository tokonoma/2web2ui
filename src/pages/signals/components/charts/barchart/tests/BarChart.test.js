import { shallow } from 'enzyme';
import React from 'react';
import { BarChartClassComponent as BarChart } from '../BarChart';
import healthScoreThresholds from 'src/pages/signals/constants/healthScoreThresholds';

describe('BarChart Component', () => {
  let wrapper;
  let props;
  const normal = [{ value: 2, date: '2011-01-01' }];
  const stacked = [
    { ab: 2, cd: 3, date: '2011-01-01' },
    { ab: 5, cd: 8, date: '2011-01-02' },
  ];
  const yKeys = [
    { key: 'ab', fill: 'blue' },
    { key: 'cd', fill: 'red' },
  ];

  beforeEach(() => {
    props = {
      gap: 1,
      margin: { top: 12, left: 18, right: 0, bottom: 5 },
      shouldHighlightSelected: true,
      timeSeries: normal,
      xKey: 'date',
      xAxisRefLines: [],
      yAxisRefLines: [],
      yKey: 'value',
      yRange: [0, 100],
      height: 50,
      width: 100,
      onClick: jest.fn(),
      tooltipContent: jest.fn(),
      fill: '#fill',
      activeFill: '#activeFill',
      gridStroke: '#e1e1e6',
    };
    wrapper = shallow(<BarChart {...props} />);
  });

  it('renders a normal bar chart correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a normal bar chart with correct fill for selected/hovered threshold events', () => {
    const key = 'health_score';
    wrapper.setProps({
      selected: '2011-01-01',
      yKey: key,
      timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, ranking: 'warning', date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual(healthScoreThresholds.warning.barColor);
  });

  it('renders a normal bar chart with correct fill for non-selected/hovered threshold events', () => {
    const key = 'health_score';
    wrapper.setProps({
      selected: undefined,
      yKey: key,
      timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, ranking: 'warning', date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#fill');
  });

  it('renders a normal bar chart with correct fill for selected event but with shouldHighlightSelected set to false', () => {
    const key = 'health_score';
    wrapper.setProps({
      selected: '2011-01-01',
      shouldHighlightSelected: false,
      yKey: key,
      timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, ranking: 'warning', date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#fill');
  });

  it('renders a normal bar chart with correct fill for selected/hovered non-threshold events', () => {
    const key = 'injections';
    wrapper.setProps({
      selected: '2011-01-01',
      yKey: key,
      timeSeries: [{ [key]: 75, date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#activeFill');
  });

  it('renders a normal bar chart with correct fill for non-selected/hovered non-threshold events', () => {
    const key = 'injections';
    wrapper.setProps({
      selected: undefined,
      yKey: key,
      timeSeries: [{ [key]: 75, date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#fill');
  });

  it('renders a normal bar chart with correct fill for non-selected/hovered stacked bar events', () => {
    const key = 'c_new';
    wrapper.setProps({
      selected: undefined,
      yKey: key,
      timeSeries: [{ [key]: 75, date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#fill');
  });

  it('renders a normal bar chart with less opaque fill fo stacked bar events when selected exists for another date', () => {
    const key = 'c_new';
    wrapper.setProps({
      selected: '2011-01-02',
      yKey: key,
      timeSeries: [
        { [key]: 75, date: '2011-01-01' },
        { [key]: 80, date: '2011-01-02' },
      ],
    });
    const payload = { fill: '#fill', [key]: 75, date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.fill,
    ).toEqual('#fill');
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.opacity,
    ).toEqual(0.5);
  });

  it('renders a normal bar chart with correct fill for selected/hovered stacked bar events', () => {
    const key = 'c_new';
    wrapper.setProps({
      selected: '2011-01-01',
      yKey: key,
      timeSeries: [{ [key]: 75, date: '2011-01-01' }],
    });
    const payload = { fill: '#fill', [key]: 75, date: '2011-01-01' };
    expect(
      wrapper
        .find({ dataKey: key })
        .at(0)
        .props()
        .shape(payload).props.opacity,
    ).toEqual(1);
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
    wrapper.setProps({ timeSeries: stacked, yKeys });
    const bars = wrapper.find('Bar').slice(1);
    expect(bars).toMatchSnapshot();
  });

  it('renders a tooltip when hovered over', () => {
    const key = 'health_score';
    wrapper.setProps({
      hovered: '2011-01-01',
      yKey: key,
      timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }],
      disableHover: false,
    });
    expect(wrapper.find('ComposedChart').find('Tooltip')).toExist();
  });

  it('does not render a tooltip when not hovering over', () => {
    const key = 'health_score';
    wrapper.setProps({
      hovered: null,
      yKey: key,
      timeSeries: [{ [key]: 75, ranking: 'warning', date: '2011-01-01' }],
      disableHover: false,
    });
    expect(wrapper.find('ComposedChart').find('Tooltip')).not.toExist();
  });

  it('renders background bars with no opacity', () => {
    const payload = { payload: { date: '2011-01-01' }, test: 'test' };
    expect(
      wrapper
        .find('Bar')
        .at(0)
        .props()
        .shape(payload),
    ).toMatchSnapshot();
  });

  it('should handle click on all bars', () => {
    wrapper.setProps({ timeSeries: stacked, yKeys });
    wrapper.find('Bar').forEach(n => n.simulate('click'));
    expect(props.onClick).toHaveBeenCalledTimes(3);
  });

  it('should display x reference lines', () => {
    wrapper.setProps({
      xAxisRefLines: [
        { x: '2011-01-01', stroke: 'green', strokeWidth: 2 },
        { x: '2011-01-03', stroke: 'red', strokeWidth: 2 },
      ],
    });
    wrapper.find('ReferenceLine').forEach(line => {
      expect(line).toMatchSnapshot();
    });
  });

  it('should display y reference lines', () => {
    wrapper.setProps({
      yAxisRefLines: [
        { y: 80, stroke: 'green', strokeWidth: 2 },
        { y: 55, stroke: 'red', strokeWidth: 2 },
      ],
    });
    wrapper.find('ReferenceLine').forEach(line => {
      expect(line).toMatchSnapshot();
    });
  });
});
