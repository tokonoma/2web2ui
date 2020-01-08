import React from 'react';
import { Warning } from '@sparkpost/matchbox-icons';
import styles from './PreviewErrorFrame.module.scss';

/* eslint-disable no-restricted-syntax */
const PreviewErrorFrame = ({ errors }) => {
  // instability of the data leads to some funky logic - checking that the errors array exists, and defaulting to an empty object if either the first index or the array doesn't exist
  const error = errors ? errors[0] || {} : {};
  const { message, description, line, part, code } = error;

  return (
    <div className={styles.PreviewErrorFrame}>
      <Warning size={72} />

      <h2>Oh no! An Error Occurred</h2>

      {/* See https://www.sparkpost.com/docs/tech-resources/extended-error-codes/ */}
      {code === '3000' ? (
        <>
          {/* Defensively checking the error object's structure */}
          {['message', 'line', 'part'].every(key => key in error) && (
            <p>
              We are unable to load your template preview due to a {message} on line {line} of your{' '}
              {part}.
            </p>
          )}
        </>
      ) : (
        <>{error.hasOwnProperty('description') && <p>{description}</p>}</>
      )}

      <p>
        If you notice this happens often, check your substitution data or code syntax as these are
        frequent causes of preview errors.
      </p>
    </div>
  );
};
/* eslint-enable no-restricted-syntax */

export default PreviewErrorFrame;
