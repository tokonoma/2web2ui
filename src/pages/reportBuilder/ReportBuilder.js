import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { refreshSummaryReport } from 'src/actions/summaryChart';
import { Page, Panel } from 'src/components/matchbox';
import { Loading } from 'src/components';
import { Table } from '../reports/summary/components'; //TODO: Remove usage of these components
import { ReportOptions } from './components';
import Charts from './components/Charts';
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
}) {
  useEffect(() => {
    refreshSummaryReport(reportOptions);
  }, [refreshSummaryReport, reportOptions]);

  const renderLoading = () => {
    if (chart.chartLoading) {
      return (
        <div className={styles.Loading}>
          <Loading />
        </div>
      );
    }
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
            <Charts {...chart} metrics={processedMetrics} to={to} yScale={'linear'} />
          </Panel.Section>

          {renderLoading()}
        </Panel>
      </div>
      <div data-id="summary-table">
        <Table />
      </div>
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
  refreshSummaryReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportBuilder);
