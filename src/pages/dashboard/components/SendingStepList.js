import React from 'react';
import { Card, CardContent, CardActions } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';
import { Button, Grid } from '@sparkpost/matchbox';
import styles from './GettingStartedGuide.module.scss';
import { SENDING_STEP_LIST } from '../constants';

const SendingStepListItem = ({ setAndStoreStepName, name, content }) => (
  <Grid.Column xs={12} md={6} key={name}>
    <Card textAlign="center">
      <CardContent>
        <p className={styles.FeaturesCardContent}>{content}</p>
      </CardContent>
      <CardActions>
        <ButtonWrapper>
          <Button
            color="orange"
            onClick={() => setAndStoreStepName(name)}
            className={styles.SendingStepButtons}
          >
            {name}
          </Button>
        </ButtonWrapper>
      </CardActions>
    </Card>
  </Grid.Column>
);

const SendingStepList = ({ setAndStoreStepName }) => (
  <Grid>
    <SendingStepListItem
      setAndStoreStepName={setAndStoreStepName}
      {...SENDING_STEP_LIST['Show Me SparkPost']}
    />
    <SendingStepListItem
      setAndStoreStepName={setAndStoreStepName}
      {...SENDING_STEP_LIST["Let's Code"]}
    />
  </Grid>
);

export default SendingStepList;
