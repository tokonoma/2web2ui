import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Panel } from '@sparkpost/matchbox';
import { maxFileSize, fileExtension } from 'src/helpers/validation';
import FileUploadWrapper from './FileUploadWrapper';
import { uploadList, resetUploadError, uploadListNew } from 'src/actions/recipientValidation';
import { showAlert } from 'src/actions/globalAlert';
import config from 'src/config';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { withRouter } from 'react-router-dom';

const formName = 'recipientValidationListForm';

export class ListForm extends Component {

  handleUpload = (fields) => {
    const { uploadList, showAlert, reset } = this.props;
    const form_data = new FormData();

    form_data.append('myupload', fields.csv);

    // Always reset file on submit
    reset(formName);

    return uploadList(form_data).then(() => {
      showAlert({ type: 'success', message: 'Recipients Uploaded' });
    });
  }

  handleNewUpload = (fields) => {
    const { reset, showAlert, history, uploadListNew } = this.props;
    const form_data = new FormData();

    form_data.append('myupload', fields.csv);
    reset(formName);
    uploadListNew(form_data).then(({ list_id }) => {
      showAlert({ type: 'success', message: 'New upload' });
      history.push(`/recipient-validation/list/${list_id}`);
    });
  }

  componentDidUpdate(prevProps) {
    const { file, handleSubmit, listError, resetUploadError, newListUpload } = this.props;

    // Redux form validation does not run in the same render cycle after Field's onChange,
    // thus checking props.valid would not work here *shakes fist*
    const valid = !maxFileSize(config.maxRecipVerifUploadSizeBytes)(file) && !fileExtension('csv', 'txt')(file);

    if (file && valid && !listError) {
      if (newListUpload) {
        handleSubmit(this.handleNewUpload)();
      } else {
        handleSubmit(this.handleUpload)();
      }
    }

    // Resets API error post-submit for the subsequent submit after an error
    if (listError) {
      resetUploadError();
    }
  }

  render() {
    const uploadValidators = [maxFileSize(config.maxRecipVerifUploadSizeBytes), fileExtension('csv', 'txt')];

    return (
      <Panel.Section>
        <form>
          <Field
            component={FileUploadWrapper}
            name='csv'
            validate={uploadValidators}
            uploading={this.props.uploading}
            uploadV2={this.props.newListUpload}
          />
        </form>
      </Panel.Section>
    );
  }
}

const WrappedForm = reduxForm({ form: formName })(ListForm);

const mapStateToProps = (state) => {
  const selector = formValueSelector(formName);
  return {
    file: selector(state, 'csv'),
    listError: state.recipientValidation.listError,
    uploading: state.recipientValidation.uploadLoading,
    newListUpload: isAccountUiOptionSet('recipientValidationV2')(state)
  };
};

export default withRouter(connect(mapStateToProps, { uploadList, showAlert, resetUploadError, uploadListNew })(WrappedForm));
