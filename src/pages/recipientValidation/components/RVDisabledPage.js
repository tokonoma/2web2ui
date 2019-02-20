import { Component } from 'react';
import { EmptyState } from '@sparkpost/matchbox';
import { Generic } from 'src/components/images';
import { LINKS } from 'src/constants';
import React from 'react';


export class RVDisabledPage extends Component {
  render() {
    return (
      <EmptyState
        title="Recipient Validation"
        image={Generic}
        primaryAction={{ content: 'Request Access', to: LINKS.RECIPIENT_VALIDATION_ACCESS, external: true }}
      >
        <p>Protect your sender reputation by guarding against bounces, errors, and even fraud.
          SparkPost Recipient Validation is an easy, efficient way to verify that addresses are valid before you send.</p>
      </EmptyState>
    );
  }
}

export default RVDisabledPage;
