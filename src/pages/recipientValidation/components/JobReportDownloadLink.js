import React from 'react';
import { Button } from '@sparkpost/matchbox';
import { FileDownload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';

const JobReportDownloadLink = ({ complete, rejectedUrl, uploadedFile }) => {
  if (!complete) {
    return null;
  }

  return (
    <DownloadLink
      component={Button}
      to={rejectedUrl ? rejectedUrl : uploadedFile}
    >
      <span>Download Results&nbsp;</span>
      <FileDownload />
    </DownloadLink>
  );
};

export default JobReportDownloadLink;
