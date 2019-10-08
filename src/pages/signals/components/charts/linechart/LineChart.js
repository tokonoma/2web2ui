import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, ComposedChart, Bar, Dot, Line, Tooltip, XAxis, YAxis, CartesianGrid, Rectangle } from 'recharts';
import TooltipWrapper from '../tooltip/Tooltip';

class LineChart extends Component {
  renderDot = (fill) => ({ payload, ...dot }) => {
    const { xKey, selected } = this.props;

    if (payload[xKey] !== selected) {
      return null;
    }

    return <Dot {...dot} fill={fill} style={{ pointerEvents: 'none' }} />;
  }

  renderActiveDot = (dot) => <Dot {...dot} style={{ pointerEvents: 'none' }} />

  renderLine = ({ key, stroke }) => {
    const { lineType } = this.props;
    return (
      <Line
        style={{ pointerEvents: 'none' }}
        dataKey={key}
        dot={this.renderDot(stroke)}
        activeDot={this.renderActiveDot}
        isAnimationActive={false}
        key={key}
        onClick={this.props.onClick}
        stroke={stroke}
        strokeWidth={1.5}
        type={lineType}
      />
    );
  }

  renderLines = () => {
    const { yKeys, yKey, stroke } = this.props;

    if (yKeys) {
      return yKeys.map(this.renderLine);
    }

    return this.renderLine({ key: yKey, stroke });
  }

  renderBackgrounds = () => {
    const { xKey, selected, shouldHighlightSelected, onClick } = this.props;

    return (
      <Bar
        cursor='pointer'
        dataKey='noKey'
        fill='#5DCFF5'
        isAnimationActive={false}
        onClick={onClick}
        shape={
          ({ payload, background, ...rest }) => (
            <Rectangle {...rest} {...background} opacity={(payload[xKey] === selected && shouldHighlightSelected) ? 0.4 : 0} />
          )
        }
      />
    );
  }

  render() {
    const { height, margin, lines, tooltipContent, tooltipWidth, width, xKey, xAxisProps, yDomain, yAxisProps } = this.props;

    return (
      <ResponsiveContainer height={height} width={width} className='SignalsBarChart'>
        <ComposedChart barCategoryGap={0} data={lines} margin={margin}>
          {this.renderBackgrounds()}
          <CartesianGrid
            vertical={false}
            stroke='#e1e1e6'
            shapeRendering='crispEdges'
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={30}
            minTickGap={2}
            domain={yDomain}
            {...yAxisProps}
          />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey={xKey}
            type='category'
            padding={{ left: 6, right: 6 }}
            shapeRendering='crispEdges'
            {...xAxisProps}
          />
          <Tooltip
            offset={25}
            cursor={false}
            isAnimationActive={false}
            content={<TooltipWrapper children={tooltipContent} />}
            width={tooltipWidth}
            position={{ x: 0, y: 0 }}
          />
          {this.renderLines()}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}

LineChart.propTypes = {
  lineType: PropTypes.string,
  onClick: PropTypes.func,
  tooltipContent: PropTypes.func,
  tooltipWidth: PropTypes.string,
  yKeys: PropTypes.arrayOf(PropTypes.object)
};

LineChart.defaultProps = {
  stroke: '#000',
  height: 250,
  width: '99%',
  lineType: 'linear',
  margin: { top: 12, left: 18, right: 0, bottom: 5 },
  xKey: 'date',
  yKey: 'value',
  yRange: ['auto', 'auto']
};

export default LineChart;
