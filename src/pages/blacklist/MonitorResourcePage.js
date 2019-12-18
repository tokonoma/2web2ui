import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Page, Panel, TextField, Button } from '@sparkpost/matchbox';

import { showAlert } from 'src/actions/globalAlert';
import { createMonitor } from 'src/actions/blacklist';

import styles from './MonitorResourcePage.module.scss';

export const MonitorResourcePage = ({
  createMonitor,
  showAlert,
  history,
  submitPending,
  submitError,
}) => {
  const [resource, setResource] = useState('');

  const onChange = useCallback(e => {
    setResource(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      createMonitor(resource)
        .then(({ resource }) => {
          showAlert({ type: 'success', message: `Added ${resource} to Watch List` });
          history.push(`/blacklist/watchlist`);
        })
        .catch(() => {});
    },
    [resource, createMonitor, showAlert, history],
  );

  const errorMessage = submitError ? submitError.message : '';

  return (
    <Page
      title="Add to Watch List"
      breadcrumbAction={{
        content: 'Watched IPs and Domains',
        to: '/blacklist/watchlist',
        component: Link,
      }}
    >
      <Panel sectioned>
        <form onSubmit={handleSubmit}>
          <TextField
            id="watchlist-item-input"
            label="Add IPs or Sending Domains"
            onChange={onChange}
            error={errorMessage}
          />
          <div>
            <Button
              type="submit"
              color="orange"
              disabled={submitPending || !resource}
              className={styles.SaveButton}
            >
              Add to Watchlist
            </Button>
            <Button disabled={submitPending || !resource}>Save and Add Another</Button>
          </div>
        </form>
      </Panel>
    </Page>
  );
};

const mapStateToProps = state => ({
  submitPending: state.blacklist.createMonitorPending,
  submitError: state.blacklist.createMonitorError,
});

export default connect(mapStateToProps, { createMonitor, showAlert })(MonitorResourcePage);
