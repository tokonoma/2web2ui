import React from 'react';
import { Button } from '@sparkpost/matchbox';
import FocusContainer from 'src/components/focusContainer';
import ExternalLink from 'src/components/externalLink';
import styles from './ListError.module.scss';

const ListError = () => (
  <FocusContainer>
    <h3>Oh no! There seems to be an issue with your list...</h3>

    <p>We're unable to validate your list as is, but here are a few ways to resolve some common formatting issues:</p>

    <ol>
      <li>
        <strong>Try putting each address on its own line.</strong>
      </li>

      <li>
        <strong>You may need to clean up your list a bit.</strong>

        <span>All we need are the actual email addresses, no other information. If your list has extra columns or tabs, just delete those and re-upload a clean list of nothing but email addresses.</span>
      </li>
    </ol>

    {/* eslint-disable no-restricted-syntax */}
    <p>Still having trouble? Check out our knowledge base to learn more about acceptable <ExternalLink to="https://www.sparkpost.com/docs/recipient-validation/validate-an-email-list/#file-requirements">formats</ExternalLink>.</p>
    {/* eslint-enable no-restricted-syntax */}

    <div className={styles.ListErrorButtonWrapper}>
      <Button
        color='orange'
        to='/recipient-validation'
        className={styles.ListErrorButtonPrimary}
      >
        Got It
      </Button>
    </div>
  </FocusContainer>
);

export default ListError;
