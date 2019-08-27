import React from 'react';
import { shallow } from 'enzyme';
import { ListProgress } from '../ListProgress';

describe('ListProgress', () => {
  const subject = (props = {}) => shallow(
    <ListProgress
      getJobStatus={() => {}}
      job={{
        filename: 'big-test.csv',
        jobId: 'A1C1_D1C1',
        status: 'checking_regex'
      }}
      startPolling={() => {}}
      stopPolling={() => {}}
      {...props}
    />
  );

  beforeEach(() => {
    React.useEffect = jest.fn((effect) => effect());
  });

  it('renders status and progress bar', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('does not render progress bar when validation fails', () => {
    const errorJob = {
      filename: 'big-test.csv',
      jobId: 'A1C1_D1C1',
      status: 'error'
    };
    const wrapper = subject({ job: errorJob });

    expect(wrapper.find('ProgressBar')).not.toExist();
  });

  it('starts polling on mount', () => {
    const startPolling = jest.fn();
    subject({ startPolling });
    expect(startPolling).toHaveBeenCalledWith(expect.objectContaining({ key: 'A1C1_D1C1' }));
  });

  it('keeps polling if in progress', () => {
    const getJobStatus = jest.fn(() => Promise.resolve({ batch_status: 'performing_mx_lookup' }));
    const startPolling = jest.fn(({ action }) => { action(); });
    const stopPolling = jest.fn();

    subject({ getJobStatus, startPolling, stopPolling });

    expect(getJobStatus).toHaveBeenCalledWith('A1C1_D1C1');
    expect(stopPolling).not.toHaveBeenCalled();
  });

  it('stops polling and alerts when validation is complete', (done) => {
    const getJobStatus = jest.fn(() => Promise.resolve({ batch_status: 'success' }));
    const showAlert = jest.fn();
    const startPolling = jest.fn(async ({ action }) => {
      await action();
      expect(getJobStatus).toHaveBeenCalledWith('A1C1_D1C1');
      expect(stopPolling).toHaveBeenCalledWith('A1C1_D1C1');
      expect(showAlert).toHaveBeenCalledWith({
        type: 'success',
        message: 'Validation of big-test.csv recipient list has completed',
        dedupeId: 'A1C1_D1C1'
      });
      done();
    });
    const stopPolling = jest.fn();

    subject({ getJobStatus, showAlert, startPolling, stopPolling });
  });

  it('stops polling when validation explodes', (done) => {
    const getJobStatus = jest.fn(() => Promise.reject());
    const showAlert = jest.fn(() => done());
    const startPolling = jest.fn(async ({ action }) => {
      await action();
      expect(getJobStatus).toHaveBeenCalledWith('A1C1_D1C1');
      expect(stopPolling).toHaveBeenCalledWith('A1C1_D1C1');
      done();
    });
    const stopPolling = jest.fn();

    subject({ getJobStatus, showAlert, startPolling, stopPolling });
  });
});
