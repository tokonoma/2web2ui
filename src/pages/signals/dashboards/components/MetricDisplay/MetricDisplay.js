import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDropDown, ArrowDropUp } from '@sparkpost/matchbox-icons';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import { Heading } from 'src/components/text';
import OGStyles from './MetricDisplay.module.scss';
import hibanaStyles from './MetricDisplayHibana.module.scss';

function MetricDisplay(props) {
  const { value, label, direction, color } = props;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  let Icon = null;

  if (direction === 'up') {
    Icon = ArrowDropUp;
  }

  if (direction === 'down') {
    Icon = ArrowDropDown;
  }

  return (
    <div className={styles.MetricDisplay} data-id={props['data-id']}>
      <Heading as="h4" className={styles.Label}>
        {label}
      </Heading>
      <Heading as="h5" className={styles.Value}>
        {value}
        {Icon && <Icon className={styles.Icon} size={35} style={{ color }} />}
      </Heading>
    </div>
  );
}

MetricDisplay.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down']),
  color: PropTypes.string,
};

export default MetricDisplay;
