import React, { useEffect } from 'react';
import { Page, Panel, Grid } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading, Empty, PanelLoading } from 'src/components';
import {
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
  listHistoricalResolvedIncidents,
} from 'src/actions/blacklist';
import {
  selectIncident,
  selectRelatedIncidentsForResource,
  selectRelatedIncidentsForBlacklist,
  selectHistoricalIncidents,
  selectDetailsPageError,
} from 'src/selectors/blacklist';
import IncidentDetails from './components/IncidentDetails';
import RelatedIncidents from './components/RelatedIncidents';

export const IncidentDetailsPage = ({
  id,
  error,
  loading,
  historicalIncidents,
  incident,
  incidentsForBlacklist,
  incidentsForResource,
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
  listHistoricalResolvedIncidents,
  incidentsForResourcePending,
  incidentsForBlacklistPending,
  historicalIncidentsPending,
}) => {
  useEffect(() => {
    getIncident(id).then(incident => {
      listIncidentsForResource(incident.resource);
      listIncidentsForBlacklist(incident.blacklist_name);
      listHistoricalResolvedIncidents(incident.blacklist_name, incident.resource);
    });
  }, [
    getIncident,
    id,
    listIncidentsForBlacklist,
    listIncidentsForResource,
    listHistoricalResolvedIncidents,
  ]);

  if (loading) {
    return <Loading />;
  }

  const {
    blacklist_name = '',
    resource = '',
    days_listed,
    resolved_at_timestamp,
    occurred_at_timestamp,
  } = incident || {};

  const renderContent = () => {
    if (error) {
      return (
        <div data-id="error-banner">
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your blacklist incidents.'}
            errorDetails={error.message}
            reload={() => {
              getIncident(id).then(incident => {
                listIncidentsForResource(incident.resource);
                listIncidentsForBlacklist(incident.blacklist_name);
                listHistoricalResolvedIncidents(incident.blacklist_name, incident.resource);
              });
            }}
          />
        </div>
      );
    }

    return (
      <>
        {historicalIncidentsPending ? (
          <PanelLoading minHeight={'150px'} />
        ) : (
          <Panel sectioned>
            <IncidentDetails
              resourceName={resource}
              blacklistName={blacklist_name}
              listedTimestamp={occurred_at_timestamp}
              resolvedTimestamp={resolved_at_timestamp}
              daysListed={days_listed}
              historicalIncidents={historicalIncidents}
            />
          </Panel>
        )}

        <Grid>
          <Grid.Column lg={6} xs={12}>
            {incidentsForBlacklistPending ? (
              <PanelLoading />
            ) : incidentsForBlacklist.length ? (
              <Panel>
                <RelatedIncidents
                  incident={{ ...incident, id }}
                  incidents={incidentsForBlacklist}
                  type="blacklist"
                  header={`Recent ${blacklist_name} Incidents`}
                />
              </Panel>
            ) : (
              <Empty message={`No Recent ${blacklist_name} incidents`} />
            )}
          </Grid.Column>
          <Grid.Column lg={6} xs={12}>
            {incidentsForResourcePending ? (
              <PanelLoading />
            ) : incidentsForResource.length ? (
              <Panel>
                <RelatedIncidents
                  incident={{ ...incident, id }}
                  incidents={incidentsForResource}
                  header={`Recent ${resource} Incidents`}
                />
              </Panel>
            ) : (
              <Empty message={`No Recent ${resource} incidents`} />
            )}
          </Grid.Column>
        </Grid>
      </>
    );
  };

  return (
    <Page
      title={`Blacklist Incident | ${resource || ''} | ${blacklist_name || ''}`}
      breadcrumbAction={{
        content: 'Blacklist Incidents',
        to: '/blacklist/incidents',
        component: Link,
      }}
    >
      {renderContent()}
    </Page>
  );
};

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  return {
    historicalIncidents: selectHistoricalIncidents(state),
    historicalIncidentsPending: state.blacklist.historicalIncidentsPending,
    id,
    incident: selectIncident(state),
    incidentsForResource: selectRelatedIncidentsForResource(state),
    incidentsForResourcePending: state.blacklist.incidentsForResourcePending,
    incidentsForBlacklist: selectRelatedIncidentsForBlacklist(state),
    incidentsForBlacklistPending: state.blacklist.incidentsForBlacklistPending,
    error: selectDetailsPageError(state),
    loading: state.blacklist.incidentPending,
  };
};
export default connect(mapStateToProps, {
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
  listHistoricalResolvedIncidents,
})(IncidentDetailsPage);
