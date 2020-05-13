import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import OGStyles from './PageDescription.module.scss';
import hibanaStyles from './PageDescriptionHibana.module.scss';

export function OGPageDescription(props) {
  const { children, className } = props;

  return (
    <p className={classNames(OGStyles.PageDescription, className)} data-id={props['data-id']}>
      {children}
    </p>
  );
}

export function HibanaPageDescription(props) {
  const { children, className, mb = '500' } = props;

  return (
    <Text
      color="gray.700"
      fontSize="300"
      lineHeight="300"
      mb={mb}
      className={classNames(hibanaStyles.PageDescription, className)}
      data-id={props['data-id']}
    >
      {children}
    </Text>
  );
}

export default function PageDescription(props) {
  return useHibanaToggle(OGPageDescription, HibanaPageDescription)(props);
}

PageDescription.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  mb: PropTypes.string,
  marginBottom: PropTypes.string,
  'data-id': PropTypes.string,
};
