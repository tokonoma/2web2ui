import React from 'react';
import { ComboBoxTypeahead } from 'src/components/typeahead/ComboBoxTypeahead.js';

export default function ComboBoxTypeaheadWrapper({ input, meta, ...rest }) {
  const { active, error, touched } = meta;
  return (
    <ComboBoxTypeahead
      {...input} //Contains value, name and onChange
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
}
