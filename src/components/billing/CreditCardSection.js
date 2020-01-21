import React, { useState, useEffect } from 'react';
import { Panel } from '@sparkpost/matchbox';
import { CreditCard } from '@sparkpost/matchbox-icons';
import { LabelledValue } from 'src/components';
import { PaymentForm } from './PaymentForm';
import { BillingAddressForm } from './BillingAddressForm';
import { connect } from 'react-redux';
import { getBillingCountries } from 'src/actions/billing';

function CreditCardSection({
  onClick,
  credit_card,
  formname: FORMNAME,
  submitting = false,
  countries = [],
  getBillingCountries,
}) {
  useEffect(() => {
    getBillingCountries();
  }, [getBillingCountries]);
  const handleUseAnotherCC = () => {
    setUseAnotherCC(!useAnotherCC);
    onClick();
  };
  const savedPaymentAction = credit_card
    ? [{ content: 'Use Saved Payment Method', onClick: handleUseAnotherCC, color: 'orange' }]
    : null;

  const [useAnotherCC, setUseAnotherCC] = useState(false);

  if (!credit_card || useAnotherCC)
    return (
      <Panel title="Add a Credit Card" actions={savedPaymentAction}>
        <Panel.Section>
          <PaymentForm formName={FORMNAME} disabled={submitting} />
        </Panel.Section>
        <Panel.Section>
          <BillingAddressForm formName={FORMNAME} disabled={submitting} countries={countries} />
        </Panel.Section>
      </Panel>
    );
  return (
    <Panel
      title="Pay With Saved Payment Method"
      actions={[
        { content: 'Use Another Credit Card', onClick: handleUseAnotherCC, color: 'orange' },
      ]}
    >
      <Panel.Section>
        <CardSummary credit_card={credit_card} />
      </Panel.Section>
    </Panel>
  );
}

const mapStateToProps = state => {
  return {
    countries: state.billing.countries,
  };
};

export default connect(mapStateToProps, { getBillingCountries })(CreditCardSection);

const CardSummary = ({ credit_card, label }) => {
  if (!credit_card) {
    return <p>No credit card information present.</p>;
  }

  return (
    <LabelledValue label={label}>
      <h6>
        <strong>
          <CreditCard size={16} /> {credit_card.type} ····{' '}
          {credit_card.number.substr(credit_card.number.length - 4)}
        </strong>
      </h6>
      <p>
        Expires {credit_card.expiration_month}/{credit_card.expiration_year}
      </p>
    </LabelledValue>
  );
};
