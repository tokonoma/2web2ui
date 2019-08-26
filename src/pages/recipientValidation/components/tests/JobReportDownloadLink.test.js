import React from 'react';
import { shallow } from 'enzyme';
import JobReportDownloadLink from '../JobReportDownloadLink';

describe('JobReportDownloadLink', () => {
  const subject = (props = {}) => shallow(
    <JobReportDownloadLink {...props} />
  );

  it('renders null when no file is provided', () => {
    expect(subject()).toBeEmptyRender();
  });

  it('renders a download link', () => {
    const wrapper = subject({ href: 'http://example.com/rejected.csv', status: 'success' });
    expect(wrapper).toMatchSnapshot();
  });
});
