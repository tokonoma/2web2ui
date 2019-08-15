import React from 'react';
import { shallow } from 'enzyme';
import { UploadedListPage } from '../UploadedListPage';

describe('UploadedListPage', () => {
  const subject = (props = {}) => shallow(
    <UploadedListPage
      batchStatus='queued_for_batch'
      listId='listId'
      history={{ replace: jest.fn() }}
      startPolling={jest.fn()}
      getJobStatus={jest.fn(() => Promise.resolve({}))}
      triggerJob={jest.fn()}
      job={{ status: 'queued_for_batch', address_count: 1000 }}
      getUsage={jest.fn()}
      currentUsage={{ recipient_validation: { month: { used: 20000 }}}}
      {...props}
    />
  );

  it('should fetch job status on rendering', async () => {
    const getJobStatus = jest.fn(() => Promise.resolve({ batch_status: 'queued_for_batch', complete: false }));
    const getUsage = jest.fn();
    await subject({ getJobStatus, getUsage });
    expect(getJobStatus).toHaveBeenCalledWith('listId');
    expect(getUsage).toHaveBeenCalled();
  });

  it('should start polling if not complete and batch status is not "queued_for_batch"', async () => {
    const getJobStatus = jest.fn(() => Promise.resolve({ batch_status: 'checking_regex', complete: false }));
    const startPolling = jest.fn();
    await subject({ getJobStatus, startPolling });
    expect(startPolling).toHaveBeenCalledWith(expect.objectContaining(
      { key: 'listId', interval: 5000 }
    ));
  });

  it('should redirect to /recipient-validation/list on error on loading job', async () => {
    const getJobStatus = jest.fn(() => Promise.reject());
    const history = { replace: jest.fn() };
    await subject({ getJobStatus, history });
    expect(getJobStatus).toHaveBeenCalledWith('listId');
    expect(history.replace).toHaveBeenCalledWith('/recipient-validation/list');
  });

  it('should call triggerJob when calling onSubmit', () => {
    const triggerJob = jest.fn(() => Promise.resolve());
    const wrapper = subject({ triggerJob });
    wrapper.instance().handleSubmit();
    expect(triggerJob).toHaveBeenCalledWith('listId');
  });

  it('should render UploadedListForm if batch status is queued_for_batch', () => {
    expect(subject().find('UploadedListForm')).toExist();
  });

  it('should render progress if batch status is not queued_for_batch', () => {
    expect(subject({ job: { batchStatus: 'continuing' }}).find('UploadedListForm')).not.toExist();
  });

  it('should render Loading if still loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });
});
