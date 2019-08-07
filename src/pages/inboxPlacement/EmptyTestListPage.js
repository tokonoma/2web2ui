import React from 'react';

import { EmptyState } from '@sparkpost/matchbox';
import { Templates } from 'src/components/images';
import { Link } from 'react-router-dom';
import { LINKS } from 'src/constants';

export default function EmptyTestListPage() {
  return <EmptyState
    title={'Find and Fix Inbox Placement Issues'}
    image={Templates}
    primaryAction={{ content: 'Start a Test', to: '/inbox-placement/seedlist', component: Link }}
    secondaryAction={{ content: 'Check out our docs', to: LINKS.API_DOCS, external: true }}
  >
    <p>{'Perform seedlist tests that help you predict how your emails are handled by mailbox providers'}</p>
  </EmptyState>;
}
