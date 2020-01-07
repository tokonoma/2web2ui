import { toHaveTextContent as testingLibraryToHaveTextContent } from '@testing-library/jest-dom';

export default function toHaveTextContent(elementOrReceived, expectedContent) {
  try {
    return testingLibraryToHaveTextContent.apply(this, [elementOrReceived, expectedContent]);
  } catch {
    const text = elementOrReceived.debug && elementOrReceived.debug();

    return {
      message: () => `expected component to have content "${expectedContent}"`,
      pass: RegExp(expectedContent).test(text),
    };
  }
}
