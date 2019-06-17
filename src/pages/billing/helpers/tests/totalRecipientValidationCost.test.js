import totalRVCost from '../totalRecipientValidationCost';

describe('Total RV Cost', () => {
  it('should calculate price correctly', () => {
    expect(totalRVCost(123321)).toEqual('$599.96');
  });

  it('should calculate price correctly for undefined', () => {
    expect(totalRVCost(undefined)).toEqual('$0.00');
  });
});
