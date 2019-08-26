import React from 'react';
import { shallow } from 'enzyme';
import { JobsTableCollection } from '../JobsTableCollection';

describe('JobsTableCollection', () => {
  const subject = (props = {}) => shallow(
    <JobsTableCollection {...props} jobs={[]} />
  );

  it('renders a table of jobs', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders a job row', () => {
    const wrapper = subject();
    const Row = wrapper.prop('getRowData');
    const rowWrapper = shallow(
      <Row
        addressCount={999}
        complete={true}
        filename="example.csv"
        jobId="A1C1_D1_C1"
        status="success"
        uploadedAt="2013-02-04T22:44:30.652Z"
        uploadedFile="https://example.csv"
      />
    );

    expect(rowWrapper.map((w) => w.dive())).toMatchSnapshot();
  });
});
