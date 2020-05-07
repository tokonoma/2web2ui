import React from 'react';
import { Snackbar } from 'src/components/matchbox';
import { ExternalLink } from 'src/components/links';
import styles from '../CookieConsent.module.scss';

export const ConsentBar = ({ onDismiss }) => (
  <div className={styles.CookieConsent}>
    <div className={styles.ConsentBar}>
      <Snackbar maxWidth={1200} onDismiss={onDismiss} status="default">
        <span>
          We use cookies to optimize your experience, analyze traffic, and personalize content. To
          learn more, please visit our
        </span>{' '}
        <ExternalLink to="https://www.sparkpost.com/policies/privacy/">Cookie Policy</ExternalLink>
        <span>. By using our site without disabling cookies, you consent to our use of them.</span>
      </Snackbar>
    </div>
  </div>
);
