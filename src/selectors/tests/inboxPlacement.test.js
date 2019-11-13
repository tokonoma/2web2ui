import { selectReferenceSeed,
  selectTestDetailsPageError,
  selectTestDetailsPageLoading,
  selectSinglePlacementResult } from '../inboxPlacement';

describe('Selectors: Inbox Placement', () => {
  describe('selectReferenceSeed', () => {
    let state;
    beforeEach(() => {
      state = {
        inboxPlacement: {
          seeds: [
            'foo@bar.com',
            'abc@xyz.com',
            'refSeed@seed.sparkpost.com'
          ]
        }
      };
    });

    it('returns first reference seed', () => {
      expect(selectReferenceSeed(state)).toEqual('refSeed@seed.sparkpost.com');
    });

    it('returns first undefined if no reference seed found', () => {
      state.inboxPlacement.seeds.pop();
      expect(selectReferenceSeed(state)).toBe(undefined);
    });
  });

  describe('selectTestDetailsPageError', () => {
    let state;
    beforeEach(() => {
      state = {
        inboxPlacement: {
          getTestError: false,
          getByProviderError: false,
          getByRegionError: false,
          getTestContentError: false
        }
      };
    });

    it('returns false when there are no errors', () => {
      expect(selectTestDetailsPageError(state)).toBe(false);
    });

    it('returns true when there is one error', () => {
      state.inboxPlacement.getTestError = true;
      expect(selectTestDetailsPageError(state)).toBe(true);
    });

    it('returns true when there is more than one error', () => {
      state.inboxPlacement.getTestError = true;
      state.inboxPlacement.getByProviderError = true;
      state.inboxPlacement.getByRegionError = true;
      state.inboxPlacement.getTestContentError = true;
      expect(selectTestDetailsPageError(state)).toBe(true);
    });
  });

  describe('selectTestDetailsPageLoading', () => {
    let state;
    beforeEach(() => {
      state = {
        inboxPlacement: {
          getTestPending: false,
          getByProviderPending: false,
          getByRegionPending: false,
          getTestContentPending: false
        }
      };
    });

    it('returns false when there is nothing pending', () => {
      expect(selectTestDetailsPageLoading(state)).toBe(false);
    });

    it('returns true when there is one item pending', () => {
      state.inboxPlacement.getTestPending = true;
      expect(selectTestDetailsPageLoading(state)).toBe(true);
    });

    it('returns true when there is more than one item pending', () => {
      state.inboxPlacement.getTestPending = true;
      state.inboxPlacement.getByProviderPending = true;
      state.inboxPlacement.getByRegionPending = true;
      state.inboxPlacement.getTestContentPending = true;
      expect(selectTestDetailsPageLoading(state)).toBe(true);
    });
  });

  describe('selectSinglePlacementResult', () => {
    let state;
    beforeEach(() => {
      state = {
        inboxPlacement: {
          placementsByProvider: [
            { id: 0,
              mailbox_provider: 'gmail',
              region: 'north america' }
          ],
          placementsByRegion: [
            { id: 0,
              region: 'europe' }
          ]
        }
      };
    });

    it('returns mailbox provider', () => {
      const props = { match: { params: { filterType: 'mailbox-provider', filterName: 'gmail' }}};
      expect(selectSinglePlacementResult(state, props)).toEqual(state.inboxPlacement.placementsByProvider[0]);
    });

    it('returns region', () => {
      const props = { match: { params: { filterType: 'region', filterName: 'europe' }}};
      expect(selectSinglePlacementResult(state, props)).toEqual(state.inboxPlacement.placementsByRegion[0]);
    });
  });
});
