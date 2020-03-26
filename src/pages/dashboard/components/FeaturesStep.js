import React from 'react';
import { Grid } from '@sparkpost/matchbox';
import { Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';
import { Button, Panel } from 'src/components/matchbox';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { useGuideContext } from './GettingStartedGuide';
import styles from './FeaturesStep.module.scss';

export default function FeaturesStep() {
  return (
    <Panel.Section>
      <GuideBreadCrumbs />
      <FeaturesStepList />
    </Panel.Section>
  );
}

export const FeaturesStepList = () => {
  const { setAndStoreStepName } = useGuideContext();
  return (
    <Grid>
      <Grid.Column xs={12} key={`Start Sending`}>
        <Card>
          <CardTitle>
            <Send size="20" className={styles.SendIcon} /> &nbsp;{`Sending with SparkPost`}
          </CardTitle>
          <CardContent>
            <p className={styles.FeaturesCardContent}>
              Learn how to send emails, integrate our API into your code, and make the most of our
              powerful analytics.
            </p>
          </CardContent>
          <CardActions>
            <ButtonWrapper>
              <Button color="orange" onClick={() => setAndStoreStepName('Sending')}>
                Start Sending
              </Button>
            </ButtonWrapper>
          </CardActions>
        </Card>
      </Grid.Column>
    </Grid>
  );
};
