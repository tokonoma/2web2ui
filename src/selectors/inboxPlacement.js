import { createSelector } from 'reselect';
import endsWith from 'lodash/endsWith';
import { PLACEMENT_FILTER_TYPES } from '../pages/inboxPlacement/constants/types';

export const getSeeds = (state) => state.inboxPlacement.seeds;

const getFilters = (state,props) => props.match.params;
const getInboxPlacementByMailbox = (state) => state.inboxPlacement.placementsByProvider;
const getInboxPlacementByRegion = (state) => state.inboxPlacement.placementsByRegion;

export const selectReferenceSeed = createSelector(
  [getSeeds], (seeds) => seeds.find((seed) => endsWith(seed, '@seed.sparkpost.com')));

const getInboxPlacement = (state) => state.inboxPlacement;

export const selectTestDetailsPageError = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestError || inboxPlacement.getByProviderError || inboxPlacement.getByRegionError || inboxPlacement.getTestContentError
);

export const selectTestDetailsPageLoading = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestPending || inboxPlacement.getByProviderPending || inboxPlacement.getByRegionPending || inboxPlacement.getTestContentPending
);

export const selectSinglePlacementResult = createSelector(
  [getInboxPlacementByMailbox, getInboxPlacementByRegion, getFilters],
  (inboxPlacementByMailbox, inboxPlacementByRegion, { filterType, filterName }) => {
    switch (filterType) {
      case PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER:
        return inboxPlacementByMailbox.find(({ mailbox_provider }) => mailbox_provider === filterName);
      case PLACEMENT_FILTER_TYPES.REGION:
        return inboxPlacementByRegion.find(({ region }) => region === filterName);
      default:
        return {};
    }
  });

