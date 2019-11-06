import React from 'react';
import { Panel, Button } from '@sparkpost/matchbox';
import { ArrowDropDown, Send } from '@sparkpost/matchbox-icons';
import { Card, CardTitle, CardContent, CardActions } from 'src/components';
import CardGroup from 'src/components/card/CardGroup';
import ButtonWrapper from 'src/components/buttonWrapper';
export const GettingStartedGuide = () => (
        <>
        <Panel title='Getting Started' actions={[{
          content: <span> Move to Bottom <ArrowDropDown/> </span>,
          color: 'blue'
        }]} sectioned >
          <p style={{ fontWeight: '600', fontSize: '18px' }}>  Features </p>
          <CardGroup>
            <Card>
              <CardTitle><Send size='25' style={{ transform: 'rotate(-45deg)' }}/>   &nbsp;Sending with Sparkpost</CardTitle>
              <CardContent>Learn how to send emails, integrate our API into your code, and make the most of our powerful analytics.</CardContent>
              <CardActions>
                <ButtonWrapper>
                  <Button color='orange'>Start Sending</Button>
                </ButtonWrapper>
              </CardActions>
            </Card>
          </CardGroup>
        </Panel>
        </>
);
