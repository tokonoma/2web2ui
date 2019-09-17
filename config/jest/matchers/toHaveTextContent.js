const toHaveTextContent = (received /* Enzyme Wrapper */, expectedContent /* String or Regex */) => {
  const text = received.debug && received.debug();

  return {
    message: () => `expected component to have content "${expectedContent}"`,
    pass: RegExp(expectedContent).test(text)
  };
};

export default toHaveTextContent;
