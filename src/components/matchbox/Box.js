import React from 'react';
import { Box as HibanaBox } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Box(props) {
  function OGBox(props) {
    return <>{props.children}</>;
  }
  return useHibanaToggle(OGBox, HibanaBox)(props)();
}
