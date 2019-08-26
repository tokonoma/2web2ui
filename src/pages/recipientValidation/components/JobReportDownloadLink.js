import React from 'react';
import { Button } from '@sparkpost/matchbox';
import { Queue, FileDownload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';
import { ScreenReaderOnly } from '@sparkpost/matchbox';

const JobReportDownloadLink = ({ jobId, fileHref, status }) => {
  if (status === 'queued_for_batch') {
    return (
      <Button to={`/recipient-validation/list/${jobId}`} flat color="orange">
        <ScreenReaderOnly>Review</ScreenReaderOnly>

        <Queue/>
      </Button>
    );
  }

  if (fileHref && status === 'success') {
    return (
      <DownloadLink component={Button} to={fileHref} flat>
        <ScreenReaderOnly>Download Results</ScreenReaderOnly>

        <FileDownload />
      </DownloadLink>
    );
  }

  return null;
};

export default JobReportDownloadLink;
