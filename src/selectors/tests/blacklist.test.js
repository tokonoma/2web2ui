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
        days_listed: 156,
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

  it('selectRelatedIncidentsForResource returns resources not including the current incident', () => {
    const incident = {
      id: 'id-1',
      resource: 'foo',
      blacklist_name: 'spamhaus-sbl',
      occurred_at: '2019-07-23T12:48:00.000Z',
    };

    const incidentsForResource = [
      {
        id: 'id-1',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-2',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl 2',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-3',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl 3',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-4',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl 4',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-5',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl 5',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
    ];

    expect(
      blacklistSelectors.selectRelatedIncidentsForResource({
        blacklist: { incidentsForResource, incident },
      }),
    ).toHaveLength(3);

    // list of 3 where one is same id, so 2 total
    expect(
      blacklistSelectors.selectRelatedIncidentsForResource({
        blacklist: { incidentsForResource: incidentsForResource.slice(0, 3), incident },
      }),
    ).toHaveLength(2);

    // list of 3 where none have current id, so 3 total
    expect(
      blacklistSelectors.selectRelatedIncidentsForResource({
        blacklist: { incidentsForResource: incidentsForResource.slice(1), incident },
      }),
    ).toHaveLength(3);
  });

  it('selectRelatedIncidentsForBlacklist returns resources not including the current incident', () => {
    const incident = {
      id: 'id-1',
      resource: 'foo',
      blacklist_name: 'spamhaus-sbl',
      occurred_at: '2019-07-23T12:48:00.000Z',
    };

    const incidentsForBlacklist = [
      {
        id: 'id-1',
        resource: 'foo 1',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-2',
        resource: 'foo 2',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-3',
        resource: 'foo 3',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-4',
        resource: 'foo 4',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
      {
        id: 'id-5',
        resource: 'foo 5',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
    ];

    expect(
      blacklistSelectors.selectRelatedIncidentsForBlacklist({
        blacklist: { incidentsForBlacklist, incident },
      }),
    ).toHaveLength(3);

    // list of 3 where one is same id, so 2 total
    expect(
      blacklistSelectors.selectRelatedIncidentsForBlacklist({
        blacklist: { incidentsForBlacklist: incidentsForBlacklist.slice(0, 3), incident },
      }),
    ).toHaveLength(2);

    // list of 3 where none have current id, so 3 total
    expect(
      blacklistSelectors.selectRelatedIncidentsForBlacklist({
        blacklist: { incidentsForBlacklist: incidentsForBlacklist.slice(1), incident },
      }),
    ).toHaveLength(3);
  });

  it('selectHistoricalIncidents returns 3 resources not including the current incident', () => {
    const incident = {
      id: 'id-1',
      resource: 'foo',
      blacklist_name: 'spamhaus-sbl',
      occurred_at: '2019-07-23T12:48:00.000Z',
    };

    const historicalIncidents = [
      {
        id: 'id-1',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-22T12:48:00.000Z',
      },
      {
        id: 'id-2',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-21T12:48:00.000Z',
      },
      {
        id: 'id-3',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-20T12:48:00.000Z',
      },
      {
        id: 'id-4',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-19T12:48:00.000Z',
      },
      {
        id: 'id-5',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-18T12:48:00.000Z',
      },
      {
        id: 'id-6',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-17T12:48:00.000Z',
      },
      {
        id: 'id-7',
        resource: 'foo',
        blacklist_name: 'spamhaus-sbl',
        occurred_at: '2019-07-16T12:48:00.000Z',
      },
    ];

    // list of 7 where one is same id, so 6 total
    expect(
      blacklistSelectors.selectHistoricalIncidents({
        blacklist: { historicalIncidents, incident },
      }),
    ).toHaveLength(6);

    // list of 3 where one is same id, so 2 total
    expect(
      blacklistSelectors.selectHistoricalIncidents({
        blacklist: { historicalIncidents: historicalIncidents.slice(0, 3), incident },
      }),
    ).toHaveLength(2);

    // list of 6 where none have current id, so 6 total
    expect(
      blacklistSelectors.selectHistoricalIncidents({
        blacklist: { historicalIncidents: historicalIncidents.slice(1), incident },
      }),
    ).toHaveLength(6);
  });
});
