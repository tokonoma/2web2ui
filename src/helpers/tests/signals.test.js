import { getFriendlyTitle, getDoD, getCaretProps } from '../signals';
import thresholds from 'src/pages/signals/constants/healthScoreThresholds';

describe('.getFriendlyTitle', () => {
  it('returns nothing with no prefix set', () => {
    expect(getFriendlyTitle({
      prefix: undefined,
      facet: 'facet',
      facetId: 'facetId'
    })).toEqual(null);
  });

  it('returns prefix with facet id if facet is not a subaccount', () => {
    expect(getFriendlyTitle({
      prefix: 'title for',
      facet: 'facet',
      facetId: 'facetId'
    })).toEqual('title for facetId');
  });

  it('returns title with subaccount id if facet is subaccount but not master', () => {
    expect(getFriendlyTitle({
      prefix: 'title for',
      facet: 'sid',
      facetId: 'facetId'
    })).toEqual('title for Subaccount facetId');
  });

  it('returns title with master account if facet is subaccount and id is 0', () => {
    expect(getFriendlyTitle({
      prefix: 'title for',
      facet: 'sid',
      facetId: 0
    })).toEqual('title for Master Account');
  });

  it('returns correct suffix with a facet and non-master subaccount', () => {
    expect(getFriendlyTitle({
      prefix: 'title for',
      facet: 'facet',
      facetId: 'facetId',
      subaccountId: 23
    })).toEqual('title for facetId (Subaccount 23)');
  });

  it('returns correct suffix with a facet and master subaccount', () => {
    expect(getFriendlyTitle({
      prefix: 'title for',
      facet: 'facet',
      facetId: 'facetId',
      subaccountId: 0
    })).toEqual('title for facetId (Master Account)');
  });
});

describe('.getDoD', () => {
  it('returns correct day over day change', () => {
    expect(getDoD(20, 10)).toEqual(100);
    expect(getDoD(20, 12)).toEqual(66.7);
    expect(getDoD(0, 1)).toEqual(-100);
    expect(getDoD(1, 0)).toEqual(Infinity);
  });

  it('returns null if current value is nil', () => {
    expect(getDoD(undefined, 10)).toBeNull();
  });

  it('returns null if previous value is nil', () => {
    expect(getDoD(10, undefined)).toBeNull();
  });
});

describe('.getCaretProps', () => {
  it('returns props for a positive value', () => {
    expect(getCaretProps(10)).toEqual({
      direction: 'up',
      color: thresholds.good.color
    });
  });

  it('returns props for a negative value', () => {
    expect(getCaretProps(-10)).toEqual({
      direction: 'down',
      color: thresholds.danger.color
    });
  });

  it('returns props for a positive value with reversed colors', () => {
    expect(getCaretProps(10, true)).toEqual({
      direction: 'up',
      color: thresholds.danger.color
    });
  });

  it('returns props for a negative value with reversed colors', () => {
    expect(getCaretProps(-10, true)).toEqual({
      direction: 'down',
      color: thresholds.good.color
    });
  });
});
