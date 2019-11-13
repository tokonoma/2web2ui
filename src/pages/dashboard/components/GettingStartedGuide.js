import React, { useState } from 'react';
import { Panel, Button, Grid } from '@sparkpost/matchbox';
import { ArrowDownward, Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';
import styles from './GettingStartedGuide.module.scss';

export const GettingStartedGuide = ({ isGuideAtBottom, moveGuideAtBottom }) => {
  const actions = isGuideAtBottom ? null : [{
    content: <span> Move to Bottom <ArrowDownward size='20'/> </span>,
    color: 'blue',
    onClick: moveGuideAtBottom
  }];
  //stepName could be Features,Sending,Show Me Sparkpost, Let's Code
  const [stepName, setStepName] = useState('Features');
  const renderStep = () => {
    switch (stepName) {
      case 'Features':
        return <Grid>
          <Grid.Column xs={12}>
            <Card>
              <CardTitle><Send size='20' className={styles.SendIcon}/>   &nbsp;Sending with Sparkpost</CardTitle>
              <CardContent><p className={styles.FeaturesCardContent}>Learn how to send emails, integrate our API into your code, and make the most of our powerful analytics.</p></CardContent>
              <CardActions>
                <ButtonWrapper>
                  <Button color='orange' onClick={() => setStepName('Sending')}>Start Sending</Button>
                </ButtonWrapper>
              </CardActions>
            </Card>
          </Grid.Column>
        </Grid>;
      case 'Sending':
        return <>
        <h2 className={styles.SendingStepHeading}>Where Would You Like to Begin?</h2>
        <Grid>
          <Grid.Column xs={12} md={6}>
            <Card textAlign='center'>
              <CardContent><p className={styles.FeaturesCardContent}>Send your first email in one click and dive right into what SparkPost can do for your email strategy </p></CardContent>
              <CardActions>
                <ButtonWrapper>
                  <Button color='orange' onClick={() => setStepName('Show Me SparkPost')} className={styles.SendingStepButtons}>Show Me SparkPost</Button>
                </ButtonWrapper>
              </CardActions>
            </Card>
          </Grid.Column>
          <Grid.Column xs={12} md={6}>
            <Card textAlign='center'>
              <CardContent><p className={styles.FeaturesCardContent}>Ready to integrate via SMTP or API? We'll get you set up ASAP so you can start building with SparkPost</p></CardContent>
              <CardActions>
                <ButtonWrapper>
                  <Button color='orange' onClick={() => setStepName('Let\'s Code')} className={styles.SendingStepButtons}>Let's Code</Button>
                </ButtonWrapper>
              </CardActions>
            </Card>
          </Grid.Column>
        </Grid>
         </>;
      case 'Show Me SparkPost':
      case 'Let\'s Code':
      default:
        null;
    }
  };
  return <>
        <Panel title='Getting Started' actions={actions} sectioned >
          <p><strong> Features</strong> </p>
          {renderStep()}
        </Panel>
        </>;
};
