import React from 'react';
import PropTypes from 'prop-types';
import { ComboBoxTextField } from '@sparkpost/matchbox';

const MultiEmailField = (props) => {
  const {
    id,
    label,
    name,
    value,
    emailList,
    onChange,
    onKeyDownAndBlur,
    onRemoveEmail,
    error
  } = props;

  return (
    <ComboBoxTextField
      id={id}
      label={label}
      name={name}
      value={value}
      selectedItems={emailList}
      itemToString={({ email }) => email}
      onChange={onChange}
      onBlur={onKeyDownAndBlur}
      onKeyDown={onKeyDownAndBlur}
      removeItem={onRemoveEmail}
      error={error}
    />
  );
};

MultiEmailField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  emailList: PropTypes.array,
  onChange: PropTypes.func,
  onKeyDownAndBlur: PropTypes.func,
  onRemoveEmail: PropTypes.func,
  error: PropTypes.string
};

MultiEmailField.defaultProps = {
  emailList: [],
  value: '',
  error: ''
};

export default MultiEmailField;
