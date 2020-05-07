import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { refreshSummaryReport } from 'src/actions/summaryChart';
import { refreshReportOptions } from 'src/actions/reportOptions';
import { Page, Panel } from 'src/components/matchbox';
import { Loading } from 'src/components';
import ReportOptions from '../reports/components/ReportOptions'; //TODO: Remove usage of these components
import { Table, MetricsModal, ChartGroup, ChartHeader } from '../reports/summary/components'; //TODO: Remove usage of these components
import { selectSummaryChartSearchOptions } from 'src/selectors/reportSearchOptions';
import styles from './ReportBuilder.module.scss';

export function ReportBuilder({
  chart,
  reportOptions,
  summarySearchOptions = {},
  refreshSummaryReport,
  refreshReportOptions,
}) {
  useEffect(() => {
    refreshSummaryReport(reportOptions);
  }, [refreshSummaryReport, reportOptions]);

  const [metricsModal, setMetricsModal] = useState(false);
  const [eventTime, setEventTime] = useState('real');
  const [scale, setScale] = useState('linear');

  const renderLoading = () => {
    if (chart.chartLoading) {
      return (
        <div className={styles.Loading}>
          <Loading />
        </div>
      );
    }
  };

  const handleMetricsApply = selectedMetrics => {
    setMetricsModal(false);
    refreshReportOptions({ metrics: selectedMetrics });
  };

  const handleMetricsModal = () => {
    setMetricsModal(!metricsModal);
  };

  const handleTimeClick = time => {
    setEventTime(time);
  };

  const handleScaleClick = scale => {
    setScale(scale);
  };

  const { to } = summarySearchOptions;
  //TODO: Make sure to replace these components with new ones
  return (
    <Page title="Analytics Report">
      <ReportOptions reportLoading={chart.chartLoading} searchOptions={summarySearchOptions} />
      <div data-id="summary-chart">
        <Panel>
          <Panel.Section
            className={classnames(styles.ChartSection, chart.chartLoading && styles.pending)}
          >
            <ChartHeader
              selectedMetrics={chart.metrics}
              selectedTime={eventTime}
              selectedScale={scale}
              onScaleClick={handleScaleClick}
              onTimeClick={handleTimeClick}
              onMetricsToggle={handleMetricsModal}
            />
            <ChartGroup {...chart} to={to} yScale={scale} />
          </Panel.Section>

          {renderLoading()}
        </Panel>
      </div>
      <div data-id="summary-table">
        <Table />
      </div>

      <MetricsModal
        selectedMetrics={chart.metrics}
        open={metricsModal}
        onCancel={handleMetricsModal}
        onSubmit={handleMetricsApply}
      />
    </Page>
  );
}

//Redux
const mapStateToProps = state => ({
  chart: state.summaryChart,
  reportOptions: state.reportOptions,
  summarySearchOptions: selectSummaryChartSearchOptions(state),
});

const mapDispatchToProps = {
  refreshReportOptions,
  refreshSummaryReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportBuilder);
