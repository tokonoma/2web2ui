function formatDataForCors (values) {
  const {
    firstName,
    lastName,
    cardType,
    cardNumber,
    expirationMonth,
    expirationYear,
    cardHolderName,
    securityCode,
    email,
    address1,
    address2,
    city,
    state,
    country,
    zipCode,
    selectedPlan
  } = values;

  // For CORS Endpoint + sift
  const corsData = {
    email,
    cardholder_name: cardHolderName,
    address1,
    address2,
    city,
    state,
    country,
    zip_code: zipCode,
    bin: cardNumber.slice(0, 6),
    last_four: cardNumber.slice(-4),
    plan_id: selectedPlan.billingId
  };

  // For Zuora
  const billingData = {
    billingId: selectedPlan.billingId,
    billToContact: {
      firstName,
      lastName,
      workEmail: email,
      country,
      state
    },
    creditCard: {
      cardType,
      cardNumber,
      expirationMonth,
      expirationYear,
      securityCode,
      cardHolderInfo: {
        cardHolderName: cardHolderName,
        addressLine1: address1,
        addressLine2: address2,
        city,
        zipCode
      }
    }
  };

  return { corsData, billingData };
}

export { formatDataForCors };
