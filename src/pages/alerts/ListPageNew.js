import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Page, Panel } from '@sparkpost/matchbox';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import { ApiErrorBanner, DeleteModal, Loading, DisplayDate } from 'src/components';
import { Templates } from 'src/components/images';
import AlertCollectionNew from './components/AlertCollectionNew';
import withAlertsList from './containers/ListPage.container';
import styles from './ListPage.module.scss';
import { formatDateTime } from 'src/helpers/date';
import _ from 'lodash';

export class ListPageNew extends Component {
  state = {
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.listAlerts();
  }

  openDeleteModal = ({ id, name, subaccount_id } = {}) => {
    this.setState({
      alertToDelete: { id, name, subaccountId: subaccount_id }
    });
  };

  closeDeleteModal = () => {
    this.setState({
      alertToDelete: {}
    });
  };

  handleDelete = () => {
    const { id, subaccountId } = this.state.alertToDelete;

    return this.props.deleteAlert({ id, subaccountId }).then(() => {
      this.props.showAlert({ type: 'success', message: 'Alert deleted' });
      this.closeDeleteModal();
    });
  }

  renderCollection() {
    return (
      <AlertCollectionNew
        alerts={this.props.alerts}
        handleDelete={this.openDeleteModal}
      />
    );
  }

  renderRecentlyTriggered() {

    //TODO replace alert metric/name with last triggered date and replace link
    const orderedAlerts = [...this.props.alerts].sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return -1;
    }).slice(0,4);

    //TODO remove when real data is available through API
    const timestamp = '2019-06-05T20:29:59.000Z';
    const lastTriggeredDate = formatDateTime(timestamp);

    const recentlyTriggered = orderedAlerts.map((alert) => (<Grid.Column
      xs={12}
      md={6}
      lg={3}
      key = {alert.id}>
      <Panel
        accent
      >
        <Panel.Section className = {styles.LastTriggeredCard}>
          <div className = {styles.LastTriggeredTime} ><DisplayDate timestamp={timestamp} formattedDate={lastTriggeredDate} /></div>
          <h3>{alert.name}</h3>
        </Panel.Section>

        <Panel.Section className = {styles.Footer}>
          <Button flat to = {'/alerts-new'}><RemoveRedEye className = {styles.Icon}/></Button>
        </Panel.Section>
      </Panel>
    </Grid.Column>));
    return (
      <>
        <h3>Recently Triggered Alerts</h3>
        <Grid>
          {recentlyTriggered}
        </Grid>
        </>);
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          Use alerts to be notified about when important changes occur in your Health Score, bounce rates, and email usage.
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
        title='Alerts'
        primaryAction={{ content: 'Create an Alert', to: '/alerts/create', component: Link }}
        empty={{
          show: !error && alerts.length === 0,
          image: Templates,
          title: 'Create an Alert',
          content: <p>Manage notifications that alert you of performance problems.</p>
        }}
      >
        {error ? this.renderError() : this.renderPage()}
        <DeleteModal
          open={isDeleteModalOpen}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert "<strong>{alertToDelete.name}</strong>" will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.closeDeleteModal}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlertsList(ListPageNew);
