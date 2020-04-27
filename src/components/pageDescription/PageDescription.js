import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';

export function OGPageDescription(props) {
  const { children, className } = props;

  return (
    <p className={className} data-id={props['data-id']}>
      {children}
    </p>
  );
}

export function HibanaPageDescription(props) {
  const { children, className, maxWidth } = props;

  return (
    <Text
      color="gray.700"
      fontSize="300"
      lineHeight="300"
      maxWidth={maxWidth}
      className={className}
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
  maxWidth: PropTypes.string,
  'data-id': PropTypes.string,
};
