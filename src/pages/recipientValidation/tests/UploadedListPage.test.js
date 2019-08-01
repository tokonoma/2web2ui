import React from 'react';
import { shallow } from 'enzyme';
import { UploadedListPage } from '../UploadedListPage';


const subject = (props = {}) => shallow(
  <UploadedListPage
    batchStatus='queued_for_batch'
    listId='listId'
    getJobStatusMock={jest.fn(() => Promise.resolve())}
    results={{ status: 'queued_for_batch', address_count: 1000 }}
    getUsage={jest.fn()}
    currentUsage={{ recipient_validation: { month: { used: 20000 }}}}
    {...props}
  />
);

describe('UploadedListPage', () => {

  // TODO: Replace mock function with real function
  it('should fetch job status on rendering', () => {
    const getJobStatusMock = jest.fn(() => Promise.resolve());
    const getUsage = jest.fn();
    subject({ getJobStatusMock, getUsage });
    expect(getJobStatusMock).toHaveBeenCalled();
    expect(getUsage).toHaveBeenCalled();
  });

  it('should render UploadedListForm if batch status is queued_for_batch', () => {
    expect(subject().find('UploadedListForm')).toExist();
  });

  it('should render progress if batch status is not queued_for_batch', () => {
    expect(subject({ results: { batchStatus: 'continuing' }}).find('UploadedListForm')).not.toExist();
  });

  it('should render Loading if still loading', () => {
    const wrapper = subject({ loading: true });
    expect(wrapper.find('Loading')).toExist();
  });
});
