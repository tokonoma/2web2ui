import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  addFilters,
  removeFilter,
  refreshReportOptions,
  refreshTypeaheadCache,
  initTypeaheadCache,
} from 'src/actions/reportOptions';
import ShareModal from './ShareModal';
import { parseSearch } from 'src/helpers/reports';
import { Grid } from '@sparkpost/matchbox';
import Typeahead from './Typeahead';
import { Panel, Tag } from 'src/components/matchbox';
import DatePicker from 'src/components/datePicker/DatePicker';
import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import typeaheadCacheSelector from 'src/selectors/reportFilterTypeaheadCache';
import { TimezoneTypeahead } from 'src/components/typeahead/TimezoneTypeahead';
import CustomReports from './CustomReports';
import styles from './ReportOptions.module.scss';

const RELATIVE_DATE_OPTIONS = ['hour', 'day', '7days', '30days', '90days', 'custom'];

export class ReportOptions extends Component {
  componentDidMount() {
    const { options, filters = [] } = parseSearch(this.props.location.search);
    this.props.addFilters(filters);
    this.props.refreshReportOptions(options);

    // initial typeahead cache load
    this.props.initTypeaheadCache();
  }

  renderActiveFilters = () => {
    const { reportOptions } = this.props;
    return reportOptions.filters.length ? (
      <Panel.Section>
        <small>Filters:</small>
        {reportOptions.filters.map((item, index) => (
          <Tag
            key={index}
            onRemove={() => this.handleFilterRemove(index)}
            className={styles.TagWrapper}
          >
            {item.type}: {item.value}
          </Tag>
        ))}
      </Panel.Section>
    ) : null;
  };

  handleFilterRemove = index => {
    this.props.removeFilter(index);
  };

  handleTypeaheadSelect = item => {
    this.props.addFilters([item]);
  };

  getPanelContent = () => {
    const {
      typeaheadCache,
      reportOptions,
      reportLoading,
      refreshReportOptions,
      searchOptions,
      featureFlaggedMetrics,
    } = this.props;

    if (featureFlaggedMetrics.useMetricsRollup) {
      return [
        <Panel.Section>
          <Grid>
            <Grid.Column xs={9} md={7}>
              <Typeahead
                reportOptions={reportOptions}
                placeholder="Filter by domain, campaign, etc"
                onSelect={this.handleTypeaheadSelect}
                items={typeaheadCache}
                selected={reportOptions.filters}
              />
            </Grid.Column>
            <Grid.Column xs={3} md={2} mdOffset={3}>
              <ShareModal disabled={reportLoading} searchOptions={searchOptions} />
            </Grid.Column>
          </Grid>
        </Panel.Section>,
        <Panel.Section>
          <Grid>
            <Grid.Column xs={12} md={6}>
              <div className={styles.FieldWrapper}>
                <DatePicker
                  {...reportOptions}
                  relativeDateOptions={RELATIVE_DATE_OPTIONS}
                  disabled={reportLoading}
                  onChange={refreshReportOptions}
                  roundToPrecision={true}
                />
              </div>
            </Grid.Column>
            <Grid.Column xs={6} md={3}>
              <TimezoneTypeahead timezone={reportOptions.timezone} />
            </Grid.Column>
            <Grid.Column xs={6} md={3}>
              {/* { Precision Picker } */}
            </Grid.Column>
          </Grid>
        </Panel.Section>,
      ];
    }

    return (
      <Panel.Section>
        <Grid>
          <Grid.Column xs={12} md={6}>
            <div className={styles.FieldWrapper}>
              <DatePicker
                {...reportOptions}
                relativeDateOptions={RELATIVE_DATE_OPTIONS}
                disabled={reportLoading}
                onChange={refreshReportOptions}
                roundToPrecision={true}
              />
            </div>
          </Grid.Column>
          <Grid.Column xs={8} md={4} xl={5}>
            <Typeahead
              reportOptions={reportOptions}
              placeholder="Filter by domain, campaign, etc"
              onSelect={this.handleTypeaheadSelect}
              items={typeaheadCache}
              selected={reportOptions.filters}
            />
          </Grid.Column>
          <Grid.Column xs={4} md={2} xl={1}>
            <ShareModal disabled={reportLoading} searchOptions={searchOptions} />
          </Grid.Column>
        </Grid>
      </Panel.Section>
    );
  };

  render() {
    const { customReportsEnabled, searchOptions } = this.props;

    return (
      <div data-id="report-options">
        <Panel>
          {customReportsEnabled && <CustomReports searchOptions={searchOptions} />}
          {this.getPanelContent()}
          {this.renderActiveFilters()}
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reportOptions: state.reportOptions,
  typeaheadCache: typeaheadCacheSelector(state),
  featureFlaggedMetrics: selectFeatureFlaggedMetrics(state),
});

const mapDispatchToProps = {
  addFilters,
  removeFilter,
  refreshReportOptions,
  initTypeaheadCache,
  refreshTypeaheadCache,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportOptions));
