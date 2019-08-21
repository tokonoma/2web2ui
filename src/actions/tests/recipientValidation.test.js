import { snapshotActionCases } from 'src/__testHelpers__/snapshotActionHelpers';
import {
  uploadList,
  uploadListNew,
  singleAddress,
  getLatestJob,
  getJobStatus,
  getList,
  triggerJob
} from '../recipientValidation';

jest.mock('src/actions/helpers/sparkpostApiRequest');

describe('Recipient Verification Actions', () => {
  snapshotActionCases('.uploadList', [
    {
      name: 'when uploading csv',
      action: () => (
        uploadList({
          data: 'csv-file'
        })
      )
    }
  ]);

  snapshotActionCases('.uploadListNew', [
    {
      name: 'when uploading csv',
      action: () => (
        uploadListNew({
          data: 'csv-file'
        })
      )
    }
  ]);

  snapshotActionCases('.singleAddress', [
    {
      name: 'when verifying a single address',
      action: () => (
        singleAddress({
          address: 'foo@bar.com'
        })
      )
    }
  ]);

  snapshotActionCases('.getLatestJob', [
    {
      name: 'when getting latest list upload',
      action: () => getLatestJob()
    }
  ]);

  snapshotActionCases('.getJobStatus', [
    {
      name: 'when getting status of a list job',
      action: () => getJobStatus('12345')
    }
  ]);

  snapshotActionCases('.getList', [
    {
      name: 'when getting list of jobs',
      action: () => getList()
    }
  ]);

  snapshotActionCases('.triggerJob', [
    {
      name: 'when triggering a job to be processed',
      action: () => triggerJob('12345')
    }
  ]);
});
