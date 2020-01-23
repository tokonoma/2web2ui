import moment from 'moment';
import _ from 'lodash';
import { getPrecisionType } from './metrics';
import { roundToPlaces } from 'src/helpers/units';

function getDayLines(data, precision = 'day') {
  if (getPrecisionType(precision) !== 'hour') {
    return [];
  }
  const lastIndex = data.length - 1;
  return data.filter(({ ts }, i) => {
    if (i === 0 || i === lastIndex) {
      return false;
    }
    if (moment(ts).hours() !== 0) {
      return false;
    }
    return true;
  });
}

const getTimeTickFormatter = _.memoize(precisionType => {
  const format = tickFormat => tick => moment(tick).format(tickFormat);
  switch (precisionType) {
    case 'hour':
    case 'hours':
      return format('h:mma');

    case 'day':
    case 'days':
    case 'week':
    case 'weeks':
      return format('MMM Do');

    case 'month':
    case 'months':
      return format('MMM');

    default:
      return format('MMM Do');
  }
});

const getTooltipLabelFormatter = _.memoize(precisionType => {
  const format = labelFormat => label => moment(label).format(labelFormat);
  switch (precisionType) {
    case 'hour':
    case 'hours':
      return format('MMM Do [at] LT');

    case 'day':
    case 'days':
      return format('MMMM Do');

    case 'week':
    case 'weeks':
      return label => {
        const endDate = moment(label).add(6, 'days');
        return `${moment(label).format('MMM Do')} - ${endDate.format('MMM Do')}`;
      };

    case 'month':
    case 'months':
      return format('MMMM YYYY');

    default:
      return format('MMMM Do');
  }
});

function getLineChartFormatters(precision) {
  const formatters = {};
  const precisionType = getPrecisionType(precision);
  console.log(precisionType);
  formatters.xTickFormatter = getTimeTickFormatter(precisionType);
  formatters.tooltipLabelFormatter = getTooltipLabelFormatter(precisionType);

  return formatters;
}

const formatYAxisPercent = _.memoize(v => `${roundToPlaces(v, v < 1 ? 3 : 1)}%`);

export {
  getDayLines,
  getTimeTickFormatter,
  getTooltipLabelFormatter,
  getLineChartFormatters,
  formatYAxisPercent,
};
