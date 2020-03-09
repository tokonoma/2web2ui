import React from 'react';
import { Expandable as OGExpandable } from '@sparkpost/matchbox';
import { Expandable as HibanaExpandable } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';
import _ from 'lodash';

export default function Expandable(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  const whiteListedProps = ['id'];

  if (isHibanaEnabled) {
    return <HibanaExpandable {...props} />;
  }
  return <OGExpandable {...omitSystemProps(props, whiteListedProps)} />;
}
