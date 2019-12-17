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

// Clamp a value in a range
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Linearly interpolates and clamps between two values
 * @param  {number} min
 * @param  {number} max
 * @param  {number} percent
 * @return {number}
 * @example
 *   lerp(10, 20, 0.5)
 *   > 15
 */
export function lerp(min, max, percent) {
  const value = (max - min) * percent + min;
  return clamp(value, min, max);
}

export const sum = (...numbers) => numbers.reduce((acc, number) => acc + coalesce(number, 0), 0);
