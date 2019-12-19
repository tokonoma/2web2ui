import React from 'react';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import { Send } from '@sparkpost/matchbox-icons';
import styles from './GettingStartedGuide.module.scss';
import ButtonWrapper from 'src/components/buttonWrapper';
import { Button, Grid } from '@sparkpost/matchbox';

const FeaturesStepList = ({ setAndStoreStepName }) => (
  <Grid>
    <Grid.Column xs={12} key={`Start Sending`}>
      <Card>
        <CardTitle>
          <Send size="20" className={styles.SendIcon} /> &nbsp;{`Sending with Sparkpost`}
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

export default FeaturesStepList;
