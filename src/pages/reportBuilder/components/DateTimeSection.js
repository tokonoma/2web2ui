import React, { useState, useCallback } from 'react';
import PrecisionSelector from 'src/pages/reports/components/PrecisionSelector'; //TODO: Remove
import { isForcedUTCRollupPrecision } from 'src/helpers/metrics';
import { Grid, Select, Tooltip } from 'src/components/matchbox';
import DatePicker from 'src/components/datePicker/DatePicker';
import { TimezoneTypeahead } from 'src/components/typeahead/TimezoneTypeahead';
import config from 'src/config';
import styles from './ReportOptions.module.scss';
import _ from 'lodash';

const { metricsRollupPrecisionMap } = config;
const RELATIVE_DATE_OPTIONS = ['hour', 'day', '7days', '30days', '90days', 'custom'];
const PRECISION_OPTIONS = metricsRollupPrecisionMap.map(({ value }) => ({
  value,
  label: _.startCase(_.words(value).join(' ')),
}));

const DateTimeSection = ({
  reportOptions,
  reportLoading,
  handleTimezoneSelect,
  refreshReportOptions,
}) => {
  const [shownPrecision, setShownPrecision] = useState('');

  const updateShownPrecision = useCallback(
    shownPrecision => {
      setShownPrecision(shownPrecision);
    },
    [setShownPrecision],
  );

  const isForcedUTC =
    reportOptions.precision && isForcedUTCRollupPrecision(reportOptions.precision);

  const isShownForcedUTC = shownPrecision && isForcedUTCRollupPrecision(shownPrecision);

  const timezoneDisabled = reportLoading || (isForcedUTC && shownPrecision === '');

  return (
    <Grid>
      <Grid.Column xs={12} md={6}>
        <div className={styles.FieldWrapperMetricsRollup}>
          <label>Date Range</label>
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
            id="timezone-typahead-tooltip"
            disabled={!isShownForcedUTC && !timezoneDisabled}
            content="Day, week, and month precision only support UTC."
          >
            <TimezoneTypeahead
              initialValue={reportOptions.timezone}
              onChange={handleTimezoneSelect}
              isForcedUTC={isForcedUTC}
              disabledAndUTCOnly={!!isShownForcedUTC}
              disabled={timezoneDisabled}
            />
          </Tooltip>
        </div>
      </Grid.Column>
      <Grid.Column xs={6} md={2}>
        {//We will show a fake selector that shows the temporary precision when the user
        //is selecting dates using the datepicker but has not confirmed the selection
        !shownPrecision ? (
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
            value={shownPrecision}
            disabled={reportLoading}
            readOnly
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default DateTimeSection;
