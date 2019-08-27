import React from 'react';
import { shallow } from 'enzyme';
import JobActionLink from '../JobActionLink';

describe('JobActionLink', () => {
  const subject = (props = {}) => shallow(
    <JobActionLink {...props} />
  );

  it('renders see progress button', () => {
    const wrapper = subject({ status: 'batch_triggered' });

    expect(wrapper.find('Button').childAt(0).text()).toEqual('See Progress');
    expect(wrapper.find('Cached')).toExist();
  });

  it('renders the review variant of the component when the status not "error" or "success"', () => {
    const wrapper = subject({ status: 'queued_for_batch' });

    expect(wrapper.find('Button').childAt(0).text()).toEqual('Review');
    expect(wrapper.find('PlaylistAddCheck')).toExist();
  });

  it('renders the download link when a `fileHref` is present and the status is `success`', () => {
    const wrapper = subject({
      fileHref: 'https://nicklemmon.com',
      status: 'success'
    });

    expect(wrapper.find('DownloadLink').childAt(0).text()).toEqual('Download');
    expect(wrapper.find('FileDownload')).toExist();
  });

  it('renders nothing when the status is "error"', () => {
    const wrapper = subject({ status: 'error' });
    expect(wrapper).toBeEmptyRender();
  });
});
