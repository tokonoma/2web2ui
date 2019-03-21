import { IP_WARMUP_STAGES } from '../constants';

describe('IP Pool Constants', () => {
  describe('IP_WARMUP_STAGES', () => {
    it('returns stages with formatted volumes', () => {
      expect(IP_WARMUP_STAGES).toMatchSnapshot();
    });
  });
});
