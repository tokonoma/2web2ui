import React from 'react';
import { Warning } from '@sparkpost/matchbox-icons';
import { Box } from 'src/components/matchbox';
import styles from './PreviewErrorFrame.module.scss';

const PreviewErrorFrame = ({ errors }) => {
  // instability of the data leads to some funky logic - checking that the errors array exists, and defaulting to an empty object if either the first index or the array doesn't exist
  const error = errors ? errors[0] || {} : {};
  const { message, description, line, part, code } = error;

  return (
    <div className={styles.PreviewErrorFrame}>
      <Warning size={72} />

      <Box mb="300">
        <h2>Oh no! An Error Occurred</h2>
      </Box>

      {/* See https://www.sparkpost.com/docs/tech-resources/extended-error-codes/ */}
      {code === '3000'
        ? ['message', 'line', 'part'].every(key => key in error) && (
            <Box mb="300">
              <p>
                We are unable to load your template preview due to a {message} on line {line} of
                your {part}.
              </p>
            </Box>
          )
        : error.hasOwnProperty('description') && (
            <Box mb="300">
              <p>{description}</p>
            </Box>
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
