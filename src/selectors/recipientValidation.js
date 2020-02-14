import { createSelector } from 'reselect';
import { formatApiTimestamp, toMilliseconds } from 'src/helpers/date';
import { getFirstCountry, getFirstStateForCountry } from './accountBillingForms';
const getRecipientValidationJobs = state => state.recipientValidation.jobResults;

export const selectRecipientValidationJobs = createSelector(getRecipientValidationJobs, jobs =>
  Object.keys(jobs).reduce((acc, key) => {
    const {
      address_count,
      batch_status,
      list_id,
      original_filename,
      rejected_external_url,
      uploaded_file,
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
        uploadedFile: uploaded_file,
        uploadedAt: upload_timestamp
          ? formatApiTimestamp(toMilliseconds(upload_timestamp))
          : undefined,
      },
    ];
  }, []),
);

export const selectRecipientValidationJobById = createSelector(
  [selectRecipientValidationJobs, (state, jobId) => jobId],
  (jobs, jobId) => jobs.find(job => job.jobId === jobId),
);

export function rvAddPaymentFormInitialValues(state) {
  const firstCountry = getFirstCountry(state);
  const firstState = getFirstStateForCountry(state, firstCountry);

  return {
    billingAddress: {
      firstName: state.currentUser.first_name,
      lastName: state.currentUser.last_name,
      country: firstCountry,
      state: firstState,
    },
  };
}
