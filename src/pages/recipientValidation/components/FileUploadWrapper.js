import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { DownloadLink } from 'src/components';
import { Error } from '@sparkpost/matchbox';
import { FileType } from '@sparkpost/matchbox-icons';
import exampleRecipientValidationListPath from './example-recipient-validation-list.csv';
import styles from './FileUploadWrapper.module.scss';

export default class FileUploadWrapper extends Component {
  handleCancel = () => {
    this.props.input.onBlur(); // run validation
  }

  // Always set value to dropped file even if rejected for validate functions to set error
  handleDrop = (acceptedFiles, rejectedFiles) => {
    const files = [...acceptedFiles, ...rejectedFiles];
    this.props.input.onChange(files[0]);
    this.props.input.onBlur(); // run validation
  }

  handleOpen = () => {
    this.dropzoneRef.open();
  }

  setDropzoneRef = (ref) => {
    this.dropzoneRef = ref;
  }

  render() {
    const { input, meta } = this.props;

    return (
      <fieldset className={styles.Field}>
        <h3 className={styles.Header}>Drag and drop your list here</h3>
        <h6 className={styles.SubHeader}>or <a onClick={this.handleOpen}>select a file</a> to upload</h6>
        <div className={styles.InputWrapper}>
          <Dropzone
            accept={['.txt','.csv']}
            activeClassName={styles.Active}
            className={styles.Dropzone}
            id={input.id}
            multiple={false}
            name={input.name}
            onDrop={this.handleDrop}
            onFileDialogCancel={this.handleCancel}
            ref={this.setDropzoneRef}
          >
            <div className={styles.FileTypeWrapper}>
              <div><FileType text='CSV' size={80}/></div>
              <div><FileType text='TXT' size={80}/></div>
            </div>
          </Dropzone>
        </div>
        {(meta.touched && meta.error) ? <p><Error error={meta.error} wrapper='span'/></p> : null}
        <p className={styles.Help}>
          Format your list with single addresses on individual lines, or <strong><DownloadLink href={exampleRecipientValidationListPath}>download</DownloadLink></strong> our csv template. Please note, only the most recent list is only <strong>kept for 10 days</strong>, so be sure to download your validated list right away!
        </p>
      </fieldset>
    );
  }
}
