import formatFilterName from '../formatFilterName';
import { PLACEMENT_FILTER_TYPES } from '../../constants/types';


describe('Format Display of Inbox Placement Results Breakdown Group By Name', () => {
  it('should format mailbox providers correctly', () => {
    expect(formatFilterName(PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER, 'gmail')).toEqual('gmail');
  });

  it('should format regions correctly', () => {
    expect(formatFilterName(PLACEMENT_FILTER_TYPES.REGION, 'north america')).toEqual('North America');
  });
});
