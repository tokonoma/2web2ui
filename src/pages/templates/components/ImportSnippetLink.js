import React from 'react';
import { Button, Modal } from '@sparkpost/matchbox';
import ImportSnippetPanel from './ImportSnippetPanel.container';

export default class ImportSnippetLink extends React.Component {
  state = {
    isOpen: false
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <React.Fragment>
        <Button
          color="orange"
          flat={true}
          name="import-snippets-button"
          onClick={this.handleOpen}
        >
          Import Snippets
        </Button>
        <Modal open={this.state.isOpen} onClose={this.handleClose}>
          <ImportSnippetPanel onClose={this.handleClose} />
        </Modal>
      </React.Fragment>
    );
  }
}
