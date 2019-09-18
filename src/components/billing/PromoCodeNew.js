import React, { useState } from 'react';
import { TextField, Button } from '@sparkpost/matchbox';
import { LoadingSVG } from 'src/components';

const PromoCodeNew = ({ promoCodeObj, handlePromoCode }) => {
  const { applyPromoCode, clearPromoCode } = handlePromoCode;
  const { promoError, promoPending, selectedPromo } = promoCodeObj;
  const [promocode, setPromocode] = useState(selectedPromo.promoCode || '');
  const handleChange = (event) => {
    setPromocode(event.target.value);
  };
  const handleClick = () => {
    applyPromoCode(promocode);
  };
  const renderConnectRight = (condition) => {
    if (condition) {
      return <Button onClick={clearPromoCode} >Remove</Button>;
    }
    return <Button onClick={handleClick} >Apply</Button>;
  };
  const renderSuffix = (condition) => {
    if (condition) {
      return <LoadingSVG size="XSmall" />;
    }
    return <></>;
  };
  const isDisabled = () => promoPending || typeof selectedPromo.promoCode === 'string';
  const displayErrorMessage = () => promoError ? promoError.message : '';
  return <TextField
    name="promo"
    label="Promo Code"
    disabled={isDisabled()}
    connectRight={renderConnectRight(selectedPromo.promoCode)}
    onChange={handleChange}
    suffix={renderSuffix(promoPending)}
    errorInLabel={true}
    error={displayErrorMessage()}
    defaultValue={selectedPromo.promoCode || ''}
  />;
};

export default PromoCodeNew;
