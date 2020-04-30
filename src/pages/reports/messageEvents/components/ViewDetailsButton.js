import React, { Component } from 'react';
import { PageLink } from 'src/components/links';
import { Button } from 'src/components/matchbox';
import { getDetailsPath } from 'src/helpers/messageEvents';
import styles from './ViewDetailsButton.module.scss';

export class ViewDetailsButton extends Component {
  render() {
    const { message_id, event_id } = this.props;

    const to = {
      pathname: getDetailsPath(message_id, event_id),
    };

    return (
      <div className={styles.AlignRight}>
        <PageLink as={Button} variant="tertiary" to={to} size="small">
          View Details
        </PageLink>
      </div>
    );
  }
}

export default ViewDetailsButton;
