import sparkpostApiRequestMock from './helpers/sparkpostApiRequestMock';

export function getHackathonData(
  key = 'delivery',
  startDate = '2019-12-03',
  endDate = '2019-12-10',
  campaignId = 'p1368:c48773:t1232045:Order Confirmation | Trigger | Cx | HQ Oth',
) {
  return sparkpostApiRequestMock({
    type: 'HACK',
    meta: {
      method: 'GET',
      url: `/${key}`,
      params: {
        Authorization: '',
        campaignId,
        startDate,
        endDate,
      },
    },
  });
}
