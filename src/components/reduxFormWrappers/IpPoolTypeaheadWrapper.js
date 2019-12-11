import React from 'react';
import IpPoolTypeahead from '../typeahead/IpPoolTypeahead';

/**
 * @example
 * // This plugs into a redux-form Field like so:
 * <Field
 *   name="template"
 *   component={TemplateTypeahead}
 *   results={templatesFromReduxStore}
 * />
 */
export default function IpPoolTypeaheadWrapper({ input, meta, ...rest }) {
  const { active, error, touched } = meta;

  return (
    <IpPoolTypeahead
      name={input.name}
      onChange={input.onChange}
      selectedItem={input.value}
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
}
