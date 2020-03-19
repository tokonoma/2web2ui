import React from 'react';
import { TextField } from 'src/components/matchbox';

const RequestBlock = ({ testRequest, targetURL }) => (
  <div>
    <p>The test sends the following request to this webhook's target URL ({targetURL})</p>
    <code>
      <TextField
        id="webhook-test-request"
        multiline
        readOnly
        resize="vertical"
        rows={6}
        value={testRequest}
      />
    </code>
  </div>
);

export default RequestBlock;
