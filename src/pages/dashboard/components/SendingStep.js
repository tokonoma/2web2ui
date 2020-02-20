import React from 'react';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { Panel } from '@sparkpost/matchbox';
import styles from './SendingStep.module.scss';
import { useGuideContext } from './GettingStartedGuide';
import { Card, CardContent, CardActions } from 'src/components';
import ButtonWrapper from 'src/components/buttonWrapper';
import { Button, Grid } from '@sparkpost/matchbox';
import { SENDING_STEP_LIST } from '../constants';

export default function SendingStep() {
  return (
    <Panel.Section>
      <GuideBreadCrumbs />
      <p className={styles.SendingStepHeading} role="heading" aria-level="4" tabIndex={-1}>
        Where Would You Like to Begin?
      </p>
      <SendingStepList />
    </Panel.Section>
  );
}

export const SendingStepListItem = ({ setAndStoreStepName, name, content }) => (
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

export const SendingStepList = () => {
  const { setAndStoreStepName } = useGuideContext();
  return (
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
};
