import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps, omitDeprecatedProps } from 'src/helpers/hibana';

export default function useHibanaToggle(OGComponent, HibanaComponent) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  return props => (whiteListedProps = [], deprecatedProps = []) => {
    return isHibanaEnabled ? (
      <HibanaComponent {...omitDeprecatedProps(props, whiteListedProps)} />
    ) : (
      <OGComponent {...omitSystemProps(props, deprecatedProps)} />
    );
  };
}
