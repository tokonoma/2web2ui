import React from 'react';
import { Button } from 'src/components/matchbox';
import FocusContainer from 'src/components/focusContainer';
import { ExternalLink } from 'src/components/links';

import OGStyles from './ListError.module.scss';
import hibanaStyles from './ListErrorHibana.module.scss';
import useHibanaOverride from 'src/hooks/useHibanaOverride';

const ListError = () => {
  const styles = useHibanaOverride(OGStyles, hibanaStyles);

  return (
    <FocusContainer>
      <h3 className={styles.Header}>Oh no! There seems to be an issue with your list...</h3>

      <p className={styles.Description}>
        We're unable to validate your list as is, but here are a few ways to resolve some common
        formatting issues:
      </p>

      <ol className={styles.List}>
        <li>
          <strong>Try putting each address on its own line.</strong>
        </li>

        <li>
          <strong>You may need to clean up your list a bit.&nbsp;</strong>

          <span>
            All we need are the actual email addresses, no other information. If your list has extra
            columns or tabs, just delete those and re-upload a clean list of nothing but email
            addresses.
          </span>
        </li>
      </ol>

      {/* eslint-disable no-restricted-syntax */}
      <p className={styles.Description}>
        Still having trouble? Check out our knowledge base to learn more about acceptable{' '}
        <ExternalLink to="https://www.sparkpost.com/docs/recipient-validation/validate-an-email-list/#file-requirements">
          formats
        </ExternalLink>
        .
      </p>
      {/* eslint-enable no-restricted-syntax */}

      <div>
        <Button variant="primary" to="/recipient-validation">
          Got It
        </Button>
      </div>
    </FocusContainer>
  );
};

export default ListError;
