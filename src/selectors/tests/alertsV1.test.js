import * as alertsSelectors from '../alertsV1';



describe('Alerts Selectors: ', () => {
  let alertsV1;
  let formattedAlerts;

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
        last_triggered_formatted: null,
        last_triggered_timestamp: 0
      },
      {
        ...list[1],
        last_triggered_formatted: 'Jun 5 2019, 10:48am',
        last_triggered_timestamp: 1559746080000
      },
      {
        ...list[2],
        last_triggered_formatted: 'Jun 15 2019, 10:48am',
        last_triggered_timestamp: 1560610080000
      }
    ];

    alertsV1 = { list };
  });

  it('selectAlertsList returns formatted alerts data', () => {
    expect(alertsSelectors.selectAlertsList({ alertsV1 })).toEqual(formattedAlerts);
  });

  it('selectRecentlyTriggeredAlerts returns triggered alerts in order descending ', () => {
    expect(alertsSelectors.selectRecentlyTriggeredAlerts({ alertsV1 })).toEqual([formattedAlerts[2],formattedAlerts[1]]);
  });

});
