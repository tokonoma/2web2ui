import React from 'react';

import { PageLink } from 'src/components/links';
import ContentText from './ContentText';

const VariantsContent = () => (
  <div>
    <ContentText fontSize="200" color="gray.600">
      The templates you've selected will appear here, along with their results once this test
      concludes. Results will be updated approximately every 15 minutes.
    </ContentText>
    <ContentText fontSize="200" color="gray.600">
      If you need to create a new template,{' '}
      <PageLink to="/templates">head over to the templates page</PageLink>.
    </ContentText>
  </div>
);

export default VariantsContent;
