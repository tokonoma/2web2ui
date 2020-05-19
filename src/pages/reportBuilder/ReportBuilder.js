import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { refreshSummaryReport } from 'src/actions/summaryChart';
import { refreshReportOptions } from 'src/actions/reportOptions';
import { Button, Grid, Page, Panel } from 'src/components/matchbox';
import { Loading } from 'src/components';
import { list as metricsList } from 'src/config/metrics';
import { Table, MetricsModal, ChartGroup } from '../reports/summary/components'; //TODO: Remove usage of these components
import ReportOptions from './components/ReportOptions';
import {
  selectSummaryChartSearchOptions,
  selectSummaryMetricsProcessed,
} from 'src/selectors/reportSearchOptions';
import styles from './ReportBuilder.module.scss';

export function ReportBuilder({
  chart,
  processedMetrics,
  reportOptions,
  summarySearchOptions = {},
  refreshSummaryReport,
  refreshReportOptions,
}) {
  useEffect(() => {
    refreshSummaryReport(reportOptions);
  }, [refreshSummaryReport, reportOptions]);
  const [metricsModal, setMetricsModal] = useState(false);

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

  const { to } = summarySearchOptions;
  //TODO: Make sure to replace these components with new ones
  return (
    <Page title="Analytics Report">
      <ReportOptions reportLoading={chart.chartLoading} searchOptions={summarySearchOptions} />
      <div data-id="summary-chart">
        <Panel>
          <Panel.Section>
            <Grid>
              <div className={styles.SelectMetrics}>
                <Button size="small" onClick={handleMetricsModal}>
                  Select Metrics
                </Button>
              </div>
            </Grid>
          </Panel.Section>
          <Panel.Section
            className={classnames(styles.ChartSection, chart.chartLoading && styles.pending)}
          >
            <ChartGroup {...chart} metrics={processedMetrics} to={to} yScale={'linear'} />
          </Panel.Section>

          {renderLoading()}
        </Panel>
      </div>
      <div data-id="summary-table">
        <Table />
      </div>

      <MetricsModal
        maxMetrics={metricsList.length + 1}
        selectedMetrics={processedMetrics}
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
  processedMetrics: selectSummaryMetricsProcessed(state),
  summarySearchOptions: selectSummaryChartSearchOptions(state),
});

const mapDispatchToProps = {
  refreshReportOptions,
  refreshSummaryReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportBuilder);
