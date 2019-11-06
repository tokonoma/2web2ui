import React from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { ArrowDownward, Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import CardGroup from 'src/components/card/CardGroup';
import ButtonWrapper from 'src/components/buttonWrapper';
export const GettingStartedGuide = ({ isGuideAtBottom, moveGuideAtBottom }) => {
  const actions = isGuideAtBottom ? null : [{
    content: <span> Move to Bottom <ArrowDownward size='20'/> </span>,
    color: 'blue',
    onClick: moveGuideAtBottom
  }];
  return <>
        <Panel title='Getting Started' actions={actions} sectioned >
          <h5>  Features </h5>
          <CardGroup>
            <Card>
              <CardTitle><Send size='20' style={{ transform: 'rotate(-45deg)', verticalAlign: '5%' }}/>   &nbsp;Sending with Sparkpost</CardTitle>
              <CardContent>Learn how to send emails, integrate our API into your code, and make the most of our powerful analytics.</CardContent>
              <CardActions>
                <ButtonWrapper>
                  <Button color='orange'>Start Sending</Button>
                </ButtonWrapper>
              </CardActions>
            </Card>
          </CardGroup>
        </Panel>
        </>;
};
