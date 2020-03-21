import React from 'react';
import { Panel, TextField } from 'src/components/matchbox';

const ResponseBlock = ({ testSent, testResponse }) => {
  const success = testResponse && testResponse.status <= 299;

  if (!testSent || !success) {
    return null;
  }

  return (
    <Panel.Section>
      <p>The server responded like this:</p>
      <code>
        <TextField
          id="webhook-test-response"
          multiline
          readOnly
          value={JSON.stringify(testResponse, null, '  ')}
          rows={12}
          resize="vertical"
        />
      </code>
    </Panel.Section>
  );
};

export default ResponseBlock;
