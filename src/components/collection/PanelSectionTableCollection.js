import React from 'react';
import { Box, Panel, Table } from 'src/components/matchbox';
import { useHibana } from 'src/context/HibanaContext';
import TableCollection from './TableCollection';

const PanelSectionTableCollection = props => {
  const [{ isHibanaEnabled }] = useHibana();

  if (!isHibanaEnabled) {
    return <TableCollection {...props} />;
  }

  return (
    <TableCollection {...props} wrapperComponent={Table}>
      {({ collection, filterBox, heading, pagination }) => (
        <>
          {heading && <Panel.Section>{heading}</Panel.Section>}
          {filterBox && <Panel.Section>{filterBox}</Panel.Section>}
          <Box borderBottom="400">{collection}</Box>
          {pagination && <Panel.Section>{pagination}</Panel.Section>}
        </>
      )}
    </TableCollection>
  );
};

export default PanelSectionTableCollection;
