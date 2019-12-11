import React from 'react';
import RecipientListTypeahead from '../typeahead/RecipientListTypeahead';

/**
 * @example
 * // This plugs into a redux-form Field like so:
 * <Field
 *   name="template"
 *   component={TemplateTypeahead}
 *   results={templatesFromReduxStore}
 * />
 */
export default function RecipientListTypeaheadWrapper({ input, meta, ...rest }) {
  const { active, error, touched } = meta;

  return (
    <RecipientListTypeahead
      name={input.name}
      onChange={input.onChange}
      selectedItem={input.value}
      error={!active && touched && error ? error : undefined}
      {...rest}
    />
  );
}
