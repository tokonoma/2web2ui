import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, SubmissionError, reduxForm } from 'redux-form';

import _ from 'lodash';

import { Panel, Banner, Button, Error } from '@sparkpost/matchbox';
import { DownloadLink, TextFieldWrapper } from 'src/components';
import { required, maxLength } from 'src/helpers/validation';
import { formatBytes } from 'src/helpers/units';

import FileFieldWrapper from 'src/components/reduxFormWrappers/FileFieldWrapper';

import parseRecipientListCsv from '../helpers/csv';

import config from 'src/config';

import exampleRecipientListPath from './example-recipient-list.csv';

const formName = 'recipientListForm';

export class RecipientListForm extends Component {
  parseCsv = csv =>
    parseRecipientListCsv(csv).catch(csvErrors => {
      throw new SubmissionError({ _error: csvErrors });
    });

  // `csv` is an internal field. The outer conponent can access the parsed records in `recipients`.
  formatValues = values => _.omit(values, ['csv']);

  submitWithRecipients = (values, recipients) =>
    this.props.onSubmit({
      recipients,
      ...this.formatValues(values),
    });

  submitWithoutRecipients = values => this.props.onSubmit(this.formatValues(values));

  // Parse CSV, store JSON result, collect and show parsing errors
  preSubmit = values => {
    if (values.csv) {
      // CSV upload is optional in edit mode
      return this.parseCsv(values.csv).then(recipients =>
        this.submitWithRecipients(values, recipients),
      );
    } else {
      return this.submitWithoutRecipients(this.formatValues(values));
    }
  };

  renderCsvErrors() {
    const { error } = this.props;
    return (
      <Banner status="danger" title="CSV Format Errors">
        {error.map((err, idx) => (
          <Error key={idx} error={err} />
        ))}
      </Banner>
    );
  }

  render() {
    const {
      editMode,
      pristine,
      valid,
      error,
      submitting,
      handleSubmit,
      asyncValidate,
    } = this.props;
    const submitDisabled = pristine || !valid || submitting;

    let actionText = 'Create';
    let uploadHint = 'Upload a CSV file of recipients';
    let uploadValidators = [required];

    if (editMode) {
      actionText = 'Update';
      uploadHint =
        'Optional: Upload a CSV file of recipients to replace the existing recipients in this list';
      uploadValidators = [];
    }

    return (
      <div>
        {error && this.renderCsvErrors()}
        <form onSubmit={handleSubmit(this.preSubmit)}>
          <Panel>
            <Panel.Section>
              <Field
                name="name"
                label="Name"
                placeholder="My favorite recipients"
                validate={[required, maxLength(64)]}
                disabled={submitting}
                component={TextFieldWrapper}
              />
              {!editMode && (
                <Field
                  name="id"
                  label="ID"
                  placeholder="my-favorite-recipients"
                  validate={[required, maxLength(64)]}
                  disabled={submitting}
                  component={TextFieldWrapper}
                />
              )}
              <Field
                name="description"
                label="Description"
                placeholder="All my favorite recipients"
                validate={[maxLength(1024)]}
                disabled={submitting}
                component={TextFieldWrapper}
              />
              <Field
                component={FileFieldWrapper}
                disabled={submitting}
                fileType="csv"
                helpText={
                  <span>
                    You can download a{' '}
                    <DownloadLink href={exampleRecipientListPath}>CSV template here</DownloadLink>{' '}
                    to use when formatting your recipient list for upload.
                  </span>
                }
                label={uploadHint}
                name="csv"
                validate={uploadValidators}
                onBlur={() => asyncValidate()}
              />
            </Panel.Section>
            <Panel.Section>
              <Button primary submit disabled={submitDisabled}>
                {actionText} Recipient List
              </Button>
            </Panel.Section>
          </Panel>
        </form>
      </div>
    );
  }
}

const asyncValidate = async ({ csv, ...values }) => {
  if (!csv) return;

  const recipients = await parseRecipientListCsv(csv);
  const JSONpayload = JSON.stringify({ ...values, recipients });
  const m = encodeURIComponent(JSONpayload).match(/%[89ABab]/g); // See: https://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript/5515960#5515960
  const payloadSizeInBytes = JSONpayload.length + (m ? m.length : 0);

  if (payloadSizeInBytes > config.maxRecipListUploadSizeBytes) {
    /* eslint-disable no-throw-literal */
    throw {
      csv: `Upload size ${formatBytes(payloadSizeInBytes)} exceeds the max limit of ${formatBytes(
        config.maxRecipListUploadSizeBytes,
      )}. Please upload a smaller file.`,
    };
    /* eslint-enable no-throw-literal */
  }
};

const WrappedForm = reduxForm({
  form: formName,
  asyncValidate,
  asyncBlurFields: ['username', 'password', 'csv'],
})(RecipientListForm);

const mapStateToProps = (state, props) => ({
  initialValues: props.editMode ? state.recipientLists.current : {},
});

export default connect(mapStateToProps)(WrappedForm);
