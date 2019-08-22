import { selectRecipientValidationJobs } from '../recipientValidation';

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
    const jobs = {
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

    expect(subject(jobs)).toMatchSnapshot();
  });
});
