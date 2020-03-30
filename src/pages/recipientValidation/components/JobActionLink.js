import React from 'react';
import { Cached, FileDownload, PlaylistAddCheck } from '@sparkpost/matchbox-icons';
import { Button } from 'src/components/matchbox';
import { DownloadLink, PageLink } from 'src/components/links';

const JobActionLink = ({ jobId, fileHref, status }) => {
  if (status === 'error') {
    return null;
  }

  if (status === 'queued_for_batch') {
    return (
      <PageLink
        as={Button}
        to={`/recipient-validation/list/${jobId}`}
        flat
        color="orange"
        size="small"
      >
        <span>Review</span>&nbsp;
        <PlaylistAddCheck />
      </PageLink>
    );
  }

  if (status === 'success') {
    return (
      <DownloadLink as={Button} href={fileHref} color="orange" flat size="small">
        <span>Download</span>&nbsp;
        <FileDownload />
      </DownloadLink>
    );
  }

  return (
    <PageLink
      as={Button}
      to={`/recipient-validation/list/${jobId}`}
      flat
      color="orange"
      size="small"
    >
      <span>See Progress</span>&nbsp;
      <Cached />
    </PageLink>
  );
};

export default JobActionLink;
