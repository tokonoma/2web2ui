import React from 'react';
import { ProgressBar as PreHibanaProgressBar } from '@sparkpost/matchbox';
import { ProgressBar as HibanaProgressBar } from 'hibana';
import { useHibana } from 'src/context/HibanaContext';
import _ from 'lodash';

export default function ProgressBar(props) {
  const [state, _dispatch] = useHibana();
  const { isHibanaEnabled } = state;
  const hibanaProps = {
    size: null,
  };

  if (isHibanaEnabled) {
    return <HibanaProgressBar {...props} />;
  }
  return <PreHibanaProgressBar {..._.pick(props, _.keys(hibanaProps))} />;
}
