import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Page, Panel } from '@sparkpost/matchbox';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';
import { ApiErrorBanner, DeleteModal, Loading } from 'src/components';
import { Templates } from 'src/components/images';
import AlertCollectionNew from './components/AlertCollectionNew';
import withAlertsList from './containers/ListPage.container';
import styles from './ListPage.module.scss';


export class ListPageNew extends Component {
  state = {
    showDeleteModal: false,
    alertToDelete: {}
  }

  componentDidMount() {
    this.props.listAlerts();
  }

  toggleDelete = ({ id, name, subaccount_id } = {}) => {
    this.setState({
      showDeleteModal: !this.state.showDeleteModal,
      alertToDelete: { id, name, subaccountId: subaccount_id }
    });
  };

  handleDelete = () => {
    const { id, subaccountId } = this.state.alertToDelete;

    return this.props.deleteAlert({ id, subaccountId }).then(() => {
      this.props.showAlert({ type: 'success', message: 'Alert deleted' });
      this.toggleDelete();
    });
  }

  renderCollection() {
    return (
      <AlertCollectionNew
        alerts={this.props.alerts}
        toggleDelete={this.toggleDelete}
      />
    );
  }

  renderRecent() {

    const orderedAlerts = [...this.props.alerts].sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return -1;
    }).slice(0,4);


    const grids = orderedAlerts.map((alert) => (<Grid.Column
      xs={12}
      md={6}
      lg={3}
      key = {alert.id}>
      <Panel
        accent
        sectioned
      >
        <Panel.Section className = {styles.Section}>
          <strong className={styles.Time}>{alert.alert_metric}</strong>
          <strong>{alert.name}</strong>
        </Panel.Section>

        <Panel.Section className = {styles.Footer}>
          <RemoveRedEye />
        </Panel.Section>
      </Panel>
    </Grid.Column>));
    return (
      <>
        <h3>Recently Triggered Alerts</h3>
        <Grid>
          {grids}
        </Grid>
        </>);
  }

  renderPage() {
    return (
      <>
        <p className={styles.Description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus. Faucibus pulvinar
          elementum integer enim neque volutpat ac tincidunt.
        </p>
        {this.renderRecent()}
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
          open={this.state.showDeleteModal}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert "<strong>{this.state.alertToDelete.name}</strong>" will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.toggleDelete}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlertsList(ListPageNew);
