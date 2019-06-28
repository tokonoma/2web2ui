
const validate = (values) => {

  const errors = {};
  const { single_filter } = values;

  if (single_filter && single_filter.filter_type !== 'none' && (single_filter.filter_values.length === 0)) {
    errors.single_filter = { filter_values: 'Required' };
  }
  return errors;
};

export default validate;
