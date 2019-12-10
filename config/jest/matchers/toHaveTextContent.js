import { toHaveTextContent as testingLibraryToHaveTextContent } from '@testing-library/jest-dom';

export default function toHaveTextContent(received, expectedContent) {
  try {
    // Using `.apply` necessary so that the Testing Library .toHaveValue had access to a valid value for `this`
    return testingLibraryToHaveTextContent.apply(this, [HTMLElement, expectedContent]);
  } catch {
    const text = received.debug && received.debug();

    return {
      message: () => `expected component to have content "${expectedContent}"`,
      pass: RegExp(expectedContent).test(text),
    };
  }
}
