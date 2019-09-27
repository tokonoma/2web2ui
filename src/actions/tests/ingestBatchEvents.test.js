import moment from 'moment';
import { snapshotActionCases } from 'src/__testHelpers__/snapshotActionHelpers';
import { getIngestBatchEvents } from '../ingestBatchEvents';

jest.mock('src/actions/helpers/sparkpostApiRequest');

describe('Ingest Batch Events Actions', () => {
  describe('.getIngestBatchEvents', () => {
    const subject = (args = {}) => (
      getIngestBatchEvents({
        from: moment('2019-09-10T15:46:20Z'),
        to: moment('2019-09-16T15:46:20Z'),
        ...args
      })
    );

    snapshotActionCases('', {
      'by default': {
        action: subject
      },
      'with batch ids': {
        action: () => subject({ batchIds: ['8c4b19fb-07a2-42cb-84f7-3ab09a8049e0']})
      },
      'with cursor': {
        action: () => subject({ cursor: 'ABCDEFGHIJK' })
      },
      'with success status': {
        action: () => subject({ statuses: ['success']})
      },
      'with error status': {
        action: () => subject({ statuses: ['validation']})
      },
      'with page size': {
        action: () => subject({ perPage: 100 })
      }
    });
  });
});
