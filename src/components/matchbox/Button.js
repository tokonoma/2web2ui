import React from 'react';
import PropTypes from 'prop-types';
import { Button as OGButton } from '@sparkpost/matchbox';
import { Button as HibanaButton } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

const Button = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const { variant } = props;

  if (!isHibanaEnabled) {
    return (
      <OGButton
        {...getVariantProps({ variant, isHibanaEnabled })}
        {...omitSystemProps(props, ['size', 'color', 'variant'])}
      />
    );
  }

  return <HibanaButton {...getVariantProps({ variant, isHibanaEnabled })} {...props} />;
};

const Group = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGButton.Group {...omitSystemProps(props)} />;
  }

  return <HibanaButton.Group {...props} />;
};

// TODO:
// 1. Remove `isHibanaEnabled` argument when the old theme is removed from the app
// 2. Remove separate `switch` statement when the old theme is removed
function getVariantProps({ variant, isHibanaEnabled }) {
  if (isHibanaEnabled) {
    switch (variant) {
      case 'primary':
        return {
          color: 'blue',
        };
      case 'secondary':
        return {
          color: 'blue',
          outlineBorder: true,
        };
      case 'tertiary':
        return {
          color: 'blue',
          flat: true,
        };
      case 'destructive':
        return {
          destructive: true,
        };
      case 'destructive-secondary':
        return {
          color: 'red',
          outlineBorder: true,
        };
      case 'destructive-secondary':
        return {
          color: 'red',
          outlineBorder: true,
        };
      // use when connecting a button to a TextField
      case 'connected':
        return {
          color: 'blue',
          outline: true,
        };
      default:
        return {
          color: 'blue',
          flat: true,
        };
    }
  }

  switch (variant) {
    case 'primary':
      return {
        color: 'orange',
      };
    case 'destructive':
      return {
        destructive: true,
      };
    case 'secondary':
    case 'tertiary':
    case 'connected':
    default:
      return undefined;
  }
}

Group.displayName = 'Button.Group';
Button.Group = Group;
HibanaButton.displayName = 'HibanaButton';
HibanaButton.Group.displayName = 'HibanaButton.Group';

Button.propTypes = {
  variant: PropTypes.string,
};

export default Button;
