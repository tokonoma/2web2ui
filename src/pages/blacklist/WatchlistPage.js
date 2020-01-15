import React, { useState, useEffect } from 'react';
import { Button, Page } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import { selectBlacklistedCount } from 'src/selectors/blacklist';
import { listMonitors } from 'src/actions/blacklist';
import MonitorsCollection from './components/MonitorsCollection';
import StopMonitoringModal from './components/StopMonitoringModal';
import CongratsBanner from './components/CongratsBanner';
import styles from './WatchlistPage.module.scss';

export const WatchlistPage = props => {
  const { loading, listMonitors, monitors, hasBlacklisted, error } = props;

  const [showCongrats, setShowCongrats] = useState(true);
  const [monitorToDelete, setMonitorToDelete] = useState(null);

  const closeModal = () => setMonitorToDelete(null);

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
            message={'Sorry, we seem to have had some trouble loading your monitored resources.'}
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
          <MonitorsCollection monitors={monitors} handleDelete={setMonitorToDelete} />
        </div>
      </>
    );
  };

  return (
    <Page
      title="Watched IPs and Domains"
      breadcrumbAction={{
        content: 'Blacklisting Incidents',
        to: '/blacklist/incidents',
        component: Link,
      }}
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
        Below are your watched IP addresses and domains. Select any one below to learn more or make
        updates.
      </p>
      {renderContent()}
      <StopMonitoringModal monitorToDelete={monitorToDelete} closeModal={closeModal} />
    </Page>
  );
};

const mapStateToProps = state => ({
  hasBlacklisted: selectBlacklistedCount(state) > 0,
  monitors: state.blacklist.monitors,
  error: state.blacklist.monitorsError,
  loading: state.blacklist.monitorsPending,
});
export default connect(mapStateToProps, { listMonitors })(WatchlistPage);
