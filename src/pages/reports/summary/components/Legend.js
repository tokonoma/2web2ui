import React from 'react';
import { connect } from 'react-redux';
import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import getConfig from 'src/helpers/getConfig';
import styles from './Legend.module.scss';

function renderMetric(metric) {
  return (
    <div className={styles.Metric} key={metric.name}>
      <span className={styles.Color} style={{ backgroundColor: metric.stroke }} />
      {metric.label}
    </div>
  );
}

function renderRollupMetric(metric, uniqueLabel) {
  return (
    <div className={styles.Metric} key={metric.name}>
      <span className={styles.Color} style={{ backgroundColor: metric.stroke }} />
      {metric.isUniquePerTimePeriod ? `${metric.label} ${uniqueLabel}` : metric.label}
    </div>
  );
}

export const Legend = props => {
  const { metrics, featureFlaggedMetrics, reportOptions } = props;
  const { useMetricsRollup } = featureFlaggedMetrics;
  const { precision } = reportOptions;

  if (useMetricsRollup) {
    const metricsRollupPrecisionMap = getConfig('metricsRollupPrecisionMap');
    const precisionObj = metricsRollupPrecisionMap.find(p => p.value === precision);
    return (
      <div className={styles.Legend}>
        {metrics &&
          metrics.map(metric =>
            renderRollupMetric(metric, precisionObj ? precisionObj.uniqueLabel : ''),
          )}
      </div>
    );
  }

  return <div className={styles.Legend}>{metrics && metrics.map(renderMetric)}</div>;
};

const mapStateToProps = state => ({
  reportOptions: state.reportOptions,
  featureFlaggedMetrics: selectFeatureFlaggedMetrics(state),
});

export default connect(mapStateToProps)(Legend);
