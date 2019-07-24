import * as selectors from '../customReports';

describe('Selectors: customReports', () => {
  let state;

  function setUIOptions(opt) {
    state = { currentUser: { options: { ui: opt }}};
  }

  it('returns reports ehancements feature flag', () => {
    setUIOptions({
      feature_reports_enhancements: true
    });

    expect(selectors.selectReportsEnhancementsEnabled(state)).toMatchSnapshot();
  });

  it('returns sorted custom reports', () => {
    setUIOptions({
      customReports: [
        { name: 'zzz', url: 'test-url' },
        { name: 'aaa', url: 'test-url' }
      ]
    });

    expect(selectors.selectCustomReports(state)).toMatchSnapshot();
  });

  it('returns an empty array with no existin reports', () => {
    setUIOptions({
      customReports: undefined
    });

    expect(selectors.selectCustomReports(state)).toEqual([]);
  });

});
