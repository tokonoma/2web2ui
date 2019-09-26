import React from 'react';
import { shallow } from 'enzyme';
import { UploadedListPage } from '../UploadedListPage';

describe('UploadedListPage', () => {
  const subject = (props = {}) => shallow(
    <UploadedListPage
      getJobStatus={() => {}}
      listId="A1C1_D1C1"
      job={{
        jobId: 'A1C1_D1C1',
        status: 'success',
        updatedAt: '1997-11-21T15:55:06Z'
      }}
      jobLoadingStatus="success"
      triggerJob={() => {}}
      {...props}
    />
  );

  it('renders with list progress', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('calls getJobStatus on mount', () => {
    const getJobStatus = jest.fn();
    subject({ getJobStatus });
    expect(getJobStatus).toHaveBeenCalledWith('A1C1_D1C1');
  });

  it('redirects and alerts when loading fails', () => {
    const wrapper = subject({ job: undefined, jobLoadingStatus: 'fail' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading', () => {
    const wrapper = subject({ job: undefined, jobLoadingStatus: 'pending' });
    expect(wrapper).toHaveDisplayName('Loading');
  });

  it('renders the list error when the job status is error', () => {
    const wrapper = subject({
      job: {
        jobId: 'A1C1_D1C1',
        status: 'error',
        updatedAt: '1997-11-21T15:55:06Z'
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('when job is queued', () => {
    const queuedSubject = (props = {}) => (
      subject({
        job: {
          jobId: 'B1C1_D1C1',
          status: 'queued_for_batch',
          updatedAt: '1997-11-21T15:55:06Z'
        },
        listId: 'B1C1_D1C1',
        ...props
      })
    );

    it('render with upload form when job is queued', () => {
      const wrapper = queuedSubject();
      expect(wrapper.find('Connect(UploadedListForm)')).toExist();
    });

    it('calls triggerJob when form is submitted', () => {
      const triggerJob = jest.fn();
      const wrapper = queuedSubject({ triggerJob });

      wrapper.find('Connect(UploadedListForm)').simulate('submit');

      expect(triggerJob).toHaveBeenCalledWith('B1C1_D1C1');
    });
  });
});
