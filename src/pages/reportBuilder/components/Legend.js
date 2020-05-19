import React from 'react';
import { connect } from 'react-redux';
import { Inline, Tag, Box } from 'src/components/matchbox';

import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import getConfig from 'src/helpers/getConfig';

function renderMetric(metric, uniqueLabel, removeMetric) {
  return (
    <Tag key={metric.name} onRemove={() => removeMetric(metric.name)}>
      <Box as="span" display="inline-flex" alignItems="center">
        <Box //The color circle
          display="inline-block"
          height="16px"
          width="16px"
          borderRadius="circle"
          backgroundColor={metric.stroke}
          position="relative"
          right="9px"
        />
        <Box>
          {metric.isUniquePerTimePeriod && uniqueLabel
            ? `${metric.label} ${uniqueLabel}`
            : metric.label}
        </Box>
      </Box>
    </Tag>
  );
}

export const Legend = props => {
  const { metrics, featureFlaggedMetrics, reportOptions, removeMetric } = props;
  const { useMetricsRollup } = featureFlaggedMetrics;
  const { precision } = reportOptions;

  const metricsRollupPrecisionMap = getConfig('metricsRollupPrecisionMap');
  const precisionObj = metricsRollupPrecisionMap.find(p => p.value === precision);
  return (
    <Box marginTop="100">
      {metrics && (
        <Inline space="300">
          <Box fontWeight="600">Metrics </Box>
          {metrics.map(metric =>
            renderMetric(
              metric,
              precisionObj && useMetricsRollup ? precisionObj.uniqueLabel : '',
              removeMetric,
            ),
          )}
        </Inline>
      )}
    </Box>
  );
};

const mapStateToProps = state => ({
  reportOptions: state.reportOptions,
  featureFlaggedMetrics: selectFeatureFlaggedMetrics(state),
});

export default connect(mapStateToProps)(Legend);
