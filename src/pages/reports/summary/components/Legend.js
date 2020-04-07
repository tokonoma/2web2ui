import React from 'react';
import { connect } from 'react-redux';
import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import getConfig from 'src/helpers/getConfig';
import styles from './Legend.module.scss';

function renderMetric(metric, uniqueLabel) {
  return (
    <div className={styles.Metric} key={metric.name}>
      <span className={styles.Color} style={{ backgroundColor: metric.stroke }} />
      {metric.isUniquePerTimePeriod && uniqueLabel
        ? `${metric.label} ${uniqueLabel}`
        : metric.label}
    </div>
  );
}

export const Legend = props => {
  const { metrics, featureFlaggedMetrics, reportOptions } = props;
  const { useMetricsRollup } = featureFlaggedMetrics;
  const { precision } = reportOptions;

  const metricsRollupPrecisionMap = getConfig('metricsRollupPrecisionMap');
  const precisionObj = metricsRollupPrecisionMap.find(p => p.value === precision);
  return (
    <div className={styles.Legend}>
      {metrics &&
        metrics.map(metric =>
          renderMetric(metric, precisionObj && useMetricsRollup ? precisionObj.uniqueLabel : ''),
        )}
    </div>
  );
};

const mapStateToProps = state => ({
  reportOptions: state.reportOptions,
  featureFlaggedMetrics: selectFeatureFlaggedMetrics(state),
});

export default connect(mapStateToProps)(Legend);
