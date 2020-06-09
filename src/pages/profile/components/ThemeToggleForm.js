import React from 'react';
import { ToggleBlock } from 'src/components/toggleBlock';
import { useHibana } from 'src/context/HibanaContext';

export default function ThemeToggleForm({ onChange }) {
  const [{ isHibanaEnabled }] = useHibana();

  return (
    <ToggleBlock
      input={{
        name: 'isHibanaEnabled',
        checked: Boolean(isHibanaEnabled),
        onChange: onChange,
      }}
      label="Use Redesigned Version of App"
      helpText="If you change your mind, just return to this page to turn on or off."
    />
  );
}
