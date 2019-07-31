import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Page, Panel, Tooltip } from '@sparkpost/matchbox';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import { ApiErrorBanner, DeleteModal, Loading, DisplayDate } from 'src/components';
import { Templates } from 'src/components/images';
import AlertCollectionNew from './components/AlertCollectionNew';
import withAlertsList from './containers/ListPageNew.container';
import styles from './ListPage.module.scss';
import _ from 'lodash';

export class ListPageNew extends Component {
  state = {
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.listAlerts();
  }

  openDeleteModal = ({ id, name } = {}) => {
    this.setState({
      alertToDelete: { id, name }
    });
  };

  closeDeleteModal = () => {
    this.setState({
      alertToDelete: {}
    });
  };

  handleDelete = () => {
    const { id } = this.state.alertToDelete;

    return this.props.deleteAlert({ id }).then(() => {
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

    const { recentlyTriggeredAlerts } = this.props;
    if (recentlyTriggeredAlerts.length === 0) {
      return;
    }

    return (
      <>
        <h3>Recent Alerts</h3>
        <Grid>
          {recentlyTriggeredAlerts.map((alert) => (
            <Grid.Column
              xs={12}
              md={6}
              lg={3}
              key = {alert.id}>
              <Panel accent>
                <Panel.Section className = {styles.LastTriggeredCard}>
                  <div className = {styles.LastTriggeredTime} >
                    <DisplayDate timestamp={alert.last_triggered_timestamp} formattedDate={alert.last_triggered_formatted} />
                  </div>
                  <h3>{alert.name}</h3>
                </Panel.Section>
                <Panel.Section className = {styles.Footer}>
                  <Tooltip content='View Details' width='100px'>
                    <Button flat component={Link} to = {`/alerts-new/details/${alert.id}`}><RemoveRedEye className = {styles.Icon}/></Button>
                  </Tooltip>
                </Panel.Section>
              </Panel>
            </Grid.Column>))}
        </Grid>
        </>);
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          Use alerts to be notified when important changes occur in your Health Score, bounce rates, and email usage.
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
        primaryAction={{ content: 'Create an Alert', to: '/alerts-new/create', component: Link }}
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
