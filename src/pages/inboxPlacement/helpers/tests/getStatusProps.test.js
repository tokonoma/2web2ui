import getStatusProps from '../getStatusProps';

describe('Get Status Props', () => {
  it('should get properties for running test', () => {
    expect(getStatusProps('running')).toEqual({ fill: '#2AC995', tooltip: 'In Progress' });
  });
  it('should get properties for completed test', () => {
    expect(getStatusProps('completed')).toEqual({ fill: '#FFFFFF', tooltip: '' });
  });
  it('should get properties for stopped test', () => {
    expect(getStatusProps('stopped')).toEqual({ fill: '#FF594D', tooltip: 'Test Stopped' });
  });
});
