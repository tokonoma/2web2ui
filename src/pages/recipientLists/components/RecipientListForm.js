import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autofill, change, Field, isPristine, isSubmitting, isValid } from 'redux-form';

import config from 'src/config';
import { Button, Grid, Panel } from '@sparkpost/matchbox';
import { DownloadLink, TextFieldWrapper } from 'src/components';
import { maxFileSize, maxLength, required, slug } from 'src/helpers/validation';
import { slugify } from 'src/helpers/string';

import FileFieldWrapper from 'src/components/reduxFormWrappers/FileFieldWrapper';
import exampleRecipientListPath from './example-recipient-list.csv';
import styles from './Form.module.scss';

export class RecipientListForm extends Component {
  // Fills in identifier field based on Name
  handleIdFill = (e) => {
    const { editMode, autofill, formName } = this.props;
    if (editMode) {
      return;
    }

    autofill(formName, 'id', slugify(e.target.value));
  };

  render() {
    const { editMode, pristine, valid, submitting } = this.props;

    const submitDisabled = pristine || !valid || submitting;

    let actionText = 'Create';
    let uploadHint = 'Upload a CSV file of recipients';
    let uploadValidators = [required, maxFileSize(config.maxUploadSizeBytes)];

    if (editMode) {
      actionText = 'Update';
      uploadHint = 'Optional: Upload a CSV file of recipients to replace the existing recipients in this list';
      uploadValidators = uploadValidators.slice(1);
    }

    return <div>
      <Panel>
        <Panel.Section>
          <Grid className={styles.Spacer}>
            <Grid.Column>
              <Field
                name='name'
                label='Name'
                placeholder='My favorite recipients'
                validate={[required, maxLength(64)]}
                onChange={this.handleIdFill}
                disabled={submitting}
                component={TextFieldWrapper}
                required
              />
            </Grid.Column>
            <Grid.Column>
              <Field
                name='id'
                label='Identifier'
                helpText={'A unique ID for your recipient list, we\'ll fill this for you but, once set, this can not be modified.'}
                placeholder='my-favorite-recipients'
                validate={[required, maxLength(64), slug]}
                disabled={submitting || editMode}
                component={TextFieldWrapper}
                required
              />
            </Grid.Column>
          </Grid>
          <Grid className={styles.Spacer}>
            <Grid.Column>
              <Field
                name='description'
                label='Description'
                placeholder='All my favorite recipients'
                validate={[maxLength(1024)]}
                disabled={submitting}
                component={TextFieldWrapper}
              />
            </Grid.Column>
          </Grid>
          <Grid className={styles.Spacer}>
            <Grid.Column>
              <Field
                component={FileFieldWrapper}
                disabled={submitting}
                fileType="csv"
                helpText={
                  <span>
                  You can download
                  a <DownloadLink href={exampleRecipientListPath}>CSV template here</DownloadLink> to
                  use when formatting your recipient list for upload.
                  </span>
                }
                label={uploadHint}
                name="csv"
                validate={uploadValidators}
                required
              />
            </Grid.Column>
          </Grid>
        </Panel.Section>
        <Panel.Section>
          <Button primary submit disabled={submitDisabled}>{actionText} Recipient List</Button>
        </Panel.Section>
      </Panel>
    </div>;
  }
}

const mapStateToProps = (state, props) => {
  const { formName } = props;
  return {
    pristine: isPristine(formName)(state),
    valid: isValid(formName)(state),
    submitting: isSubmitting(formName)(state)
  };
};

const connectedForm = connect(mapStateToProps, { change, autofill })(RecipientListForm);
connectedForm.displayName = 'RecipientsListForm';
export default connectedForm;
