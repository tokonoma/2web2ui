import React from 'react';
import generator from 'amp-email-generator';

import Editor from '../../pages/templates/components/Editor';
const code = generator.getAccordion();

const AccordionForm = () => {
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

export default AccordionForm;
