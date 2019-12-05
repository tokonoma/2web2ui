import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page, Panel } from '@sparkpost/matchbox';
import _ from 'lodash';
import { ApiErrorBanner, Loading } from 'src/components';
import IpForm from './components/IpForm';
import DeliveryHistoryLineChart from './components/DeliveryHistoryLineChart';
import PanelLoading from 'src/components/panelLoading';
import { showAlert } from 'src/actions/globalAlert';
import { getRelativeDates } from 'src/helpers/date';
import { listPools, updatePool } from 'src/actions/ipPools';
import { getTimeSeries } from 'src/actions/metrics';
import { updateSendingIp } from 'src/actions/sendingIps';
import {
  selectCurrentPool,
  selectIpForCurrentPool,
  selectIpDeliveryHistory,
} from 'src/selectors/ipPools';
import styles from './EditIpPage.module.scss';

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

  loadDependentData() {
    this.props.listPools().then(() => {
      const { ip } = this.props;
      const { from, to } = getRelativeDates('10days', { roundToPrecision: false });

      if (ip) {
        this.props.getTimeSeries({
          from,
          to,
          precision: 'day',
          metrics: 'count_delivered',
          sending_ips: ip.external_ip,
        });
      }
    });
  }

  componentDidMount() {
    this.loadDependentData();
  }

  render() {
    const { loading, pool, ip, error } = this.props;
    const isChartLoading = this.props.chartLoading;

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
          <>
            <IpForm onSubmit={this.onUpdateIp} />

            <Panel title="Delivery History">
              <Panel.Section className={styles.LineChartSection}>
                <h3>Last 10 Days</h3>

                <DeliveryHistoryLineChart ip={ip} />
              </Panel.Section>
            </Panel>
          </>
        )}
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { listLoading, listError } = state.ipPools;
  const { pending: metricsPending } = state.metrics;

  return {
    ip: selectIpForCurrentPool(state, props),
    pool: selectCurrentPool(state, props),
    deliveryHistory: selectIpDeliveryHistory(state, props),
    loading: listLoading,
    chartLoading: metricsPending,
    error: listError,
  };
};

export default connect(mapStateToProps, {
  updatePool,
  listPools,
  getTimeSeries,
  updateSendingIp,
  showAlert,
})(EditIpPage);
