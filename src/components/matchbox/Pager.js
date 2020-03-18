import React from 'react';
import { Pager as OGPager } from '@sparkpost/matchbox';
import { Pager as HibanaPager } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function Pager(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPager {...omitSystemProps(props)} />;
  }

  return <HibanaPager {...props} />;
}

function Next(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPager.Next {...omitSystemProps(props)} />;
  }

  return <HibanaPager.Next {...props} />;
}

function Previous(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPager.Previous {...omitSystemProps(props)} />;
  }

  return <HibanaPager.Previous {...props} />;
}

Pager.Next = Next;
Pager.Previous = Previous;

Pager.displayName = 'Pager';
Next.displayName = 'Pager.Next';
Previous.displayName = 'Pager.Previous';

export default Pager;
