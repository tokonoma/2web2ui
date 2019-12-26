import React, { useEffect } from 'react';
import { Page } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import { listMonitors, listIncidents } from 'src/actions/blacklist';
import { selectIncidentsList } from 'src/selectors/blacklist';
import IncidentsCollection from './components/IncidentsCollection';
import NoIncidentsBanner from './components/NoIncidentsBanner';
import styles from './IncidentsPage.module.scss';

export const IncidentsPage = props => {
  const { loading, error, listMonitors, listIncidents, incidents } = props;

  useEffect(() => {
    listMonitors();
    listIncidents();
  }, [listMonitors, listIncidents]);

  if (loading) {
    return <Loading />;
  }

  const renderContent = () => {
    if (error) {
      return (
        <div data-id="error-banner">
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your blacklist incidents.'}
            errorDetails={error.message}
            reload={() => {
              listMonitors();
              listIncidents();
            }}
          />
        </div>
      );
    }

    return (
      <div data-id="incidents-table">
        {incidents.length === 0 ? <NoIncidentsBanner /> : null}
        <IncidentsCollection incidents={incidents} />
      </div>
    );
  };

  return (
    <Page
      title="Blacklist Incidents"
      primaryAction={{ content: 'View Watchlist', to: '/blacklist/watchlist', component: Link }}
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
  incidents: selectIncidentsList(state),
  monitors: state.blacklist.monitors,
  error: state.blacklist.incidentsError || state.blacklist.monitorsError,
  loading: state.blacklist.incidentsPending || state.blacklist.monitorsPending,
});
export default connect(mapStateToProps, { listMonitors, listIncidents })(IncidentsPage);
