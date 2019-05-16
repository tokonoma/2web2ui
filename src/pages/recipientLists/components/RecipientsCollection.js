import React, { Component } from 'react';
import { TableCollection } from 'src/components';
import { Panel } from '@sparkpost/matchbox';

const columns = [
  { label: 'Address', sortKey: 'email' },
  { label: 'Name', sortKey: 'name' }
];

export class RecipientsCollection extends Component {
  getRowData = ({ address }) => [address.email, address.name]

  renderEmpty = () => <Panel.Section>
    <p>Once you upload a CSV, recipients will be previewed here.</p>
  </Panel.Section>

  renderCollection = () => {
    const { recipients } = this.props;

    return (<TableCollection
      columns={columns}
      rows={recipients}
      getRowData={this.getRowData}
      pagination={true}
    />);
  }
  render() {
    const { hasCsv, recipients } = this.props;

    return (<Panel title='Preview Contacts'>
      {!hasCsv && this.renderEmpty()}
      {recipients.length > 0 && this.renderCollection()}
    </Panel>);
  }
}

RecipientsCollection.defaultProps = {
  recipients: [],
  hasCsv: false
};

export default RecipientsCollection;
