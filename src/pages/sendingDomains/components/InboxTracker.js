import React, { Fragment } from 'react';

import { Panel } from '@sparkpost/matchbox';

const InboxTracker = (/*{ domain }*/) => {
  // const { sent_pct } = domain;

  return (
    <Fragment>
      <Panel.Section>
        <div>98.4%</div>
      </Panel.Section>
    </Fragment>
  );
};

export default InboxTracker;
