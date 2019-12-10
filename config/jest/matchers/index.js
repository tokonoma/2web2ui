// Some Testing Library matchers need to have an alias to prevent conflicts with Enzyme matchers
export {
  toBeDisabled,
  toBeEnabled,
  toBeEmpty,
  toBeInTheDocument,
  toBeInvalid,
  toBeRequired,
  toBeValid as RTLtoBeValid,
  toBeVisible,
  toContainElement,
  toContainHTML,
  toHaveAttribute,
  toHaveClass,
  toHaveFocus,
  toHaveFormValues,
  toHaveStyle,
  toHaveTextContent as RTLtoHaveTextContent,
  toHaveValue as RTLtoHaveValue,
  toBeChecked,
} from '@testing-library/jest-dom';
export { default as toBeValid } from './toBeValid';
export { default as toHaveTextContent } from './toHaveTextContent';
