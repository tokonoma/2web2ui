import React, { Component } from 'react';
import { Modal } from '@sparkpost/matchbox';
class ComparisonModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  render() {
    return <Modal></Modal>;
  }

}
export default ComparisonModal;
