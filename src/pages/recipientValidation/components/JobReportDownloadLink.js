import React from 'react';
import { Button } from '@sparkpost/matchbox';
import { FileDownload } from '@sparkpost/matchbox-icons';
import DownloadLink from 'src/components/downloadLink/DownloadLink';

const JobReportDownloadLink = ({ href }) => {
  if (!href) {
    return null;
  }

  return (
    <DownloadLink component={Button} to={href}>
      <span>Download Results&nbsp;</span>
      <FileDownload />
    </DownloadLink>
  );
};

export default JobReportDownloadLink;
