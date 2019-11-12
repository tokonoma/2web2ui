import { PLACEMENT_FILTER_TYPES } from '../constants/types';
import _ from 'lodash';

export const formatFilterName = (filterType, filterName) => {
  switch (filterType) {
    case PLACEMENT_FILTER_TYPES.REGION:
      return formatRegion(filterName);
    case PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER:
      return formatMailboxProvider(filterName);
    default:
      return '';
  }
};

const formatMailboxProvider = (name) => name;

const formatRegion = (name) => _.startCase(name);

export default formatFilterName;
