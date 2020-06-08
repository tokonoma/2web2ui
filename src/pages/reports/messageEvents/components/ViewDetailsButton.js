import React from 'react';
import { ChevronRight } from '@sparkpost/matchbox-icons';
import { PageLink } from 'src/components/links';
import { Button } from 'src/components/matchbox';
import { getDetailsPath } from 'src/helpers/messageEvents';
import styles from './ViewDetailsButton.module.scss';

export default function ViewDetailsButton(props) {
  const { message_id, event_id } = props;

  const to = {
    pathname: getDetailsPath(message_id, event_id),
  };

  return (
    <div className={styles.AlignRight}>
      <PageLink as={Button} to={to} variant="minimal" size="small">
        <span>View Details</span>
        <ChevronRight />
      </PageLink>
    </div>
  );
}
