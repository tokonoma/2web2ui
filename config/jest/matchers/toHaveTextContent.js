// This was created for Moment, but could be used for any object with a isValid method
// see, https://github.com/testing-library/react-testing-library
// see, https://jestjs.io/docs/en/expect#custom-matchers-api
const toHaveTextContent = (received /* Enzyme Wrapper */, expected /* String or Regex */) => {
  const text = received.debug && received.debug();

  return {
    message: () => `expected component to have ${expected}`,
    pass: RegExp(expected).test(text),
  };
};

export default toHaveTextContent;
