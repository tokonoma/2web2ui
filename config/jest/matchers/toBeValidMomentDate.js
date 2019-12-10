// This was created for Moment, but could be used for any object with a [isValid](https://momentjs.com/docs/#/parsing/is-valid/) method
const toBeValidMomentDate = received => {
  if (received && received.isValid && received.isValid()) {
    return {
      message: () => `expected ${received} not to be valid`,
      pass: true,
    };
  }

  return {
    message: () => `expected ${received} to be valid`,
    pass: false,
  };
};

export default toBeValidMomentDate;
