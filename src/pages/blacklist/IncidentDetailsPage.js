import React, { useEffect } from 'react';
import { Page, Panel, Grid } from '@sparkpost/matchbox';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ApiErrorBanner, Loading } from 'src/components';
import {
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
} from 'src/actions/blacklist';
import {
  selectIncident,
  selectRelatedIncidentsForResource,
  selectRelatedIncidentsForBlacklist,
} from 'src/selectors/blacklist';
import IncidentDetails from './components/IncidentDetails';
import RelatedIncidents from './components/RelatedIncidents';

export const IncidentDetailsPage = ({
  id,
  error,
  loading,
  incident,
  incidentsForBlacklist,
  incidentsForResource,
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
}) => {
  useEffect(() => {
    getIncident(id).then(incident => {
      listIncidentsForResource(incident.resource);
      listIncidentsForBlacklist(incident.blacklist_name);
    });
  }, [getIncident, id, listIncidentsForBlacklist, listIncidentsForResource]);

  if (loading) {
    return <Loading />;
  }

  const { blacklist_name, resource, days_listed, resolved_at_timestamp, occurred_at_timestamp } =
    incident || {};

  const renderContent = () => {
    if (error) {
      return (
        <div data-id="error-banner">
          <ApiErrorBanner
            message={'Sorry, we seem to have had some trouble loading your blacklist incidents.'}
            errorDetails={error.message}
            reload={() => {
              getIncident(id);
            }}
          />
        </div>
      );
    }

    return (
      <>
        <Panel sectioned>
          <IncidentDetails
            resourceName={resource}
            blacklistName={blacklist_name}
            listedTimestamp={occurred_at_timestamp}
            resolvedTimestamp={resolved_at_timestamp}
            daysListed={days_listed}
            historicalIncidents={[]}
          />
        </Panel>

        <Grid>
          <Grid.Column lg={6} xs={12}>
            <Panel>
              <RelatedIncidents
                incident={{ ...incident, id }}
                incidents={incidentsForBlacklist}
                type="blacklist"
                header={`Recent ${blacklist_name} Incidents`}
              />
            </Panel>
          </Grid.Column>
          <Grid.Column lg={6} xs={12}>
            <Panel>
              <RelatedIncidents
                incident={{ ...incident, id }}
                incidents={incidentsForResource}
                header={`Recent ${resource} Incidents`}
              />
            </Panel>
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
    id,
    incident: selectIncident(state),
    incidentsForResource: selectRelatedIncidentsForResource(state),
    incidentsForBlacklist: selectRelatedIncidentsForBlacklist(state),
    error: state.blacklist.incidentError,
    loading: state.blacklist.incidentPending,
  };
};
export default connect(mapStateToProps, {
  getIncident,
  listIncidentsForResource,
  listIncidentsForBlacklist,
})(IncidentDetailsPage);
