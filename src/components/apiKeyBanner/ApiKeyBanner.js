import React, { Component } from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import { Banner, Button } from 'src/components/matchbox';
import { hideNewApiKey } from 'src/actions/api-keys';

export class ApiKeySuccessBanner extends Component {
  state = { copied: false };

  onClickBanner = () => {
    copy(this.props.newKey);
    this.setState({ copied: true });
  };

  render() {
    const { title, status = 'success', hideNewApiKey, newKey } = this.props;

    return (
      <Banner title={title} status={status} onDismiss={hideNewApiKey} my="300">
        <p>Make sure to copy your API key now. You won't be able to see it again!</p>
        <strong>{newKey}</strong>

        <Banner.Actions>
          <Button onClick={this.onClickBanner}>
            {this.state.copied ? 'Copied to clipboard' : 'Copy'}
          </Button>
        </Banner.Actions>
      </Banner>
    );
  }
}

const mapStateToProps = state => ({
  newKey: state.apiKeys.newKey,
});

export default connect(mapStateToProps, { hideNewApiKey })(ApiKeySuccessBanner);
