import React from 'react';
import { CenteredLogo } from 'src/components';
import { Panel, UnstyledLink, Button } from '@sparkpost/matchbox';
import { CheckCircle, Send } from '@sparkpost/matchbox-icons';
import { Link } from 'react-router-dom';
import { Card } from 'src/components';
import styles from './RVBundlePage.module.scss';

const RVBundlePage = () => {
  return (
    <div>
      <CenteredLogo />
      <h1 className={styles.header}>You're Almost There...</h1>
      <p className={styles.subheader}>
        Here at SparkPost we do it all! As part of our Recipient Validation service we also provide
        a SparkPost sending account. Make every email count and start verifying.
      </p>

      <Panel>
        <Panel.Section>
          Take a look at what's included in our Recipient Validation service and then start
          validating.
        </Panel.Section>
        <Panel.Section>
          <div className={styles.grid}>
            <Card>
              <h2>
                <CheckCircle className={styles.icon} />
                <span>Recipient Validation</span>
              </h2>
              <p>
                With our monthly pay-as-you-go plan using tiered pricing, the more you validate, the
                less you pay per message.
              </p>
              <p>
                <UnstyledLink className={styles.link}>See Pricing</UnstyledLink>
              </p>
            </Card>

            <Card>
              <h2>
                <Send className={`${styles.icon} ${styles.send}`} />
                <span>Email Messaging</span>
              </h2>
              <div>
                <p>A full featured FREE test account is standard with all SparkPost accounts:</p>
                <ul>
                  <li>500 emails/month included for testing.</li>
                  <li>Access to all our powerful API features.</li>
                  <li>Free technical support to get you up and running.</li>
                </ul>
              </div>
            </Card>
          </div>
          <div className={styles.buttonRow}>
            <Button color="orange" to="/recipient-validation" component={Link}>
              Start Validating
            </Button>
          </div>
        </Panel.Section>
      </Panel>
    </div>
  );
};

export default RVBundlePage;
