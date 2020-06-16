import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { tokens } from '@sparkpost/design-tokens-hibana';
import { refreshSummaryReport } from 'src/actions/summaryChart';
import { Page, Panel } from 'src/components/matchbox';
import { Loading, Unit } from 'src/components';
import { Table } from '../reports/summary/components'; //TODO: Remove usage of these components
import { Box, Grid, Inline } from 'src/components/matchbox';
import { Definition } from 'src/components/text';
import { ReportOptions } from './components';
import Charts from './components/Charts';
import {
  selectSummaryChartSearchOptions,
  selectSummaryMetricsProcessed,
} from 'src/selectors/reportSearchOptions';
import styles from './ReportBuilder.module.scss';
import moment from 'moment';

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

  const { to, from } = summarySearchOptions;
  const dateLabelValue = {
    label: 'Date',
    value: `${moment(from).format('MMM Do')} - ${moment(from).format('MMM Do, YYYY')}`,
  };

  const renderAggregateMetric = useCallback(({ label, value, unit }) => {
    return (
      <Definition>
        <Definition.Label>
          <Box color={tokens.color_gray_600}>{label}</Box>
        </Definition.Label>
        <Definition.Value>
          <Box color={tokens.color_white}>
            <Unit value={value} unit={unit} />
          </Box>
        </Definition.Value>
      </Definition>
    );
  }, []);

  return (
    <Page title="Analytics Report">
      <ReportOptions reportLoading={chart.chartLoading} searchOptions={summarySearchOptions} />
      <div data-id="summary-chart">
        <Panel>
          <Panel.Section>
            <Box className={styles.ChartSection}>
              <Charts {...chart} metrics={processedMetrics} to={to} yScale={'linear'} />
            </Box>
          </Panel.Section>
          <Box padding="400" backgroundColor={tokens.color_gray_1000}>
            <Grid>
              <Grid.Column sm={3}>
                <Box id={'date'}>{renderAggregateMetric(dateLabelValue)}</Box>
              </Grid.Column>
              <Grid.Column sm={9}>
                <Inline space="600">
                  {chart.aggregateData.map(metric => {
                    return (
                      <Box marginRight="600" key={metric.key}>
                        {renderAggregateMetric(metric)}
                      </Box>
                    );
                  })}
                </Inline>
              </Grid.Column>
            </Grid>
          </Box>
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
