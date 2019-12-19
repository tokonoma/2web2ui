import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Page, Panel } from '@sparkpost/matchbox';
import _ from 'lodash';
import { ApiErrorBanner, Loading } from 'src/components';
import PanelLoading from 'src/components/panelLoading';
import IpForm from './components/IpForm';
import DeliveryHistoryLineChart from './components/DeliveryHistoryLineChart';
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

export function EditIpPage(props) {
  const {
    updateSendingIp,
    ip,
    listPools,
    getTimeSeries,
    pageLoading,
    pool,
    pageError,
    chartLoading,
    chartError,
    deliveryHistory,
  } = props;

  const handleSubmit = values => {
    const { history, showAlert } = props;

    if (!values.auto_warmup_enabled) {
      delete values.auto_warmup_stage;
    }

    const reAssignedPool = ip.ip_pool !== values.ip_pool;

    return updateSendingIp(ip.external_ip, values)
      .then(() => {
        showAlert({
          type: 'success',
          message: `Updated IP ${ip.external_ip}.`,
        });

        if (reAssignedPool) {
          history.push(`/account/ip-pools/edit/${values.ip_pool}/${ip.external_ip}`);
        }
      })
      .then(() => listPools());
  };

  useEffect(() => {
    listPools();
  }, [listPools]);

  useEffect(() => {
    const { from, to } = getRelativeDates('10days', { roundToPrecision: false });

    if (ip) {
      getTimeSeries({
        from,
        to,
        precision: 'day',
        metrics: 'count_delivered',
        sending_ips: ip.external_ip,
      });
    }
  }, [ip, getTimeSeries]);

  if (pageLoading || _.isEmpty(pool) || _.isEmpty(ip)) {
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
      {pageError ? (
        <IpErrorBanner details={pageError.message} handleReload={listPools} />
      ) : (
        <>
          <IpForm onSubmit={handleSubmit} />

          <DeliveryHistoryPanel
            error={chartError}
            isLoading={chartLoading}
            chartData={deliveryHistory}
            handleReloadAfterError={listPools}
          />
        </>
      )}
    </Page>
  );
}

function IpErrorBanner({ details, handleReload }) {
  return (
    <ApiErrorBanner
      errorDetails={details}
      message="Sorry, we seem to have had some trouble loading your IP data."
      reload={handleReload}
    />
  );
}

function DeliveryHistoryPanel({ isLoading, error, chartData, handleReloadAfterError }) {
  if (isLoading) {
    return <PanelLoading />;
  }

  return (
    <>
      {error ? (
        <IpErrorBanner details={error.message} handleReload={handleReloadAfterError} />
      ) : (
        <>
          {!_.isEmpty(chartData) && (
            <Panel title="Delivery History">
              <Panel.Section className={styles.LineChartSection}>
                <h3>Last 10 Days</h3>

                <DeliveryHistoryLineChart data={chartData} />
              </Panel.Section>
            </Panel>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state, props) => {
  const { listLoading, listError } = state.ipPools;
  const { pending: metricsLoading, error: metricsError } = state.metrics;

  return {
    ip: selectIpForCurrentPool(state, props),
    pool: selectCurrentPool(state, props),
    deliveryHistory: selectIpDeliveryHistory(state, props),
    pageLoading: listLoading,
    pageError: listError,
    chartError: metricsError,
    chartLoading: metricsLoading,
  };
};

export default connect(mapStateToProps, {
  updatePool,
  listPools,
  getTimeSeries,
  updateSendingIp,
  showAlert,
})(EditIpPage);
