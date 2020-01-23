import { hash } from './hash';

describe('hash', () => {
  it('gets the same value on multiple calls to hash', () => {
    expect(hash('abc123')).toEqual(hash('abc123'));
  });

  it('gets the different values for different string values', () => {
    const cids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    for (let i = 0; i < cids.length; i++) {
      for (let j = 0; j < cids.length; j++) {
        if (i !== j) {
          expect(hash(cids[i])).not.toEqual(hash(cids[j]));
        }
      }
    }
  });

  it('gets 0 hash for empty string', () => {
    expect(hash('')).toEqual(0);
  });
});
