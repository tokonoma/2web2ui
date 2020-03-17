import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@sparkpost/matchbox';
import { Panel } from 'src/components/matchbox';
import { InfoOutline } from '@sparkpost/matchbox-icons';

import styles from './MetricCard.module.scss';

const MetricCard = ({ label, value, tooltipContent, ...rest }) => {
  const tooltip = tooltipContent ? (
    <Tooltip dark content={tooltipContent} horizontalOffset="-1.1rem">
      <InfoOutline />
    </Tooltip>
  ) : null;

  return (
    <div className={styles.MetricCard}>
      <Panel className={styles.Panel} {...rest} p={'500'}>
        <Panel.Section>
          <h1 className={styles.Value}>{value}</h1>
          <h6 className={styles.Label}>
            {label} {tooltip}
          </h6>
        </Panel.Section>
      </Panel>
    </div>
  );
};

MetricCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  tooltipContent: PropTypes.string,
  label: PropTypes.string,
};

export default MetricCard;
