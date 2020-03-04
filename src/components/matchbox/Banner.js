import React from 'react';
import { Banner as PreHibanaBanner } from '@sparkpost/matchbox';
import { Banner as HibanaBanner } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import _ from 'lodash';

export default function Banner(props) {
  const [state, _dispatch] = useHibana();
  const { isHibanaEnabled } = state;
  const preHibanaProps = ['status', 'title', 'onDismiss', 'actions', 'action', 'children'];

  if (isHibanaEnabled) {
    return <HibanaBanner {...props} />;
  }
  return <PreHibanaBanner {..._.pick(props, preHibanaProps)} />;
}
