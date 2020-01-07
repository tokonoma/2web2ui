import React from 'react';
import { Warning } from '@sparkpost/matchbox-icons';
import styles from './PreviewErrorFrame.module.scss';

/* eslint-disable no-restricted-syntax */
const PreviewErrorFrame = ({ errors }) => (
  <div className={styles.PreviewErrorFrame}>
    <Warning size={72} />
    <h1>Oh no! An Error Occurred</h1>
    <p>
      We are unable to load your template preview due to a {errors[0].message} on line{' '}
      {errors[0].line} of your {errors[0].part}.
    </p>
    <p>
      If you notice this happens often, check your substitution data or code syntax as these are
      frequent causes of preview errors.
    </p>
  </div>
);
/* eslint-enable no-restricted-syntax */

export default PreviewErrorFrame;
