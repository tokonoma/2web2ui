import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDropDown, ArrowDropUp } from '@sparkpost/matchbox-icons';
import styles from './MetricDisplay.module.scss';

function MetricDisplay(props) {
  const { value, label, direction, color } = props;
  let Icon = null;

  if (direction === 'up') {
    Icon = ArrowDropUp;
  }

  if (direction === 'down') {
    Icon = ArrowDropDown;
  }

  return (
    <div className={styles.MetricDisplay}>
      <h4 className={styles.Label}>{label}</h4>
      <h5 className={styles.Value}>
        {value}
        {Icon && <span style={{ color }}><Icon className={styles.Icon} size={35}/></span>}
      </h5>
    </div>
  );
}

MetricDisplay.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down']),
  color: PropTypes.string
};

export default MetricDisplay;
