import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { showAlert } from 'src/actions/globalAlert';
import { watchlistAdd } from 'src/actions/blocklist';
import { ButtonWrapper } from 'src/components';
import { PageLink } from 'src/components/links';
import { Button, Page, Panel, TextField } from 'src/components/matchbox';

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
          history.push(`/blocklist/watchlist`);
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
        to: '/blocklist/watchlist',
        component: PageLink,
      }}
    >
      <Panel>
        <form onSubmit={handleSubmit}>
          <Panel.Section>
            <TextField
              id="watchlist-item-input"
              label="IP or Sending Domain"
              placeholder="Add any IPs or domains you want to keep an eye on"
              onChange={onChange}
              error={errorMessage}
              value={resource}
            />
          </Panel.Section>
          <Panel.Section>
            <ButtonWrapper>
              <Button variant="primary" type="submit" disabled={submitPending || !resource}>
                Save
              </Button>

              <Button
                variant="secondary"
                disabled={submitPending || !resource}
                onClick={handleSaveAndAddNew}
              >
                Save and Add Another
              </Button>
            </ButtonWrapper>
          </Panel.Section>
        </form>
      </Panel>
    </Page>
  );
};

const mapStateToProps = state => ({
  submitPending: state.blocklist.watchlistAddPending,
  submitError: state.blocklist.watchlistAddError,
});

export default connect(mapStateToProps, { watchlistAdd, showAlert })(WatchlistAddPage);
