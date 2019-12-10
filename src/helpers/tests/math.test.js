import * as mathHelpers from '../math';

describe('math helpers', () => {
  it('should calculate rate', () => {
    expect(mathHelpers.safeRate(5, 10)).toEqual(50);
  });

  it('should default infinite average values to 0', () => {
    expect(mathHelpers.safeDivide(5, 0)).toEqual(0);
  });

  describe('clamp', () => {
    it('should return value when between min and max', () => {
      expect(mathHelpers.clamp(50, 0, 100)).toEqual(50);
    });

    it('should return min', () => {
      expect(mathHelpers.clamp(-1, 0, 100)).toEqual(0);
    });

    it('should return max', () => {
      expect(mathHelpers.clamp(101, 0, 100)).toEqual(100);
    });
  });

  describe('linear interpolation', () => {
    it('should return an interpolated number', () => {
      expect(mathHelpers.lerp(-10, 30, 0.5)).toEqual(10);
    });

    it('should not return a value less than minimum', () => {
      expect(mathHelpers.lerp(-10, 30, -1)).toEqual(-10);
    });

    it('should not return a value more than maximum', () => {
      expect(mathHelpers.lerp(-10, 30, 1.2)).toEqual(30);
    });
  });

  describe('sum', () => {
    it('returns zero by default', () => {
      expect(mathHelpers.sum()).toEqual(0);
    });

    it('returns integer', () => {
      expect(mathHelpers.sum(1, 1)).toEqual(2);
    });

    it('returns float', () => {
      expect(mathHelpers.sum(1, 0.5)).toEqual(1.5);
    });
  });
});
