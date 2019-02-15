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
        primaryAction={{ content: 'Request Access', to: LINKS.RECIPIENT_VALIDATION_ACCESS }}
      >
        <p>Remove email addresses that don't exist and understand your recipient quality through our new Recipient Validation API and bulk verify tool.</p>
      </EmptyState>
    );
  }
}

export default RVDisabledPage;
