import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import { Button, Tooltip } from '@sparkpost/matchbox';
import { ContentCopy } from '@sparkpost/matchbox-icons';

/**
 * Reusable Copy to Clipboard button
 */
class CopyToClipboard extends Component {
  state = {
    copied: false
  };

  timeout = null;

  handleCopy = () => {
    copy(this.props.value);
    this.setState({ copied: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.setState({ copied: false }), 3000);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.object) {
      this.setState({ copied: false });
      clearTimeout(this.timeout);
    }
  }

  render() {
    const { label = 'Copy' } = this.props;
    const { copied } = this.state;

    const content = copied ? 'Copied to Clipboard' : 'Copy to Clipboard';

    return (
      <Tooltip dark content={content}>
        <Button name="copy-field-button" onClick={this.handleCopy}>
          <ContentCopy size={14}/> {label}
        </Button>
      </Tooltip>
    );
  }
}

CopyToClipboard.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string
};

export default CopyToClipboard;
