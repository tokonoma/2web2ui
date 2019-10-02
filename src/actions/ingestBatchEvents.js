import _ from 'lodash';
import moment from 'moment';
import sparkpostApiRequest from './helpers/sparkpostApiRequest';
import { formatApiTimestamp } from 'src/helpers/date';

export const getIngestBatchEvents = ({
  batchIds = [],
  cursor,
  from = moment().subtract(10,'day'),
  perPage,
  statuses = [],
  to = moment()
} = {}) => {
  const errorTypes = statuses.filter((status) => status !== 'success');

  return (
    sparkpostApiRequest({
      type: 'GET_INGEST_BATCH_EVENTS',
      meta: {
        method: 'GET',
        url: 'v1/events/ingest',
        showErrorAlert: false,
        params: {
          batch_ids: batchIds.length ? batchIds.join(',') : undefined,
          cursor,
          events: statuses.includes('success') ? 'success' : undefined,
          error_types: errorTypes.length ? errorTypes.join(',') : undefined,
          from: formatApiTimestamp(from),
          per_page: perPage,
          to: formatApiTimestamp(to)
        }
      }
    })
  );
};
