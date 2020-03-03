import React from 'react';
import { ProgressBar as PreHibanaProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import _ from 'lodash';

export default function ProgressBar(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const preHibanaProps = ['completed', 'color'];

  if (isHibanaEnabled) {
    return <HibanaProgressBar {...props} />;
  }
  return <PreHibanaProgressBar {..._.pick(props, preHibanaProps)} />;
}
