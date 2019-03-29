import React, { Fragment } from 'react';
import { getFriendlyTitle } from 'src/helpers/signals';
import styles from './OtherChartsHeader.module.scss';

const OtherChartsHeader = ({ facet, facetId, subaccountId }) => (
  <Fragment>
    <h2 className={styles.Header}>
      {getFriendlyTitle({
        prefix: 'Other charts for',
        facet,
        facetId,
        subaccountId,
        dimension: false
      })}
    </h2>
    <hr className={styles.Line} />
  </Fragment>
);

export default OtherChartsHeader;
