import React, { useEffect } from 'react';
import { Page } from '@sparkpost/matchbox';
import { Users } from 'src/components/images';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import { listMonitors, listIncidents } from 'src/actions/blacklist';
import { selectIncidentsList } from 'src/selectors/blacklist';
import IncidentsCollection from './components/IncidentsCollection';
import styles from './IncidentsPage.module.scss';

export const IncidentsPage = props => {
  const { loading, error, listMonitors, listIncidents, monitors, incidents } = props;

  useEffect(() => {
    listMonitors();
    listIncidents();
  }, [listMonitors, listIncidents]);

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

  if (loading) {
    return <Loading />;
  }

  if (monitors.length > 0 && incidents.length === 0) {
    return <Redirect to="/dashboard" />; //TODO redirect to watchlist page
  }

  return (
    <Page
      empty={{
        show: monitors.length === 0,
        title: 'Blacklist Reports',
        image: Users,
        content: (
          <p>
            Monitor blacklists for your domains and IPs so you know when your deliverability will be
            affected.
          </p>
        ),
        primaryAction: { content: 'Add to Watch List', to: '/blacklist', component: Link },
      }}
      title="Blacklist Incidents"
      primaryAction={{ content: 'View Watch List', to: '/blacklist', component: Link }}
    >
      <div data-id="incidents-table">
        <div className={styles.Description}>
          Monitor blacklists for your domains and IPs so you know when your deliverability will be
          affected.
        </div>
        <IncidentsCollection incidents={incidents} />
      </div>
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
