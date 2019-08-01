import { toCollection } from '../object';

describe('object', () => {
  describe('toCollection', () => {
    it('returns empty array for empty object', () => {
      expect(toCollection({})).toEqual([]);
    });

    it('returns collection', () => {
      const obj = {
        one: { label: 'One' },
        two: { label: 'Two' }
      };

      expect(toCollection(obj)).toEqual([
        { key: 'one', label: 'One' },
        { key: 'two', label: 'Two' }
      ]);
    });
  });
});
