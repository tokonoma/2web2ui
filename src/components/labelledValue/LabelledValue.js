import React from 'react';
import PropTypes from 'prop-types';
import { useHibana } from 'src/context/HibanaContext';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import OGStyles from './LabelledValue.module.scss';
import hibanaStyles from './LabelledValueHibana.module.scss';
const LabelledValue = ({ label, value, children, bold = true }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  /*
   * Before we evaluate `value`, we first must check to see if it's a boolean or not.
   * If it is a boolean, we translate it into the string equivalent, otherwise the ternary
   * that occurs afterwards (childrenMarkup) will not do the right thing (esp. if false)
   */
  if (typeof value === 'boolean') {
    value = value.toString();
  }
  const childrenMarkup = value ? (
    !bold || isHibanaEnabled ? (
      <p>{value}</p>
    ) : (
      <h6>{value}</h6>
    )
  ) : (
    children
  );

  const labelMarkup = label ? (
    <div className={styles.LabelContainer}>
      <small className={styles.Label}>{label}</small>
    </div>
  ) : null;

  return (
    <div className={styles.LabelledValue}>
      {labelMarkup}
      <div className={styles.Content}>{childrenMarkup}</div>
    </div>
  );
};

LabelledValue.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  value: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  bold: PropTypes.bool,
};

export default LabelledValue;
