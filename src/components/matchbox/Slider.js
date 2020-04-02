import React from 'react';
import { Slider as OGSlider } from '@sparkpost/matchbox';
import { Slider as HibanaSlider } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

export default function Slider(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGSlider {...omitSystemProps(props)} />;
  }

  return <HibanaSlider {...props} />;
}
