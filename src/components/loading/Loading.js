import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Box } from 'src/components/matchbox';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

import OGStyles from './Loading.module.scss';
import hibanaStyles from './LoadingHibana.module.scss';

/**
 * A centered loading animation
 */
export const Loading = props => {
  const { className, minHeight = '70vh' } = props;
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <div data-id="loading">
      <Box paddingTop={minHeight}>
        <LoadingSVG className={classnames(styles.Center, className)} />
      </Box>
    </div>
  );
};

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.displayName = 'Loading';

/**
 * Circle Animation
 */
export const LoadingSVG = ({ className = '', size = '' }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="25 25 50 50"
      className={classnames(styles.CircleWrapper, styles[size], className)}
    >
      <circle className={styles.Circle} cx="50" cy="50" r="20" vectorEffect="non-scaling-stroke" />
    </svg>
  );
};

LoadingSVG.displayName = 'LoadingSVG';

/**
 * SP Logo Animation
 */
export const LoadingLogoSVG = ({ className = '' }) => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 127.5 260"
      className={classnames(styles.Logo, className)}
    >
      <path d="M106.5 101.3c-13.4 10.1-16 28-16.4 40.1C68.8 116.8 129.3 44.6 60.6 0 103.1 55.1 0 109.3 0 190.4c0 31.8 19.9 59.9 63.5 69.6 42.8-9.1 64-37.8 64-69.6 0-47.4-29.5-63.3-21-89.1zM63.6 234c-23.3 0-42.2-18.9-42.2-42.2 0-23.3 18.9-42.2 42.2-42.2 23.3 0 42.2 18.9 42.2 42.2.1 23.3-18.8 42.2-42.2 42.2z" />
    </svg>
  );
};

LoadingLogoSVG.displayName = 'LoadingLogoSVG';
