import React, { Component } from 'react';
import { TableCollection } from 'src/components';
import { Panel } from '@sparkpost/matchbox';

const columns = [
  { label: 'Address', sortKey: 'email' },
  { label: 'Name', sortKey: 'name' }
];

export class RecipientsCollection extends Component {
  getRowData = ({ address }) => [address.email, address.name]

  render() {
    const { recipients } = this.props;

    return (<Panel title='Preview Contacts'>
      <TableCollection
        columns={columns}
        rows={recipients}
        getRowData={this.getRowData}
        pagination={true}
      />
    </Panel>);
  }
}

RecipientsCollection.defaultProps = {
  recipients: []
};

export default RecipientsCollection;
