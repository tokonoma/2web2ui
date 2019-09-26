import validator from './validator';

// There is some magic Webpack does that allows this file to be imported, but we don't use Webpack
// for our test suite and Node doesn't have the same powers
const ampValidator = !validator.amp
  ? { amp: { validator: jest.fn() }}
  : validator.amp.validator;

export default ampValidator;
