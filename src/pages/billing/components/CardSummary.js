import React from 'react';
import { CreditCard } from '@sparkpost/matchbox-icons';
import { LabelledValue } from 'src/components';

const CardSummary = ({ billing, label }) => {
  if (!billing.credit_card) { return <p>No credit card present.</p>; }

  return (
    <LabelledValue label={label}>
      <h6>
        <strong><CreditCard size={16}/> {billing.credit_card.type} ···· {billing.credit_card.number.substr(billing.credit_card.number.length - 4)}</strong>
      </h6>
      <p>Expires {billing.credit_card.expiration_month}/{billing.credit_card.expiration_year}</p>
    </LabelledValue>);
};

export default CardSummary;
