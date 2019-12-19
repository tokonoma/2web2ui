import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Page, Panel, TextField, Button } from '@sparkpost/matchbox';

import { showAlert } from 'src/actions/globalAlert';
import { watchlistAdd } from 'src/actions/blacklist';

import styles from './WatchlistAddPage.module.scss';

export const WatchlistAddPage = ({
  watchlistAdd,
  showAlert,
  history,
  submitPending,
  submitError,
}) => {
  const [resource, setResource] = useState('');
  const [hideSubmitError, setHideSubmitError] = useState(false);

  const onChange = useCallback(
    e => {
      const newValue = e.target.value;
      setResource(newValue);
      if (submitError && newValue) {
        setHideSubmitError(true);
      }
    },
    [submitError],
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      watchlistAdd(resource)
        .then(({ resource }) => {
          showAlert({ type: 'success', message: `Added ${resource} to Watchlist` });
          history.push(`/blacklist/watchlist`);
        })
        .catch(() => {
          // Don't do anything since `submitError` prop will be passed
        });
    },
    [resource, watchlistAdd, showAlert, history],
  );

  const handleSaveAndAddNew = useCallback(
    e => {
      e.preventDefault();
      setHideSubmitError(false);
      watchlistAdd(resource)
        .then(({ resource }) => {
          showAlert({ type: 'success', message: `Added ${resource} to Watchlist` });
          setResource('');
        })
        .catch(() => {
          // Don't do anything since `submitError` prop will be passed
        });
    },
    [resource, watchlistAdd, showAlert],
  );

  const errorMessage = !hideSubmitError && submitError ? submitError.message : '';

  return (
    <Page
      title="Add to Watchlist"
      breadcrumbAction={{
        content: 'Watchlist',
        to: '/blacklist/watchlist',
        component: Link,
      }}
    >
      <Panel sectioned>
        <form onSubmit={handleSubmit}>
          <TextField
            id="watchlist-item-input"
            label="Add IP or Sending Domain"
            placeholder="10.20.30.40 or email.example.com"
            onChange={onChange}
            error={errorMessage}
            value={resource}
          />
          <div>
            <Button
              type="submit"
              color="orange"
              disabled={submitPending || !resource}
              className={styles.SaveButton}
            >
              Save
            </Button>
            <Button outline disabled={submitPending || !resource} onClick={handleSaveAndAddNew}>
              Save and Add Another
            </Button>
          </div>
        </form>
      </Panel>
    </Page>
  );
};

const mapStateToProps = state => ({
  submitPending: state.blacklist.watchlistAddPending,
  submitError: state.blacklist.watchlistAddError,
});

export default connect(mapStateToProps, { watchlistAdd, showAlert })(WatchlistAddPage);
