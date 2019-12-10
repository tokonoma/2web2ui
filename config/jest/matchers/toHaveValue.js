import { toHaveValue as testingLibraryToHaveValue } from '@testing-library/jest-dom';
import { toHaveValue as enzymeToHaveValue } from 'enzyme-matchers/lib/assertions/toHaveValue';

export default function toHaveValue(element, expectedValue) {
  try {
    return enzymeToHaveValue(element, expectedValue);
  } catch {
    // Using `.apply` necessary so that the Testing Library .toHaveValue had access to a valid value for `this`
    return testingLibraryToHaveValue.apply(this, [element, expectedValue]);
  }
}
