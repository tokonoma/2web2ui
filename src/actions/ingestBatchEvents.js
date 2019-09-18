import sparkpostApiRequest from './helpers/sparkpostApiRequest';
import _ from 'lodash';
import moment from 'moment';

export const getIngestBatchEvents = ({
  batchIds = [],
  cursor,
  from = moment().subtract(10,'day').format('YYYY-MM-DD[T]HH:mm'),
  perPage,
  statuses = [],
  to = moment().format('YYYY-MM-DD[T]HH:mm')
}) => sparkpostApiRequest({
  type: 'GET_INGEST_BATCH_EVENTS',
  meta: {
    method: 'GET',
    url: 'v1/events/ingest',
    showErrorAlert: false,
    params: {
      batch_ids: batchIds.length ? batchIds.join(',') : undefined,
      cursor,
      events: statuses
        ? _.isEqual(statuses,['success'])
          ? 'success'
          : undefined
        : undefined,
      error_types: statuses.filter((x) => x !== 'success').length > 0 ? statuses.filter((x) => x !== 'success').join(',') : undefined,
      from,
      per_page: perPage,
      to
    }
  }
});

