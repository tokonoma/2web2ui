import React from 'react';
import { Text as HibanaText } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

HibanaText.displayName = 'HibanaText';

export default function Text(props) {
  function OGText(props) {
    return <>{props.children}</>;
  }
  return useHibanaToggle(OGText, HibanaText)(props)();
}
