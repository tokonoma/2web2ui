import React, { useState } from 'react';
import { TextField, Button } from '@sparkpost/matchbox';
import { LoadingSVG } from 'src/components';
import _ from 'lodash';

const PromoCodeNew = ({ promoCodeObj, handlePromoCode }) => {
  const { applyPromoCode, clearPromoCode } = handlePromoCode;
  const { promoError, promoPending, selectedPromo } = promoCodeObj;
  const [promoCode, setPromoCode] = useState(selectedPromo.promoCode || '');
  const handleChange = (event) => {
    setPromoCode(event.target.value);
  };
  const handleClick = () => {
    applyPromoCode(promoCode);
  };
  const renderActionButton = (condition) => {
    if (condition) {
      return <Button onClick={clearPromoCode}>Remove</Button>;
    }
    return <Button onClick={handleClick} disabled={promoPending}>Apply</Button>;
  };
  const renderLoading = (condition) => condition ? <LoadingSVG size="XSmall"/> : null;
  const isDisabled = () => promoPending || _.has(selectedPromo, 'promoCode');
  const displayErrorMessage = () => promoError ? promoError.message : '';
  return <TextField
    name="promo"
    label="Promo Code"
    disabled={isDisabled()}
    connectRight={renderActionButton(selectedPromo.promoCode)}
    onChange={handleChange}
    suffix={renderLoading(promoPending)}
    error={displayErrorMessage()}
    defaultValue={selectedPromo.promoCode || ''}
  />;
};

export default PromoCodeNew;
