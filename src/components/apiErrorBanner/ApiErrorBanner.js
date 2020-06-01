import React, { useState } from 'react';
import { Banner, Button } from 'src/components/matchbox';

const methodToText = {
  GET: 'loading',
  PUT: 'updating',
  DELETE: 'deleting',
  POST: 'creating',
};

const craftMessage = (method, resource) => {
  if (!method || !resource) {
    return 'Sorry, there was an issue.';
  }

  const message = `Sorry, there was an issue ${methodToText[method]} your ${resource}.`;
  return message;
};

export default function ApiErrorBanner(props) {
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  const {
    message,
    errorDetails,
    reload = false,
    title = 'An error occurred',
    status = 'warning',
    error = { payload: {}, meta: {} },
  } = props;

  const { payload, meta, resource } = error;
  const showDetailsButton = errorDetails || payload.message;

  return (
    <Banner status={status} title={title} my="300">
      <p>{message || craftMessage(meta.method, resource)}</p>

      {(reload || showDetailsButton) && (
        <Banner.Actions>
          {reload && <Button onClick={() => reload()}>Try Again</Button>}

          {showDetailsButton && (
            <Button onClick={() => setShowErrorDetails(!showErrorDetails)}>
              {showErrorDetails ? 'Hide Error Details' : 'Show Error Details'}
            </Button>
          )}
        </Banner.Actions>
      )}

      {showErrorDetails && (
        <p style={{ marginTop: '20px' }}>
          <strong>Details:</strong> {errorDetails || payload.message}
        </p>
      )}
    </Banner>
  );
}
