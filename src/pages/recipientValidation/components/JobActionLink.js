import React from 'react';
import { Button } from '@sparkpost/matchbox';
import { PlaylistAddCheck, FileDownload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';

const JobActionLink = ({ jobId, fileHref, status }) => {
  if (status !== 'error' && status !== 'success') {
    return (
      <Button
        to={`/recipient-validation/list/${jobId}`}
        flat
        color="orange"
        size="small"
      >
        <span>Review</span>

        <PlaylistAddCheck/>
      </Button>
    );
  }

  if (fileHref && status === 'success') {
    return (
      <DownloadLink
        component={Button}
        to={fileHref}
        flat
        color="orange"
        size="small"
      >
        <span>Download</span>

        <FileDownload />
      </DownloadLink>
    );
  }

  return null;
};

export default JobActionLink;
