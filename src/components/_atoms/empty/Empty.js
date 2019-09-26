import React, { Component } from 'react';
import { Panel } from '@sparkpost/matchbox';

import styles from './Empty.module.scss';

// who named you?  EmptyPanel
class Empty extends Component {
  render() {
    const { title, message } = this.props;

    return (
      <Panel sectioned title={title}>
        <h6 className={styles.Center}>{message}</h6>
      </Panel>
    );
  }
}

export default Empty;
