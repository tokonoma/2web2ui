import { toHaveValue as testingLibraryToHaveValue } from '@testing-library/jest-dom';
import { toHaveValue as enzymeToHaveValue } from 'enzyme-matchers';

export default function toHaveValue(element, expectedValue) {
  const isEnzymeObject =
    element &&
    (element.constructor.name === 'ShallowWrapper' || element.constructor.name === 'ReactWrapper');
  const isHTMLElement = element && element instanceof window.HTMLElement; // Based on testing library's implementation => https://github.com/testing-library/jest-dom/blob/master/src/utils.js#L53

  if (isEnzymeObject) {
    const { pass, message } = enzymeToHaveValue(element, expectedValue);

    return {
      pass,
      message: () => message,
    };
  }

  if (isHTMLElement) {
    // Using `.apply` necessary so that the Testing Library .toHaveValue had access to a valid value for `this`
    return testingLibraryToHaveValue.apply(this, [element, expectedValue]);
  }

  return {
    pass: false,
    message: () =>
      `A valid Enzyme object or HTML element is required when using the "toHaveValue" matcher.`,
  };
}
