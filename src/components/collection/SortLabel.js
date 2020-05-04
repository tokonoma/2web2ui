import React from 'react';
import classNames from 'classnames';
import { ArrowDropDown, ArrowDropUp } from '@sparkpost/matchbox-icons';
import { Box, Text, UnstyledLink } from 'src/components/matchbox';
import OGStyles from './SortLabel.module.scss';
import HibanaStyles from './SortLabelHibana.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export const OGSortLabel = ({ label, direction, ...rest }) => {
  const styles = OGStyles;

  const classes = classNames(
    styles.SortLabel,
    direction === 'asc' && styles.asc,
    direction === 'desc' && styles.desc,
  );

  return (
    <UnstyledLink className={classes} {...rest}>
      <span>{label}</span>
      <span>
        <div className={styles.Up}>
          <ArrowDropUp />
        </div>
        <div className={styles.Down}>
          <ArrowDropDown />
        </div>
      </span>
    </UnstyledLink>
  );
};

export const HibanaSortLabel = ({ label, direction, ...rest }) => {
  const classes = classNames(
    HibanaStyles.SortLabel,
    (direction === 'asc' || direction === 'desc') && HibanaStyles.selected,
  );

  return (
    <button className={classes} {...rest}>
      <Text as="span" fontWeight="500" color="gray.800">
        {label}
      </Text>

      <Box>
        {(!direction || direction === 'desc') && (
          <div className={HibanaStyles.Down}>
            <ArrowDropDown size={22} />
          </div>
        )}

        {direction === 'asc' && (
          <div className={HibanaStyles.Up}>
            <ArrowDropUp size={22} />
          </div>
        )}
      </Box>
    </button>
  );
};

const SortLabel = props => {
  return useHibanaToggle(OGSortLabel, HibanaSortLabel)(props);
};

export default SortLabel;
