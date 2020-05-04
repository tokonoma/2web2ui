import React from 'react';
import styles from './BreadCrumbs.module.scss';
import { Box, Text } from 'src/components/matchbox';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export const OGBreadCrumbs = ({ children }) => (
  <div className={styles.BreadCrumbContainer}>
    {React.Children.map(children, (child, index) => (
      <>
        {child}{' '}
        {index + 1 !== React.Children.count(children) && (
          <div className={styles.Arrow}>&nbsp;>&nbsp;</div>
        )}
      </>
    ))}
  </div>
);

export const HibanaBreadCrumbs = ({ children }) => (
  <Box pr="200" pb="400">
    {React.Children.map(children, (child, index) => (
      <>
        {child}{' '}
        {index + 1 !== React.Children.count(children) && (
          <Text as="span" fontWeight="semibold" fontSize="400" display="inline-block" mx="200">
            >
          </Text>
        )}
      </>
    ))}
  </Box>
);

export function BreadCrumbs(props) {
  return useHibanaToggle(OGBreadCrumbs, HibanaBreadCrumbs)(props);
}

export const HibanaBreadCrumbsItem = ({ children, active, onClick }) => (
  <Box
    as="span"
    onClick={onClick}
    color={!active && 'blue.700'}
    display="inline-block"
    fontWeight="medium"
    cursor="pointer"
  >
    {children}{' '}
  </Box>
);

export const OGBreadCrumbsItem = ({ children, active, onClick }) => (
  <span
    onClick={onClick}
    className={classNames(!active && styles.InActiveItem, styles.BreadCrumbItem)}
  >
    {children}{' '}
  </span>
);

export function BreadCrumbsItem(props) {
  return useHibanaToggle(OGBreadCrumbsItem, HibanaBreadCrumbsItem)(props);
}

BreadCrumbs.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      BreadCrumbItem: PropTypes.func,
    }),
  ),
};

BreadCrumbsItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
