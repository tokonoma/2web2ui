import React, { useState } from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { ArrowDownward, Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions, CardGroup } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';

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
        return <CardGroup>
          <Card>
            <CardTitle><Send size='20' style={{ transform: 'rotate(-45deg)', verticalAlign: '5%' }}/>   &nbsp;Sending with Sparkpost</CardTitle>
            <CardContent>Learn how to send emails, integrate our API into your code, and make the most of our powerful analytics.</CardContent>
            <CardActions>
              <ButtonWrapper>
                <Button color='orange' onClick={() => setStepName('Start Sending')}>Start Sending</Button>
              </ButtonWrapper>
            </CardActions>
          </Card>
        </CardGroup>;
    }
  };
  return <>
        <Panel title='Getting Started' actions={actions} sectioned >
          <p><strong> Features</strong> </p>
          {renderStep()}
        </Panel>
        </>;
};
