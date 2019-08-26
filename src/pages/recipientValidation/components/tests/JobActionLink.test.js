import React from 'react';
import { shallow } from 'enzyme';
import JobActionLink from '../JobActionLink';

describe('JobActionLink', () => {
  const subject = (props = {}) => shallow(
    <JobActionLink {...props} />
  );

  it('Renders the review variant of the component when the status not "error" or "success"', () => {
    const wrapper = subject({ status: 'queued_for_batch' });

    expect(wrapper.find('ScreenReaderOnly').childAt(0).text()).toEqual('Review');
    expect(wrapper.find('PlaylistAddCheck')).toExist();
  });

  it('Renders the download link when a `fileHref` is present and the status is `success`', () => {
    const wrapper = subject({
      fileHref: 'https://nicklemmon.com',
      status: 'success'
    });

    expect(wrapper.find('ScreenReaderOnly').childAt(0).text()).toEqual('Download Results');
    expect(wrapper.find('FileDownload')).toExist();
  });

  it('Renders nothing when there is no fileHref and the status it not either `queued_for_batch` or `success`', () => {
    const wrapper = subject();

    expect(wrapper).toBeEmptyRender();
  });
});
