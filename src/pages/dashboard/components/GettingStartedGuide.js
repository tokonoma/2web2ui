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
      default:
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
    }
  };
  return <>
        <Panel title='Getting Started' actions={actions} sectioned >
          <p><strong> Features</strong> </p>
          {renderStep()}
        </Panel>
        </>;
};
