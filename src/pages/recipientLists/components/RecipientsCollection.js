import React, { Component } from 'react';
import { TableCollection } from 'src/components';
import { Panel } from '@sparkpost/matchbox';

const columns = [
  { label: 'Address', sortKey: 'address.email' },
  { label: 'Name', sortKey: 'address.name' }
];

export class RecipientsCollection extends Component {
  getRowData = ({ address }) => [address.email, address.name];

  renderEmptyState = () => (<Panel>
    <Panel.Section>
      <p>There are no valid recipients in your uploaded CSV!</p>
    </Panel.Section>
  </Panel>)

  renderCollection = () => {
    const { recipients } = this.props;

    return (<TableCollection
      columns={columns}
      rows={recipients}
      getRowData={this.getRowData}
      pagination={true}
      saveCsv={false}
    />);
  };

  render() {
    const { recipients } = this.props;

    return <>
      <h1>Preview Contacts</h1>
      {recipients.length ? this.renderCollection() : this.renderEmptyState()}
    </>;
  }
}

RecipientsCollection.defaultProps = {
  recipients: []
};

export default RecipientsCollection;
