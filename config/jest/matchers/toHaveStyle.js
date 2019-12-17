import { toHaveStyle as testingLibraryToHaveStyle } from '@testing-library/jest-dom';
import { toHaveStyle as enzymeToHaveStyle } from 'enzyme-matchers';

export default function toHaveStyle(element, expectedStyleKey, expectedStyle) {
  const isEnzymeObject =
    element &&
    (element.constructor.name === 'ShallowWrapper' || element.constructor.name === 'ReactWrapper');
  const isHTMLElement = element && element instanceof window.HTMLElement; // Based on testing library's implementation => https://github.com/testing-library/jest-dom/blob/master/src/utils.js#L53

  if (isEnzymeObject) {
    const { pass, message, negatedMessage, contextualInformation } = enzymeToHaveStyle(
      element,
      expectedStyleKey,
      expectedStyle,
    );

    return {
      pass,
      message: () => message,
      negatedMessage,
      contextualInformation,
    };
  }

  if (isHTMLElement) {
    // Renaming argument to avoid confusion - the first argument in the Enzyme vs. React Testing Library implementation
    // are distinct enough that it could introduce confusion.
    const expectedStyle = expectedStyleKey;

    // Using `.apply` necessary so that the Testing Library .toHaveStyle had access to a valid value for `this`
    return testingLibraryToHaveStyle.apply(this, [element, expectedStyle]);
  }

  return {
    pass: false,
    message: () =>
      `A valid Enzyme object or HTML element is required when using the "toHaveValue" matcher.`,
  };
}
