import formatPercentage from '../formatPercentage';

describe('Format Display of Inbox Placement api percent values', () => {
  it('should format hundreds digit percent correctly', () => {
    expect(formatPercentage(1)).toEqual('100%');
  });

  it('should format tens digit percent correctly', () => {
    expect(formatPercentage(0.1)).toEqual('10.0%');
  });

  it('should format singles digit percent correctly', () => {
    expect(formatPercentage(0.01)).toEqual('01.0%');
  });

  it('should format tenths digit percent correctly', () => {
    expect(formatPercentage(0.001)).toEqual('00.1%');
  });

  it('should format percent correctly for undefined', () => {
    expect(formatPercentage(undefined)).toEqual('00.0%');
  });

  it('should format percent correctly for null', () => {
    expect(formatPercentage(null)).toEqual('00.0%');
  });
});
