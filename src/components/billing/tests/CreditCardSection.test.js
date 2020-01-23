import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import CreditCardSection from '../CreditCardSection';

describe('CreditCardSection', () => {
  const defaultProps = {
    handleCardToggle: jest.fn(),
    credit_card: {
      type: 'Visa',
      number: '12345678',
      expiration_month: '04',
      expiration_year: 2022,
    },
  };

  const subject = (method = shallow, props) =>
    method(<CreditCardSection {...defaultProps} {...props} />);

  it('should render credit card Summary when credit_card is present', () => {
    const instance = subject(render);
    expect(instance.queryByText('Pay With Saved Payment Method')).toBeInTheDocument();
    expect(instance.queryByText('Expires 04/2022')).toBeInTheDocument();
  });
  it('should render credit card form when credit_card is not present', () => {
    const instance = subject(shallow, { credit_card: null });
    expect(instance.find('PaymentForm')).toHaveLength(1);
    expect(instance.find('Connect(BillingAddressForm)')).toHaveLength(1);
  });
});
