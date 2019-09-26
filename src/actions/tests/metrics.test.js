import * as metrics from '../metrics';
import { snapshotActionCases } from '../../__testHelpers__/snapshotActionHelpers';
jest.mock('src/actions/helpers/sparkpostApiRequest');

describe('Metrics Actions', () => {
  snapshotActionCases('fetch', [
    {
      name: 'metrics domains',
      action: metrics.fetchMetricsDomains
    },
    {
      name: 'metrics campaigns',
      action: metrics.fetchMetricsCampaigns
    },
    {
      name: 'metrics sending ips',
      action: metrics.fetchMetricsSendingIps
    },
    {
      name: 'metrics ip pools',
      action: metrics.fetchMetricsIpPools
    },
    {
      name: 'metrics templates',
      action: metrics.fetchMetricsTemplates
    },
    {
      name: 'metrics (time series)',
      action: metrics.getTimeSeries
    },
    {
      name: 'Deliverability',
      action: (() => metrics.fetchDeliverability({ params: {}, type: 'GET_ACCEPTED_AGGREGATES' }))
    },
    {
      name: 'Bounce Classifications',
      action: metrics.fetchBounceClassifications
    },
    {
      name: 'Bounce Reasons',
      action: metrics.fetchBounceReasons
    },
    {
      name: 'Bounce Reasons By Domain',
      action: (() => metrics.fetchBounceReasonsByDomain({}, 'FETCH_METRICS_BOUNCE_REASONS_BY_DOMAIN'))
    },
    {
      name: 'Rejection Reasons By Domain',
      action: metrics.fetchRejectionReasonsByDomain
    },
    {
      name: 'Delay Reasons By Domain',
      action: metrics.fetchDelayReasonsByDomain
    },
    {
      name: 'Deliveries By Attempt',
      action: metrics.fetchDeliveriesByAttempt
    }
  ]);
});
