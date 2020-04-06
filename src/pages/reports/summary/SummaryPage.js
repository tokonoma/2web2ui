import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { refreshSummaryReport } from 'src/actions/summaryChart';
import { refreshReportOptions } from 'src/actions/reportOptions';
import { Page, Panel } from 'src/components/matchbox';
import { Loading } from 'src/components';
import ReportOptions from '../components/ReportOptions';
import { Table, MetricsModal, ChartGroup, ChartHeader } from './components';
import { selectSummaryChartSearchOptions } from 'src/selectors/reportSearchOptions';
import { selectReportsEnhancementsEnabled } from 'src/selectors/customReports';
import styles from './SummaryPage.module.scss';
import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import _ from 'lodash';

export class SummaryReportPage extends Component {
  state = {
    metricsModal: false,
    eventTime: 'real',
    scale: 'linear',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.reportOptions !== this.props.reportOptions) {
      this.props.refreshSummaryReport(this.props.reportOptions);
    }
  }

  renderLoading() {
    const { chart } = this.props;
    if (chart.chartLoading) {
      return (
        <div className={styles.Loading}>
          <Loading />
        </div>
      );
    }
  }

  handleMetricsApply = selectedMetrics => {
    this.setState({ metricsModal: false });
    this.props.refreshReportOptions({ metrics: selectedMetrics });
  };

  handleMetricsModal = () => {
    this.setState({ metricsModal: !this.state.metricsModal });
  };

  handleTimeClick = time => {
    this.setState({ eventTime: time });
  };

  handleScaleClick = scale => {
    this.setState({ scale });
  };

  render() {
    const {
      chart,
      summarySearchOptions = {},
      enhancementsEnabled,
      featureFlaggedMetrics,
    } = this.props;
    const { to, timezone = '', precision } = summarySearchOptions;
    const { scale, eventTime, metricsModal } = this.state;

    return (
      <Page title="Summary Report">
        <ReportOptions
          reportLoading={chart.chartLoading}
          searchOptions={summarySearchOptions}
          customReportsEnabled={enhancementsEnabled}
        />
        <div data-id="summary-chart">
          <Panel>
            <Panel.Section
              className={classnames(styles.ChartSection, chart.chartLoading && styles.pending)}
            >
              <ChartHeader
                selectedMetrics={chart.metrics}
                selectedTime={eventTime}
                selectedScale={scale}
                onScaleClick={this.handleScaleClick}
                onTimeClick={this.handleTimeClick}
                onMetricsToggle={this.handleMetricsModal}
              />
              <ChartGroup {...chart} to={to} yScale={scale} />
              {featureFlaggedMetrics.useMetricsRollup && (
                <div className={styles.TimezonePrecision}>
                  <b>Timezone - </b> {timezone.replace(/_/g, ' ')}
                  <b className={styles.Precision}>Precision - </b>{' '}
                  {_.startCase(_.words(precision).join(' '))}
                </div>
              )}
            </Panel.Section>

            {this.renderLoading()}
          </Panel>
        </div>
        <div data-id="summary-table">
          <Table />
        </div>

        <MetricsModal
          selectedMetrics={chart.metrics}
          open={metricsModal}
          onCancel={this.handleMetricsModal}
          onSubmit={this.handleMetricsApply}
        />
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  chart: state.summaryChart,
  reportOptions: state.reportOptions,
  summarySearchOptions: selectSummaryChartSearchOptions(state),
  enhancementsEnabled: selectReportsEnhancementsEnabled(state),
  featureFlaggedMetrics: selectFeatureFlaggedMetrics(state),
});

const mapDispatchToProps = {
  refreshReportOptions,
  refreshSummaryReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryReportPage);
