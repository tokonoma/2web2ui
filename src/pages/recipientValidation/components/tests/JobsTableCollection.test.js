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
});
