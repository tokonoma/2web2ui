import {
  selectRecipientValidationJobById,
  selectRecipientValidationJobs
} from '../recipientValidation';

const exampleJobs = {
  A1C2_D1C2: {
    address_count: 123,
    batch_status: 'SUCCESS',
    list_id: 'A1C2_D1C2',
    original_filename: 'example.csv',
    rejected_external_url: 'http://example.com/download/reject.csv',
    uploaded_file: 'http://example.com/download/upload.csv',
    upload_timestamp: 1318781876
  }
};

describe('selectRecipientValidationJobById', () => {
  const subject = (id) => (
    selectRecipientValidationJobById({
      recipientValidation: {
        jobResults: exampleJobs
      }
    }, id)
  );

  it('returns a job', () => {
    expect(subject('A1C2_D1C2')).toHaveProperty('jobId', 'A1C2_D1C2');
  });

  it('returns undefined with unknown job', () => {
    expect(subject('UNKNOWN_JOB_ID')).toBeUndefined();
  });
});

describe('selectRecipientValidationJobs', () => {
  const subject = (jobs = {}) => (
    selectRecipientValidationJobs({
      recipientValidation: {
        jobResults: jobs
      }
    })
  );

  it('returns empty array when no jobs', () => {
    expect(subject()).toEqual([]);
  });

  it('returns collection of jobs', () => {
    expect(subject(exampleJobs)).toMatchSnapshot();
  });
});
