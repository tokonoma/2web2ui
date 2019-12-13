import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page } from '@sparkpost/matchbox';
import _ from 'lodash';
import { ApiErrorBanner, Loading } from 'src/components';
import IpForm from './components/IpForm';
import { showAlert } from 'src/actions/globalAlert';
import { listPools, updatePool } from 'src/actions/ipPools';
import { updateSendingIp } from 'src/actions/sendingIps';
import { selectCurrentPool, selectIpForCurrentPool } from 'src/selectors/ipPools';

export class EditIpPage extends Component {
  onUpdateIp = values => {
    const { updateSendingIp, ip, showAlert, history } = this.props;

    if (!values.auto_warmup_enabled) {
      delete values.auto_warmup_stage;
    }

    const reAssignedPool = ip.ip_pool !== values.ip_pool;

    return updateSendingIp(ip.external_ip, values)
      .then(() => {
        if (reAssignedPool) {
          history.replace(`/account/ip-pools/edit/${values.ip_pool}/${ip.external_ip}`);
        }
        showAlert({
          type: 'success',
          message: `Updated IP ${ip.external_ip}.`,
        });
      })
      .then(this.loadDependentData);
  };

  loadDependentData = () => {
    this.props.listPools();
  };

  componentDidMount() {
    this.loadDependentData();
  }

  render() {
    const { loading, pool, ip, error } = this.props;

    if (loading || _.isEmpty(pool) || _.isEmpty(ip)) {
      return <Loading />;
    }

    return (
      <Page
        title={`Sending IP: ${ip.external_ip}`}
        breadcrumbAction={{
          content: pool.name,
          Component: Link,
          to: `/account/ip-pools/edit/${pool.id}`,
        }}
      >
        {error ? (
          <ApiErrorBanner
            errorDetails={error.message}
            message="Sorry, we seem to have had some trouble loading your IP data."
            reload={this.loadDependentData}
          />
        ) : (
          <IpForm onSubmit={this.onUpdateIp} />
        )}
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
    error: listError,
  };
};

export default connect(mapStateToProps, {
  updatePool,
  listPools,
  updateSendingIp,
  showAlert,
})(EditIpPage);
