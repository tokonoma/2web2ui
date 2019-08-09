import getStatusProps from '../getStatusProps';

describe('Get Status Props', () => {
  it('should get properties for running test', () => {
    expect(getStatusProps('running')).toEqual({ fill: '#2AC995', tooltip: 'In Progress' });
  });
});
