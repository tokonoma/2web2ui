import React, { Component } from 'react';
import { TableCollection } from 'src/components';
import { Panel } from '@sparkpost/matchbox';

const columns = [
  { label: 'Address', sortKey: 'address.email' },
  { label: 'Name', sortKey: 'address.name' }
];

export class RecipientsCollection extends Component {
  getRowData = ({ address }) => [address.email, address.name];

  renderNoCsv = () => <Panel>
    <Panel.Section>
      <p>Once you upload a CSV, recipients will be previewed here.</p>
    </Panel.Section>
  </Panel>;

  renderCollection = () => {
    const { recipients } = this.props;

    if (recipients.length === 0) {
      return (<Panel>
        <Panel.Section>
          <p>There are no recipients in your uploaded CSV!</p>
        </Panel.Section>
      </Panel>);
    }

    return (<TableCollection
      columns={columns}
      rows={recipients}
      getRowData={this.getRowData}
      pagination={true}
      saveCsv={false}
    />);
  };

  render() {
    const { hasCsv } = this.props;

    return <>
      <h1>Preview Contacts</h1>
      {hasCsv ? this.renderCollection() : this.renderNoCsv()}
    </>;
  }
}

RecipientsCollection.defaultProps = {
  recipients: [],
  hasCsv: false
};

export default RecipientsCollection;
