import React from 'react';
import { Stack as HibanaStack } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaStack.displayName = 'HibanaStack';

export default function Stack(props) {
  function OGStack(props) {
    return <>{props.children}</>;
  }
  return useHibanaToggle(OGStack, HibanaStack)(props)();
}
