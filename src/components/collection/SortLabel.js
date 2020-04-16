import React from 'react';
import { ArrowDropDown, ArrowDropUp } from '@sparkpost/matchbox-icons';
import { Box, Button, Text, UnstyledLink } from 'src/components/matchbox';

import cx from 'classnames';
import OGStyles from './SortLabel.module.scss';
import HibanaStyles from './SortLabelHibana.module.scss';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export const OGSortLabel = ({ label, direction, ...rest }) => {
  const styles = OGStyles;

  const classes = cx(
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
  const classes = cx(
    HibanaStyles.SortLabel,
    (direction === 'asc' || direction === 'desc') && HibanaStyles.selected,
  );

  return (
    <Button className={classes} flat {...rest}>
      <Text as="span" fontWeight="500" color="gray.800">
        {label}
      </Text>
      <Box>
        {direction !== 'desc' && (
          <div className={HibanaStyles.Up}>
            <ArrowDropUp />
          </div>
        )}
        {direction !== 'asc' && (
          <div className={HibanaStyles.Down}>
            <ArrowDropDown />
          </div>
        )}
      </Box>
    </Button>
  );
};

const SortLabel = props => {
  return useHibanaToggle(OGSortLabel, HibanaSortLabel)(props);
};

export default SortLabel;
