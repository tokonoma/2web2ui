import React from 'react';
import { shallow } from 'enzyme';
import { UploadedListPage } from '../UploadedListPage';


const subject = (props = {}) => shallow(
  <UploadedListPage
    batchStatus='queued_for_batch'
    listId='listId'
    getJobStatus={jest.fn(() => Promise.resolve())}
    {...props}
  />
);

describe('UploadedListPage', () => {

  // it('should fetch job status on rendering', () => {
  //   const getJobStatus = jest.fn(() => Promise.resolve());
  //   subject({ getJobStatus });
  //   expect(getJobStatus).toHaveBeenCalled();
  // });

  it('should render UploadedListForm if batch status is queued_for_batch', () => {
    expect(subject().find('UploadedListForm')).toExist();
  });

  it('should render progress if batch status is not queued_for_batch', () => {
    expect(subject({ batchStatus: 'continuing' }).find('UploadedListForm')).not.toExist();
  });
});
