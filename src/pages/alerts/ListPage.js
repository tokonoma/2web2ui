import React, { Component } from 'react';
import { ApiErrorBanner, DeleteModal, Loading, DisplayDate } from 'src/components';
import { PageLink } from 'src/components/links';
import { Box, Grid, Page, Panel, Tag, Stack } from 'src/components/matchbox';
import { Templates } from 'src/components/images';
import AlertCollection from './components/AlertCollection';
import withAlertsList from './containers/ListPage.container';
import OGStyles from './ListPage.module.scss';
import hibanaStyles from './ListPageHibana.module.scss';
import _ from 'lodash';
import { METRICS } from './constants/formConstants';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

export class ListPage extends Component {
  state = {
    alertToDelete: {},
  };

  componentDidMount() {
    this.props.listAlerts();
  }

  openDeleteModal = ({ id, name } = {}) => {
    this.setState({
      alertToDelete: { id, name },
    });
  };

  closeDeleteModal = () => {
    this.setState({
      alertToDelete: {},
    });
  };

  handleDelete = () => {
    const { id } = this.state.alertToDelete;

    return this.props.deleteAlert({ id }).then(() => {
      this.props.showAlert({ type: 'success', message: 'Alert deleted' });
      this.closeDeleteModal();
    });
  };

  renderPage() {
    return (
      <>
        <AlertsPageComponent
          alerts={this.props.alerts}
          recentlyTriggeredAlerts={this.props.recentlyTriggeredAlerts}
          handleDelete={this.openDeleteModal}
        />
      </>
    );
  }
  renderError() {
    const { error, listAlerts } = this.props;
    return (
      <ApiErrorBanner
        message={'Sorry, we seem to have had some trouble loading your alerts.'}
        errorDetails={error.message}
        reload={listAlerts}
      />
    );
  }

  render() {
    const { alerts, deletePending, error, loading } = this.props;
    const { alertToDelete } = this.state;
    const isDeleteModalOpen = !_.isEmpty(alertToDelete);

    if (loading) {
      return <Loading />;
    }

    return (
      <Page
        title="Alerts"
        primaryAction={{ content: 'Create an Alert', to: '/alerts/create', component: PageLink }}
        empty={{
          show: !error && alerts.length === 0,
          image: Templates,
          title: 'Create an Alert',
          content: <p>Manage notifications that alert you of performance problems.</p>,
        }}
      >
        {error ? this.renderError() : this.renderPage()}
        <DeleteModal
          open={isDeleteModalOpen}
          title="Are you sure you want to delete this alert?"
          content={
            <p>
              {'The alert "'}
              <strong>{alertToDelete.name}</strong>
              {'" will be permanently removed. This cannot be undone.'}
            </p>
          }
          onDelete={this.handleDelete}
          onCancel={this.closeDeleteModal}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export const AlertsPageComponent = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const CardSectionComponent = isHibanaEnabled ? Box : Panel.Section;

  const { alerts, recentlyTriggeredAlerts, handleDelete } = props;

  const renderRecentlyTriggered = () => {
    if (recentlyTriggeredAlerts.length === 0) {
      return;
    }

    return (
      <div data-id="recent-incidents">
        <Stack space="400">
          <h3>Recent Incidents</h3>
          <Grid>
            {recentlyTriggeredAlerts.map(alert => (
              <Grid.Column xs={12} md={6} lg={3} key={alert.id}>
                <Panel accent>
                  <CardSectionComponent className={styles.LastTriggeredCard} padding={'400'}>
                    <Box height={'100px'}>
                      <Stack>
                        <PageLink className={styles.AlertName} to={`/alerts/details/${alert.id}`}>
                          <strong data-id="link-alert-name">{alert.name}</strong>
                        </PageLink>
                        <Tag>{METRICS[alert.metric]}</Tag>
                      </Stack>
                    </Box>
                  </CardSectionComponent>
                  <CardSectionComponent className={styles.Footer} padding={'400'}>
                    <Box height={'20px'}>
                      <DisplayDate
                        timestamp={alert.last_triggered_timestamp}
                        formattedDate={alert.last_triggered_formatted}
                      />
                    </Box>
                  </CardSectionComponent>
                </Panel>
              </Grid.Column>
            ))}
          </Grid>
        </Stack>
      </div>
    );
  };

  return (
    <>
      <Box mb={'400'} maxWidth={'57%'}>
        <p className={styles.Description}>
          Use alerts to be notified when important changes occur in your Health Score, bounce rates,
          and email usage.
        </p>
      </Box>
      <Box mb={'400'}>{renderRecentlyTriggered()}</Box>
      <AlertCollection alerts={alerts} handleDelete={handleDelete} />
    </>
  );
};

export default withAlertsList(ListPage);
