import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Page, Button } from '@sparkpost/matchbox';
import { Delete, ContentCopy } from '@sparkpost/matchbox-icons';
import { DeleteModal, Loading } from 'src/components';
import withAlert from './containers/DetailsPage.container';
import { AlertDetails } from './components/AlertDetails';
import RedirectAndAlert from 'src/components/globalAlert/RedirectAndAlert';
import styles from './DetailsPage.module.scss';
import _ from 'lodash';

export class DetailsPage extends Component {
  state = {
    isDeleteModalOpen: false
  };

  componentDidMount() {
    const { id, getAlert, hasSubaccounts, listSubaccounts } = this.props;
    getAlert({ id });
    if (hasSubaccounts) {
      listSubaccounts();
    }
  }

  closeDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  openDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  handleDelete = () => {
    const { id, deleteAlert, showUIAlert, alert, history } = this.props;
    const { name } = alert;

    return deleteAlert({ id }).then(() => {
      this.closeDeleteModal();
      history.push('/alerts-new');
      showUIAlert({ type: 'success', message: `Alert: ${name} Deleted` });
    });
  };

  subaccountIdToString= (id) => {
    const { subaccounts } = this.props;
    if (id === -1) {
      return 'Master and all subaccounts';
    }
    if (id === 0) {
      return 'Master account';
    }
    const matchedSubaccount = subaccounts.find((subaccount) => subaccount.id === id) || {};
    return `${matchedSubaccount.name} (${matchedSubaccount.id})`;
  };

  render() {
    const { loading, deletePending, alert = {}, error, id } = this.props;
    const { isDeleteModalOpen } = this.state;
    const { name } = alert;

    if (loading) {
      return <Loading/>;
    }

    if (error) {
      return (
        <RedirectAndAlert
          to='/alerts-new'
          alert={{ type: 'error', message: error.message }}
        />
      );
    }
    return (
      <Page
        title={name || 'Alert'}
        breadcrumbAction={{ content: 'Back to Alerts', to: '/alerts-new', component: Link }}
        primaryArea={
          <>
          <Button flat component={Link} to={`/alerts-new/create/${id}`}><ContentCopy className={styles.Icon}/>Duplicate</Button>
          <Button flat onClick={this.openDeleteModal}><Delete className={styles.Icon}/>Delete</Button>
          </>}
      >
        {!_.isEmpty(alert) && <AlertDetails alert={alert} id={id} subaccountIdToString={this.subaccountIdToString}/>}
        <DeleteModal
          open={isDeleteModalOpen}
          title='Are you sure you want to delete this alert?'
          content={<p>The alert "<strong>{name}</strong>" will be permanently removed. This cannot be undone.</p>}
          onDelete={this.handleDelete}
          onCancel={this.closeDeleteModal}
          isPending={deletePending}
        />
      </Page>
    );
  }
}

export default withAlert(DetailsPage);
