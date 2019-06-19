import * as alertsSelectors from '../alertsV1';



describe('Alerts Selectors: ', () => {
  let alertsV1; let formattedAlerts;

  beforeEach(() => {
    const list = [
      {
        id: 'id-1',
        muted: true,
        name: 'my alert 1',
        metric: 'monthly_sending_limit',
        last_triggered: null
      },
      {
        id: 'id-2',
        muted: false,
        name: 'my alert 2',
        metric: 'monthly_sending_limit',
        last_triggered: '2019-06-05T14:48:00.000Z'
      },
      {
        id: 'id-3',
        muted: true,
        name: 'my alert 3',
        metric: 'health_score',
        last_triggered: '2019-06-15T14:48:00.000Z'
      }
    ];

    formattedAlerts = [
      {
        ...list[0],
        formattedDate: 'Never Triggered',
        sortKey: '0'
      },
      {
        ...list[1],
        formattedDate: 'Jun 5 2019, 10:48am',
        sortKey: '2019-06-05T14:48:00.000Z'
      },
      {
        ...list[2],
        formattedDate: 'Jun 15 2019, 10:48am',
        sortKey: '2019-06-15T14:48:00.000Z'
      }
    ];

    alertsV1 = { list };
  });

  describe('Alerts List', () => {
    it('returns formatted alerts data', () => {
      expect(alertsSelectors.selectAlertsList({ alertsV1 })).toEqual(formattedAlerts);
    });
  });
});
