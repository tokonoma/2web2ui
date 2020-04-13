import React from 'react';
import { Grid as OGGrid } from '@sparkpost/matchbox';
import { Grid as HibanaGrid } from '@sparkpost/matchbox-hibana';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';

function Grid(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGGrid {...omitSystemProps(props)} />;
  }

  return <HibanaGrid {...props} />;
}

function Column(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  if (!isHibanaEnabled) {
    return <OGGrid.Column {...omitSystemProps(props)} />;
  }

  return <HibanaGrid.Column {...props} />;
}

Grid.Column = Column;
Column.displayName = 'Grid.Column';
HibanaGrid.Column.displayName = 'HibanaGrid.Column';
HibanaGrid.displayName = 'HibanaGrid';

export default Grid;
