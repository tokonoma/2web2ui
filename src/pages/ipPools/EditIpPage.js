import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import _ from 'lodash';

import { ApiErrorBanner, Loading } from 'src/components';
import IpForm from './components/IpForm';
import { showAlert } from 'src/actions/globalAlert';
import { listPools, updatePool } from 'src/actions/ipPools';
import { updateSendingIp } from 'src/actions/sendingIps';
import { selectCurrentPool, selectIpForCurrentPool } from 'src/selectors/ipPools';

export class EditIpPage extends Component {
  onUpdateIp = (values) => {
    const { updateSendingIp, ip, showAlert } = this.props;

    const data = _.pick(values, ['ip_pool', 'auto_warmup_enabled', 'auto_warmup_stage']);

    if (!data.auto_warmup_enabled) {
      delete data['auto_warmup_stage'];
    }

    return updateSendingIp(ip.external_ip, data)
      .then((res) => {
        showAlert({
          type: 'success',
          message: `Updated IP ${ip.external_ip}.`
        });
      });
  };

  loadDependentData = () => {
    this.props.listPools();
  };

  componentDidMount() {
    this.loadDependentData();
  }

  renderError() {
    const { error } = this.props;
    return <ApiErrorBanner
      errorDetails={error.message}
      message="Sorry, we seem to have had some trouble loading your IP data."
      reload={this.loadDependentData}
    />;
  }

  renderForm() {
    const { error } = this.props;
    if (error) {
      return this.renderError();
    }

    return <IpForm onSubmit={this.onUpdateIp}/>;
  }

  render() {
    const { loading, pool, ip } = this.props;

    if (loading || _.isEmpty(pool)) {
      return <Loading/>;
    }

    if (pool && _.isEmpty(ip)) {
      return <Redirect to={`/account/ip-pools/edit/${pool.id}`} />;
    }

    const breadcrumbAction = {
      content: pool.name,
      Component: Link,
      to: `/account/ip-pools/edit/${pool.id}`
    };

    return (
      <Page
        title={`Sending IP: ${ip.external_ip}`}
        breadcrumbAction={breadcrumbAction}
      >
        {this.renderForm()}
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { listLoading, listError } = state.ipPools;

  return {
    ip: selectIpForCurrentPool(state, props),
    pool: selectCurrentPool(state, props),
    loading: listLoading,
    error: listError
  };
};

export default connect(mapStateToProps, {
  updatePool,
  listPools,
  updateSendingIp,
  showAlert
})(EditIpPage);
