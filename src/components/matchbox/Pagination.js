import { Pagination as OGPagination } from '@sparkpost/matchbox';
import { Pagination as HibanaPagination } from '@sparkpost/matchbox-hibana';
import useHibanaToggle from './useHibanaToggle';

OGPagination.displayName = 'OGPagination';
HibanaPagination.displayName = 'HibanaPagination';

export default function Pagination(props) {
  return useHibanaToggle(OGPagination, HibanaPagination)(props)();
}
