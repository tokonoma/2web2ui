import React from 'react';
import { Inline as HibanaInline } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

export default function Inline(props) {
  function OGInline(props) {
    return <>{props.children}</>;
  }
  return useHibanaToggle(OGInline, HibanaInline)(props)();
}
