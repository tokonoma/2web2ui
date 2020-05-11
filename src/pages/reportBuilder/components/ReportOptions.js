import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  addFilters,
  removeFilter,
  refreshReportOptions,
  refreshTypeaheadCache,
  initTypeaheadCache,
} from 'src/actions/reportOptions';
import ShareModal from 'src/pages/reports/components/ShareModal'; //TODO: Remove
import PrecisionSelector from 'src/pages/reports/components/PrecisionSelector'; //TODO: Remove
import { Heading } from 'src/components/text';
import { parseSearch } from 'src/helpers/reports';
import { isForcedUTCRollupPrecision } from 'src/helpers/metrics';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import Typeahead from 'src/pages/reports/components/Typeahead'; //TODO: Remove
import { Grid, Inline, Panel, Select, Stack, Tag, Tooltip } from 'src/components/matchbox';
import DatePicker from 'src/components/datePicker/DatePicker';
import typeaheadCacheSelector from 'src/selectors/reportFilterTypeaheadCache';
import { TimezoneTypeahead } from 'src/components/typeahead/TimezoneTypeahead';
import { selectFeatureFlaggedMetrics } from 'src/selectors/metrics';
import _ from 'lodash';
import config from 'src/config';
import OGStyles from './ReportOptions.module.scss';
import hibanaStyles from './ReportOptionsHibana.module.scss';

const { metricsRollupPrecisionMap } = config;
const RELATIVE_DATE_OPTIONS = ['hour', 'day', '7days', '30days', '90days', 'custom'];
const PRECISION_OPTIONS = metricsRollupPrecisionMap.map(({ value }) => ({
  value,
  label: _.startCase(_.words(value).join(' ')),
}));

const PanelContent = ({
  reportOptions,
  reportLoading,
  handleTypeaheadSelect,
  typeaheadCache,
  searchOptions,
}) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

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
            onSelect={handleTypeaheadSelect}
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

const MetricsRollupPanelContent = (
  reportOptions,
  reportLoading,
  handleTypeaheadSelect,
  typeaheadCache,
  handleTimezoneSelect,
  searchOptions,
) => {
  const [shownPrecision, setShownPrecision] = useState('');
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  const updateShownPrecision = shownPrecision => {
    setShownPrecision(shownPrecision);
  };

  const isForcedUTC =
    reportOptions.precision && isForcedUTCRollupPrecision(reportOptions.precision);

  const isShownForcedUTC = shownPrecision && isForcedUTCRollupPrecision(shownPrecision);

  const timezoneDisabled = reportLoading || (isForcedUTC && shownPrecision === '');

  const timezoneTypeahead = (
    <TimezoneTypeahead
      initialValue={reportOptions.timezone}
      onChange={handleTimezoneSelect}
      isForcedUTC={isForcedUTC}
      disabledAndUTCOnly={!!isShownForcedUTC}
      disabled={timezoneDisabled}
    />
  );

  return (
    <>
      <Panel.Section>
        <Grid>
          <Grid.Column xs={9} md={6}>
            <Typeahead
              reportOptions={reportOptions}
              placeholder="Filter by domain, campaign, etc"
              onSelect={handleTypeaheadSelect}
              items={typeaheadCache}
              selected={reportOptions.filters}
              disabled={reportLoading}
            />
          </Grid.Column>
          <Grid.Column xs={3} md={2} mdOffset={4}>
            <ShareModal disabled={reportLoading} searchOptions={searchOptions} />
          </Grid.Column>
        </Grid>
      </Panel.Section>
      <Panel.Section>
        <Grid>
          <Grid.Column xs={12} md={6}>
            <div className={styles.FieldWrapperMetricsRollup}>
              <DatePicker
                {...reportOptions}
                relativeDateOptions={RELATIVE_DATE_OPTIONS}
                disabled={reportLoading}
                onChange={refreshReportOptions}
                roundToPrecision={true}
                selectPrecision={true}
                updateShownPrecision={updateShownPrecision}
              />
            </div>
          </Grid.Column>
          <Grid.Column xs={6} md={4}>
            <div className={styles.TimezoneTooltipWrapper}>
              <Tooltip
                disabled={!isShownForcedUTC && !timezoneDisabled}
                content="Day, week, and month precision only support UTC."
              >
                {timezoneTypeahead}
              </Tooltip>
            </div>
          </Grid.Column>
          <Grid.Column xs={6} md={2}>
            {//We will show a fake selector that shows the temporary precision when the user
            //is selecting dates using the datepicker but has not confirmed the selection
            !this.state.shownPrecision ? (
              <PrecisionSelector
                from={reportOptions.from}
                to={reportOptions.to}
                selectedPrecision={reportOptions.precision}
                changeTime={refreshReportOptions}
                disabled={reportLoading}
              />
            ) : (
              <Select
                label="Precision"
                options={PRECISION_OPTIONS}
                value={this.state.shownPrecision}
                disabled={reportLoading}
                readOnly
              />
            )}
          </Grid.Column>
        </Grid>
      </Panel.Section>
    </>
  );
};

