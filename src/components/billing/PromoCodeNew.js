import React, { useState } from 'react';
import { TextField, Button } from '@sparkpost/matchbox';
import { LoadingSVG } from 'src/components';

const PromoCodeNew = ({ promoCodeObj }) => {
  const { applyPromoCode, clearPromoCode, promoError, promoPending, selectedPromo } = promoCodeObj;
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

  return <TextField
    name="promo"
    label="Promo Code"
    disabled={promoPending || selectedPromo.promoCode}
    connectRight={renderConnectRight(selectedPromo.promoCode)}
    onChange={handleChange}
    suffix={renderSuffix(promoPending)}
    errorInLabel={true}
    error={promoError ? promoError.message : ''}
    defaultValue={selectedPromo.promoCode || ''}
  />;
};

export default PromoCodeNew;
