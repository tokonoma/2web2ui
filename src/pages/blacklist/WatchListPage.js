import React, { useState, useEffect } from 'react';
import { Button, Page } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import { selectBlacklistedCount } from 'src/selectors/blacklist';
import { listMonitors } from 'src/actions/blacklist';
import MonitorsCollection from './components/MonitorsCollection';
import CongratsBanner from './components/CongratsBanner';
import styles from './WatchListPage.module.scss';

export const WatchListPage = props => {
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
          <CongratsBanner onDismiss={() => setShowCongrats(false)} />
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
          <Button
            primary
            component={Link}
            to={`/blacklist/watchlist/add`}
            className={styles.Buttons}
          >
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
export default connect(mapStateToProps, { listMonitors })(WatchListPage);
