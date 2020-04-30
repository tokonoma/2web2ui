import React from 'react';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { useGuideContext } from './GettingStartedGuide';
import { ButtonWrapper, Card, CardContent, CardActions } from 'src/components';
import { Box, Button, Grid, Panel, Text } from 'src/components/matchbox';
import useHibanaToggle from 'src/hooks/useHibanaToggle';
import { SENDING_STEP_LIST } from '../constants';
import styles from './SendingStep.module.scss';

export default function SendingStep() {
  return (
    <Panel.Section>
      <GuideBreadCrumbs />
      <Box mb="400">
        <p className={styles.SendingStepHeading} role="heading" aria-level="4" tabIndex={-1}>
          Where Would You Like to Begin?
        </p>
      </Box>
      <SendingStepList />
    </Panel.Section>
  );
}

export const OGSendingStepListItem = ({ setAndStoreStepName, name, label = name, content }) => (
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
            {label}
          </Button>
        </ButtonWrapper>
      </CardActions>
    </Card>
  </Grid.Column>
);

export const HibanaSendingStepListItem = ({
  setAndStoreStepName,
  name,
  label = name,
  content,
  mb,
}) => (
  <Grid.Column xs={12} md={6} key={name}>
    <Box mb={mb}>
      <Card textAlign="center">
        <CardContent>
          <Text>{content}</Text>
        </CardContent>
        <CardActions>
          <Button
            mt="400"
            variant="primary"
            outlineBorder
            onClick={() => setAndStoreStepName(name)}
          >
            {label}
          </Button>
        </CardActions>
      </Card>
    </Box>
  </Grid.Column>
);

export const SendingStepListItem = props => {
  return useHibanaToggle(OGSendingStepListItem, HibanaSendingStepListItem)(props);
};

export const SendingStepList = () => {
  const { setAndStoreStepName } = useGuideContext();
  return (
    <Grid>
      <SendingStepListItem
        setAndStoreStepName={setAndStoreStepName}
        {...SENDING_STEP_LIST['Show Me SparkPost']}
        mb={['400', null, null, 0]}
      />
      <SendingStepListItem
        setAndStoreStepName={setAndStoreStepName}
        {...SENDING_STEP_LIST["Let's Code"]}
        label={window.onboardingStartSendingTest ? 'Start Sending' : "Let's Code"}
      />
    </Grid>
  );
};
