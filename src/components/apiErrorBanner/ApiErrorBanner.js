import React, { useState } from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { Banner, Button } from 'src/components/matchbox';
import { ButtonWrapper } from 'src/components';

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
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

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
  let buttonStyleProps = {
    outline: true,
  };

  if (isHibanaEnabled) {
    buttonStyleProps = {
      color: 'gray',
      outlineBorder: true,
    };
  }

  return (
    <Banner status={status} title={title} my="300">
      <p>{message || craftMessage(meta.method, resource)}</p>

      {(reload || showDetailsButton) && (
        <ButtonWrapper>
          {reload && (
            <Button {...buttonStyleProps} onClick={() => reload()}>
              Try Again
            </Button>
          )}

          {showDetailsButton && (
            <Button {...buttonStyleProps} onClick={() => setShowErrorDetails(!showErrorDetails)}>
              {showErrorDetails ? 'Hide Error Details' : 'Show Error Details'}
            </Button>
          )}
        </ButtonWrapper>
      )}

      {showErrorDetails && (
        <p style={{ marginTop: '20px' }}>
          <strong>Details:</strong> {errorDetails || payload.message}
        </p>
      )}
    </Banner>
  );
}
