import React from 'react';
import { shallow } from 'enzyme';
import JobReportDownloadLink from '../JobReportDownloadLink';

describe('JobReportDownloadLink', () => {
  const subject = (props = {}) => shallow(
    <JobReportDownloadLink {...props} />
  );

  it('renders a download link', () => {
    const wrapper = subject({ complete: true, uploadedFile: 'http://example.com/upload.csv' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a download link to rejected results', () => {
    const wrapper = subject({ complete: true, rejectedUrl: 'http://example.com/rejected.csv' });
    expect(wrapper).toHaveProp('to', 'http://example.com/rejected.csv');
  });

  it('renders null when not complete', () => {
    expect(subject({ complete: false })).toBeEmptyRender();
  });
});
