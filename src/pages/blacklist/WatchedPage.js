import React, { useState, useEffect } from 'react';
import { Button, Page, Banner } from '@sparkpost/matchbox';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import { selectBlacklistedCount } from 'src/selectors/blacklist';
import { listMonitors } from 'src/actions/blacklist';
import MonitorsCollection from './components/MonitorsCollection';
import styles from './WatchedPage.module.scss';

export const WatchedPage = props => {
  const { loading, listMonitors, monitors, hasBlacklisted, error } = props;

  const [showCongrats, setShowCongrats] = useState(true);

  useEffect(() => {
    listMonitors();
  }, [listMonitors]);

  if (loading) {
    return <Loading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <div data-id="error-banner">
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your blacklist monitors.'}
            errorDetails={error.message}
            reload={() => {
              listMonitors();
            }}
          />
        </div>
      );
    }

    return (
      <>
        {showCongrats && !hasBlacklisted && (
          <div data-id="congrats-banner">
            <Banner
              title="Congratulations! You are not currently on a Blacklist"
              status="success"
              onDismiss={() => setShowCongrats(false)}
            >
              No blacklist issues detected. Keep up the great work!
            </Banner>
          </div>
        )}
        <div data-id="monitors-table">
          <MonitorsCollection monitors={monitors} />
        </div>
      </>
    );
  };

  return (
    <Page
      title="Watched IPs and Domains"
      primaryArea={
        <>
          <Button color="orange" outline className={styles.Buttons} to="/alerts/create">
            Create Alert
          </Button>
          <Button primary className={styles.Buttons}>
            Add IP or Sending Domain
          </Button>
        </>
      }
    >
      <p className={styles.Description}>
        Monitor blacklists for your domains and IPs so you know when your deliverability will be
        affected.
      </p>
      {renderContent()}
    </Page>
  );
};

const mapStateToProps = state => ({
  hasBlacklisted: selectBlacklistedCount(state) > 0,
  monitors: state.blacklist.monitors,
  error: state.blacklist.monitorsError,
  loading: state.blacklist.monitorsPending,
});
export default connect(mapStateToProps, { listMonitors })(WatchedPage);
