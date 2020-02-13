import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Page, Panel, Tag } from '@sparkpost/matchbox';
import { ApiErrorBanner, DeleteModal, Loading, DisplayDate } from 'src/components';
import { Templates } from 'src/components/images';
import AlertCollection from './components/AlertCollection';
import withAlertsList from './containers/ListPage.container';
import styles from './ListPage.module.scss';
import _ from 'lodash';
import { METRICS } from './constants/formConstants';

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

  renderCollection() {
    return <AlertCollection alerts={this.props.alerts} handleDelete={this.openDeleteModal} />;
  }

  renderRecentlyTriggered() {
    const { recentlyTriggeredAlerts } = this.props;
    if (recentlyTriggeredAlerts.length === 0) {
      return;
    }

    return (
      <>
        <h3>Recent Incidents</h3>

        <div data-id="recent-incidents">
          <Grid>
            {recentlyTriggeredAlerts.map(alert => (
              <Grid.Column xs={12} md={6} lg={3} key={alert.id}>
                <Panel accent>
                  <Panel.Section className={styles.LastTriggeredCard}>
                    <Link className={styles.AlertName} to={`/alerts/details/${alert.id}`}>
                      <strong data-id="link-alert-name">{alert.name}</strong>
                    </Link>
                    <Tag>{METRICS[alert.metric]}</Tag>
                  </Panel.Section>
                  <Panel.Section className={styles.Footer}>
                    <DisplayDate
                      timestamp={alert.last_triggered_timestamp}
                      formattedDate={alert.last_triggered_formatted}
                    />
                  </Panel.Section>
                </Panel>
              </Grid.Column>
            ))}
          </Grid>
        </div>
      </>
    );
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          Use alerts to be notified when important changes occur in your Health Score, bounce rates,
          and email usage.
        </p>
        {this.renderRecentlyTriggered()}
        {this.renderCollection()}
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
        primaryAction={{ content: 'Create an Alert', to: '/alerts/create', component: Link }}
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
              The alert "<strong>{alertToDelete.name}</strong>" will be permanently removed. This
              cannot be undone.
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

export default withAlertsList(ListPage);
