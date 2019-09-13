import React, { useState } from 'react';
import { TextField, Button } from '@sparkpost/matchbox';

const PromoCodeNew = ({ verifyPromoCode }) => {
  const [promocode, setPromocode] = useState('');
  const handleChange = (event) => {
    setPromocode(event.target.value);
  };
  const handleClick = () => verifyPromoCode(promocode);
  return <TextField
    name="promo"
    label="Promo Code"
    connectRight={<Button onClick={handleClick} >Apply</Button>}
    onChange={handleChange}
  />;
};

export default PromoCodeNew;
