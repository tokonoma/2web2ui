import formatRow from '../FormatRow';

describe('formatRow: ',() => {
  it('renders correctly', () => {
    expect(formatRow({ 'number_succeeded': 1,
      'number_failed': 1,
      'batch_id': '8c4b19fb-07a2-42cb-84f7-3ab09a8049e0',
      'expiration_timestamp': '2019-09-29T00:00:00.000Z',
      'error_type': 'validation',
      'type': 'error',
      'number_duplicates': 0,
      'timestamp': '2019-09-18T20:09:38.000Z' })).toMatchSnapshot();
  });
});
