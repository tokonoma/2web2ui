import React from 'react';
import { Table } from 'src/components/matchbox';

function Billboard({ children }) {
  return (
    <tbody>
      <Table.Row>
        <Table.Cell colSpan="100%" style={{ padding: 0 }}>
          {children}

          <hr style={{ margin: 0 }} role="presentation" />
        </Table.Cell>
      </Table.Row>
    </tbody>
  );
}

export default Billboard;
