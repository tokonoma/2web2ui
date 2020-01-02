import * as blacklistSelectors from '../blacklist';
const RealDate = Date;

describe('Blacklist Selectors: ', () => {
  let incidents, monitors;
  let formattedIncidents;
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2019-12-27T10:20:30Z').getTime());
  });
  afterAll(() => {
    global.Date = RealDate;
  });
  beforeEach(() => {
    incidents = [
      {
        id: 'id-1',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
    ];

    formattedIncidents = [
      {
        ...incidents[0],
        occurred_at_formatted: 'Jul 23 2019, 8:48am',
        occurred_at_timestamp: 1563886080000,
        resolved_at_formatted: null,
        resolved_at_timestamp: 0,
        days_listed: 157,
      },
    ];

    monitors = [
      {
        resource: 'foo',
        currently_blacklisted_on: ['bar'],
        last_listed_at: '2019-07-23T12:48:00.000Z',
        watched_at: '2019-07-23T12:48:00.000Z',
        total_listing_count: 12,
        active_listing_count: 2,
      },
    ];
  });

  it('selectIncidentsList returns formatted incidents data', () => {
    expect(blacklistSelectors.selectIncidentsList({ blacklist: { incidents } })).toEqual(
      formattedIncidents,
    );
  });

  it('selectBlacklistedCount returns total number of resources blacklisted', () => {
    expect(blacklistSelectors.selectBlacklistedCount({ blacklist: { monitors } })).toEqual(2);
  });
});
