import React from 'react';
import generator from 'amp-email-generator';

import Editor from '../../pages/templates/components/Editor';
const code = generator.getImage();

const ImageForm = () => {
  return (
    <Editor
      mode="html"
      name="amp-content"
      onChange={() => {}}
      value={code.html}
      readOnly={true}
      type={true}
    />
  );
};

export default ImageForm;
