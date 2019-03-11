import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';

import { ApiErrorBanner, Loading } from 'src/components';
import IPForm from './components/IPForm';
import { showAlert } from 'src/actions/globalAlert';
import { getPool, listPools, updatePool } from 'src/actions/ipPools';
import { updateSendingIp } from 'src/actions/sendingIps';
import { selectCurrentPool, selectIpForCurrentPool } from 'src/selectors/ipPools';


export class EditIPPage extends Component {
  onUpdateIp = (values) => {
    const { updateSendingIp, currentIp, showAlert } = this.props;

    return updateSendingIp(currentIp.external_ip, values.ip_pool)
      .then((res) => {
        showAlert({
          type: 'success',
          message: `Updated IP ${currentIp.external_ip}.`
        });
      });
  };

  loadDependentData = () => {
    this.props.listPools();
    this.props.getPool(this.props.match.params.id);
  };

  componentDidMount() {
    this.loadDependentData();
  }

  renderError() {
    const { error } = this.props;
    return <ApiErrorBanner
      errorDetails={error.message}
      message="Sorry, we seem to have had some trouble loading your IP data."
      reload={this.loadDependantData}
    />;
  }

  renderForm() {
    const { error } = this.props;
    if (error) {
      return this.renderError();
    }

    return <IPForm onSubmit={this.onUpdateIp}/>;
  }

  render() {
    const { loading, currentPool, currentIp } = this.props;

    if (loading || !currentIp || !currentPool) {
      return <Loading/>;
    }

    const breadcrumbAction = {
      content: currentPool.name,
      Component: Link,
      to: `/account/ip-pools/edit/${currentPool.id}`
    };

    return (
      <Page
        title={`Sending IP: ${currentIp.external_ip}`}
        breadcrumbAction={breadcrumbAction}
      >
        {this.renderForm()}
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { getLoading, getError, listLoading, listError } = state.ipPools;

  return {
    currentIp: selectIpForCurrentPool(state, props),
    currentPool: selectCurrentPool(state),
    loading: getLoading || listLoading,
    error: listError || getError
  };
};

export default withRouter(connect(mapStateToProps, {
  updatePool,
  getPool,
  listPools,
  updateSendingIp,
  showAlert
})(EditIPPage));
