import React, { useState } from 'react';
import { Button } from '@sparkpost/matchbox';

const ImageForm = () => {
  const [code] = useState(null);
  const copycode = () => {};
  return (
    <>
      <p>
        <strong>Image</strong>
        &nbsp;&nbsp;
        {code && <Button onClick={copycode}>Copy Code</Button>}
      </p>
      <form></form>
    </>
  );
};

export default ImageForm;
