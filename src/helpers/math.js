import { coalesce } from './units';

/**
 * Safely divides two numbers, returning 0 for NaN or infinite values
 * @param numerator
 * @param denominator
 * @return {number}
 */
export function safeDivide(numerator, denominator) {
  const value = numerator / denominator;
  return isFinite(value) ? value : 0;
}

/**
 * Calculates percentile rate by safely dividing numbers; returns 0 for NaN or infinite values
 * @param numerator
 * @param denominator
 * @return {number}
 */
export function safeRate(numerator, denominator) {
  return safeDivide(numerator, denominator) * 100;
}

/**
 * Linearly interpolates and clamps between two values
 * @param  {number} min
 * @param  {number} max
 * @param  {number} n
 * @return {number}
 * @example
 *   lerp(10, 20, 0.5)
 *   > 15
 */
export function lerp(min, max, n) {
  const value = (max - min) * n + min;

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export const sum = (...numbers) => numbers.reduce((acc, number) => acc + coalesce(number, 0), 0);
