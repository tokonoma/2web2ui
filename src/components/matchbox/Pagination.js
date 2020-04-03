import React from 'react';
import { Pagination as OGPagination } from '@sparkpost/matchbox';
import { Pagination as HibanaPagination } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

OGPagination.displayName = 'OGPagination';
HibanaPagination.displayName = 'HibanaPagination';

export default function Pagination(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPagination {...omitSystemProps(props)} />;
  }
  return <HibanaPagination {...props} />;
}
