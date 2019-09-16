import React from 'react';
import PropTypes from 'prop-types';

const MultiEmailField = (props) => (
    <>Some JSX</>
);

MultiEmailField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.string,
  value: PropTypes.string,
  selectedEmailAddresses: PropTypes.array,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func
};

export default MultiEmailField;
