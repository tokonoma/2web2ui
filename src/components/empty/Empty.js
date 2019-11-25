import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from '@sparkpost/matchbox';

import styles from './Empty.module.scss';

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

Empty.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string
};

export default Empty;
