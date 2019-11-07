import { createSelector } from 'reselect';
import endsWith from 'lodash/endsWith';

export const getSeeds = (state) => state.inboxPlacement.seeds;

export const selectReferenceSeed = createSelector(
  [getSeeds], (seeds) => seeds.find((seed) => endsWith(seed, '@seed.sparkpost.com')));

const getInboxPlacement = (state) => state.inboxPlacement;

export const selectTestDetailsPageError = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestError || inboxPlacement.getByProviderError || inboxPlacement.getByRegionError || inboxPlacement.getTestContentError
);

export const selectTestDetailsPageLoading = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestPending || inboxPlacement.getByProviderPending || inboxPlacement.getByRegionPending || inboxPlacement.getTestContentPending
);