export function ReportOptions(props) {
  const {
    removeFilter,
    addFilters,
    refreshReportOptions,
    reportOptions,
    typeaheadCache,
    reportLoading,
    searchOptions,
    featureFlaggedMetrics,
    location,
    initTypeaheadCache,
  } = props;

  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  useEffect(() => {
    const { options, filters = [] } = parseSearch(location.search);
    addFilters(filters);
    refreshReportOptions(options);
    initTypeaheadCache();
  }, [addFilters, initTypeaheadCache, location.search, refreshReportOptions]);

  const handleFilterRemove = index => {
    removeFilter(index);
  };

  const handleTypeaheadSelect = item => {
    addFilters([item]);
  };

  const handleTimezoneSelect = timezone => {
    refreshReportOptions({ timezone: timezone.value });
  };

  const ActiveFilters = () => {
    if (!reportOptions.filters.length) {
      return null;
    }

    const filtersWithIndex = reportOptions.filters.map((value, index) => ({ ...value, index }));
    const groupedFilters = _.groupBy(filtersWithIndex, 'type');

    return (
      <Panel.Section>
        <Inline>
          <Heading as="h2" looksLike="h5">
            Filters
          </Heading>
          <Stack>
            {Object.keys(groupedFilters).map(key => (
              <Inline key={`filter_group_${key}`}>
                <div>{key}</div>
                <div>
                  <strong style={{ fontStyle: 'italic' }}>equals</strong>
                  {groupedFilters[key].map(({ value, index }) => (
                    <Tag
                      className={styles.TagWrapper}
                      key={`tag_${index}`}
                      onRemove={() => handleFilterRemove(index)}
                    >
                      {value}
                    </Tag>
                  ))}
                </div>
              </Inline>
            ))}
          </Stack>
        </Inline>
      </Panel.Section>
    );
  };

  return (
    <div data-id="report-options">
      <Panel>
        <Panel.Section>
          {/* TODO: Will become date picker section */}
          {featureFlaggedMetrics.useMetricsRollup ? (
            <MetricsRollupPanelContent
              reportOptions={reportOptions}
              handleTypeaheadSelect={handleTypeaheadSelect}
              typeaheadCache={typeaheadCache}
              searchOptions={searchOptions}
              handleTimezoneSelect={handleTimezoneSelect}
              reportLoading={reportLoading}
            />
          ) : (
            <PanelContent
              reportOptions={reportOptions}
              handleTypeaheadSelect={handleTypeaheadSelect}
              typeaheadCache={typeaheadCache}
              searchOptions={searchOptions}
              reportLoading={reportLoading}
            />
          )}
        </Panel.Section>
        <ActiveFilters />
      </Panel>
    </div>
  );
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
