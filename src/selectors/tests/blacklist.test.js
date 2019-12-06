import * as blacklistSelectors from '../blacklist';

describe('Blacklist Selectors: ', () => {
  let incidents;
  let formattedIncidents;

  beforeEach(() => {
    incidents = [
      {
        id: 'id-1',
        resource: true,
        blacklist_code: 'spamhaus-sbl',
        occurred_at: '2019-07-23T12:48:00.000Z',
      },
    ];

    formattedIncidents = [
      {
        ...incidents[0],
        occurred_at_formatted: 'Jul 23 2019, 8:48am',
        occurred_at_timestamp: 1563886080000,
      },
    ];
  });

  it('selectIncidentsList returns formatted incidents data', () => {
    expect(blacklistSelectors.selectIncidentsList({ blacklist: { incidents } })).toEqual(
      formattedIncidents,
    );
  });
});
