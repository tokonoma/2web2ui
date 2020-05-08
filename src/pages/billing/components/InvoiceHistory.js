import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'src/components/matchbox';
import { FileDownload } from '@sparkpost/matchbox-icons';
import { Heading, SubduedText } from 'src/components/text';
import { formatDate } from 'src/helpers/date';
import { get as getInvoice } from 'src/actions/invoices';
import { showAlert } from 'src/actions/globalAlert';
import _ from 'lodash';
import { formatCurrency } from 'src/helpers/units';
import { download } from 'src/helpers/downloading';
import { PanelSectionTableCollection } from 'src/components/collection';

const columns = ['Date', 'Amount', 'Invoice Number', { label: null, width: 150 }];

export class InvoiceHistory extends Component {
  getRowData = ({ invoice_date: invoiceDate, amount, invoice_number: invoiceNumber, id }) => {
    const { invoiceLoading, invoiceId } = this.props;
    const thisInvoiceLoading = invoiceId === id;
    return [
      formatDate(invoiceDate),
      formatCurrency(amount),
      invoiceNumber,
      <div style={{ textAlign: 'right' }}>
        <Button
          plain
          size="small"
          color="orange"
          disabled={invoiceLoading}
          onClick={() => this.props.getInvoice(id)}
        >
          {invoiceLoading && thisInvoiceLoading ? (
            'Downloading...'
          ) : (
            <>
              Download <FileDownload />
            </>
          )}
        </Button>
      </div>,
    ];
  };

  componentDidUpdate(prevProps) {
    const { invoice } = this.props;

    if (!prevProps.invoice && invoice) {
      this.downloadInvoice();
    }
  }

  downloadInvoice = () => {
    const { invoice, showAlert, invoices, invoiceId } = this.props;
    const invoiceNumber = _.find(invoices, { id: invoiceId }).invoice_number;

    download({ name: `sparkpost-invoice-${invoiceNumber}.pdf`, url: invoice });

    showAlert({ type: 'success', message: `Downloaded invoice: ${invoiceNumber}` });
  };

  render() {
    const { invoices } = this.props;

    const maxWarning =
      invoices.length >= 20 ? (
        <Panel.Footer
          left={
            <SubduedText>
              <small>Only your last 20 invoices are available to be viewed</small>
            </SubduedText>
          }
        />
      ) : null;

    return (
      <>
        <Panel>
          <Panel.Section>
            <Heading as="h2" looksLike="h4">
              Invoice History
            </Heading>
          </Panel.Section>
          <PanelSectionTableCollection
            rows={invoices}
            columns={columns}
            getRowData={this.getRowData}
          />
        </Panel>
        {maxWarning}
      </>
    );
  }
}

const mapStateToProps = state => ({
  invoice: state.invoices.invoice,
  invoiceLoading: state.invoices.invoiceLoading,
  invoiceId: state.invoices.invoiceId,
});

export default connect(mapStateToProps, { getInvoice, showAlert })(InvoiceHistory);
