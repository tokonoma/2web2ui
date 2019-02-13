import * as reports from '../reports';
import * as dateHelpers from 'src/helpers/date';
import cases from 'jest-in-case';

jest.mock('src/helpers/date');
jest.mock('src/helpers/string', () => ({
  stringifyTypeaheadfilter: jest.fn((filter) => filter.id)
}));

describe('report helpers', () => {

  describe('parseSearch', () => {
    beforeEach(() => {
      dateHelpers.getRelativeDates = jest.fn(() => ({}));
    });

    it('should parse search with relative range', () => {
      const filters = 'filters=Domain:test.com&filters=Subaccount:test:123';
      const date = 'from=2017-11-03T14:43:00Z&to=2017-11-04T14:43:00Z';
      const metrics = 'metrics=count-something';
      const range = 'range=day';
      const search = `?${filters}&${date}&${metrics}&${range}`;

      dateHelpers.getRelativeDates = jest.fn(() => ({
        from: 'relative-from',
        to: 'relative-to',
        relativeRange: 'relative-range'
      }));

      expect(reports.parseSearch(search)).toMatchSnapshot();
      expect(dateHelpers.getRelativeDates).toHaveBeenCalledWith('day');
    });

    it('should parse search with custom range', () => {
      const filters = 'filters=Domain:test.com&filters=Subaccount:test:123';
      const date = 'from=2017-11-03T14:43:00Z&to=2017-11-04T14:43:00Z';
      const metrics = 'metrics=count-something';
      const range = 'range=custom';
      const search = `?${filters}&${date}&${metrics}&${range}`;

      dateHelpers.getRelativeDates = jest.fn(() => ({
        relativeRange: 'custom'
      }));

      expect(reports.parseSearch(search)).toMatchSnapshot();
      expect(dateHelpers.getRelativeDates).toHaveBeenCalledWith('custom');
    });

    it('should parse search with missing range', () => {
      const filters = 'filters=Domain:test.com&filters=Subaccount:test:123';
      const date = 'from=2017-11-03T14:43:00Z&to=2017-11-04T14:43:00Z';
      const metrics = 'metrics=count-something';
      const search = `?${filters}&${date}&${metrics}`;

      expect(reports.parseSearch(search)).toMatchSnapshot();
    });

    it('should parse search with no empty value', () => {
      expect(reports.parseSearch('')).toMatchSnapshot();
    });

    cases('handle invalid datetimes with custom format', (opts) => {
      expect(reports.parseSearch(opts.search).options).toEqual(opts.match);
    }, [
      { name: 'valid from', search: 'from=2017-11-03T14:43:00Z', match: { from: new Date('2017-11-03T14:43:00.000Z') }},
      { name: 'invalid from', search: 'from=2017-11-03T14:43:00Zz', match: {}},
      { name: 'invalid from with custom range', search: 'from=2017-11-03T14:43:00Zz&range=custom', match: {}},
      { name: 'invalid from valid to with custom range', search: 'from=2017-11-03T14:43:00Zk&range=custom&to=2017-11-04T14:43:00Z', match: { to: new Date('2017-11-04T14:43:00Z') }},
      { name: 'valid from invalid to with custom range', search: 'from=2017-11-03T14:43:00Z&range=custom&to=2017-11-04T14:43:00Zk', match: { from: new Date('2017-11-03T14:43:00Z') }},
      { name: 'invalid from invalid to with custom range', search: 'from=2017-11-03T14:43:00Zk&range=custom&to=2017-11-04T14:43:00Zk', match: {}},
      { name: 'invalid from invalid to with day range', search: 'from=2017-11-03T14:43:00Zk&range=day&to=2017-11-04T14:43:00Zk', match: {}}
    ]);
  });

  describe('dedupeFilters', () => {
    it('returns deduped filters', () => {
      const filters = [
        { type: 'Subaccount', value: 'created (ID 698)', id: 698 },
        { type: 'Subaccount', value: 'test create no key (ID 656)', id: 656 },
        { type: 'Subaccount', value: 'created (ID 698)', id: 698 },
        { type: 'not-subaccount', value: 'some random value', id: 550 }
      ];
      expect(reports.dedupeFilters(filters)).toMatchSnapshot();
    });
  });

});
