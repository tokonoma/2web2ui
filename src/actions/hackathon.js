import sparkpostApiRequestMock from './helpers/sparkpostApiRequestMock';

export function getHackathonData(key='open') {
  return sparkpostApiRequestMock({
    type: 'HACK',
    meta: {
      method: 'GET',
      url: `/${key}`,
      params: {
        Authorization: '',
      },
    },
  });
}
