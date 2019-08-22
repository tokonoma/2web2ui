import { createSelector } from 'reselect';

const getRecipientValidationJobs = (state) => state.recipientValidation.jobResults;

export const selectRecipientValidationJobs = createSelector(
  getRecipientValidationJobs,
  (jobs) => {
    return Object.keys(jobs).reduce((acc, key) => {
      const {
        address_count,
        batch_status,
        list_id,
        original_filename,
        rejected_external_url,
        upload_timestamp,
        ...job
      } = jobs[key];

      return [
        ...acc,
        {
          ...job,
          addressCount: address_count,
          filename: original_filename,
          jobId: list_id, // list id was confusing
          rejectedUrl: rejected_external_url,
          status: batch_status ? batch_status.toLowerCase() : undefined,
          uploadedAt: upload_timestamp
        }
      ];
    }, []);
  }
);
