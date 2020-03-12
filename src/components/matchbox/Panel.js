import React from 'react';
import { Panel as OGPanel } from '@sparkpost/matchbox';
import { Panel as HibanaPanel } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

HibanaPanel.displayName = 'HibanaPanel';
OGPanel.displayName = 'OGPanel';

const Panel = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGPanel {...omitSystemProps(props)} />;
  }
  return <HibanaPanel {...props} />;
};

const Section = props => {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;
  if (!isHibanaEnabled) {
    return <OGPanel.Section {...omitSystemProps(props)} />;
  }
  return <HibanaPanel.Section {...props} />;
};

Panel.Section = Section;

export default Panel;
