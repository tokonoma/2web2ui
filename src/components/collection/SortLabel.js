import React from 'react';
import classNames from 'classnames';
import { ArrowDropDown, ArrowDropUp } from '@sparkpost/matchbox-icons';
import { Box, Text, UnstyledLink } from 'src/components/matchbox';
import OGStyles from './SortLabel.module.scss';
import hibanaStyles from './SortLabelHibana.module.scss';
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

export const HibanaSortLabel = ({ label, direction, align, ...rest }) => {
  const classes = classNames(
    hibanaStyles.SortLabel,
    (direction === 'asc' || direction === 'desc') && hibanaStyles.selected,
    align === 'left' && hibanaStyles.leftAligned,
    align === 'right' && hibanaStyles.rightAligned,
  );

  return (
    <button className={classes} {...rest}>
      <Text as="span" fontWeight="600" color="gray.800">
        {label}
      </Text>

      <Box>
        {(!direction || direction === 'desc') && (
          <div className={hibanaStyles.Down}>
            <ArrowDropDown size={22} />
          </div>
        )}

        {direction === 'asc' && (
          <div className={hibanaStyles.Up}>
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
