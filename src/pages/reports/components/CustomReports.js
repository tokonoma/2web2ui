import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addFilters, clearFilters, refreshReportOptions } from 'src/actions/reportOptions';
import { selectCustomReports } from 'src/selectors/customReports';
import { TextField, Panel, Button } from '@sparkpost/matchbox';
import { saveReport, deleteReport } from 'src/actions/customReports';
import { withRouter } from 'react-router-dom';
import CustomReportsList from './CustomReportsList';
import { parseSearch } from 'src/helpers/reports';
import qs from 'query-string';
import _ from 'lodash';

import styles from './CustomReports.module.scss';

function CustomReports(props) {
  const { addFilters, deleteReport, clearFilters, searchOptions, loading, location, refreshReportOptions, reports, saveReport } = props;

  const [name, setName] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleSave() {
    let toSave = searchOptions;

    if (searchOptions.range !== 'custom') {
      toSave = _.omit(toSave, ['to', 'from']);
    }

    saveReport({ name, url: qs.stringify(toSave) });
  }

  // Refreshes report options when url changes
  React.useEffect(() => {
    const { options, filters = []} = parseSearch(location.search);
    clearFilters();
    addFilters(filters);
    refreshReportOptions(options);
  }, [addFilters, clearFilters, location.search, refreshReportOptions]);

  const saveDisabled = loading;
  const saveInvisible = name === '';
  const fieldClasses = classnames(styles.NameWrapper, name === '' && styles.Empty);

  return (
    <Panel.Section>
      <div className={styles.Wrap}>
        <div className={fieldClasses}>
          <TextField
            label='Report Name'
            labelHidden
            placeholder='Untitled Report'
            onChange={handleNameChange}
            value={name}
          />
        </div>

        {!saveInvisible && (
          <Button disabled={saveDisabled} onClick={handleSave} flat color='orange'>
            {loading ? 'Saving...' : 'Save Report'}
          </Button>
        )}

        <div className={styles.ReportsButton}>
          <CustomReportsList
            reports={reports}
            setName={setName}
            onDelete={deleteReport}
            deleting={loading}
          />
        </div>

      </div>
    </Panel.Section>
  );
}

const mapStateToProps = (state) => ({
  reports: selectCustomReports(state),
  loading: state.currentUser.userOptionsPending
});

const mapDispatchToProps = {
  addFilters,
  clearFilters,
  refreshReportOptions,
  saveReport,
  deleteReport
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomReports));
