import React from 'react';
import { Panel, UnstyledLink } from 'src/components/matchbox';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { GuideListItem, GuideListItemTitle, GuideListItemDescription } from './GuideListItem';
import { useGuideContext } from './GettingStartedGuide';

const SendTestEmailItem = () => {
  const { send_test_email_completed, handleAction } = useGuideContext();
  return (
    <GuideListItem
      action={{
        name: 'Send Test Email',
        onClick: () => handleAction('Send Test Email'),
      }}
      itemCompleted={send_test_email_completed}
    >
      <GuideListItemTitle>Send a Test Email</GuideListItemTitle>
      <GuideListItemDescription>
        Send a test email using our starter template.
      </GuideListItemDescription>
    </GuideListItem>
  );
};

const ExploreAnalyticsItem = () => {
  const { explore_analytics_completed, handleAction } = useGuideContext();

  return (
    <GuideListItem
      action={{
        name: 'Explore Analytics',
        onClick: () => handleAction('Explore Analytics'),
      }}
      itemCompleted={explore_analytics_completed}
    >
      <GuideListItemTitle>Explore Analytics</GuideListItemTitle>
      <GuideListItemDescription>
        Get acquainted with our powerful analytics to make the most of your sending strategy.
      </GuideListItemDescription>
    </GuideListItem>
  );
};

const ViewEventsItem = () => {
  const { check_events_completed, handleAction } = useGuideContext();

  return (
    <GuideListItem
      action={{
        name: 'Check Out Events',
        onClick: () => handleAction('Check Out Events'),
      }}
      itemCompleted={check_events_completed}
    >
      <GuideListItemTitle>Check Out Events</GuideListItemTitle>
      <GuideListItemDescription>
        Learn how SparkPost can provide analytics to make the most of your sending strategy.
      </GuideListItemDescription>
    </GuideListItem>
  );
};

const InviteCollaboratorItem = () => {
  const {
    invite_collaborator_completed,
    handleAction,
    setAndStoreStepName,
    setOnboardingAccountOption,
  } = useGuideContext();

  return (
    <GuideListItem
      action={{
        name: 'Invite a Collaborator',
        onClick: () => handleAction('Invite a Collaborator'),
      }}
      itemCompleted={invite_collaborator_completed}
    >
      <GuideListItemTitle>Invite Your Team</GuideListItemTitle>
      <GuideListItemDescription>
        <span>
          Need help integrating? Pass the ball on to someone else to finish setting up this account.
        </span>
        <br />
        <span>Or you can&nbsp;</span>
        <UnstyledLink
          onClick={() => {
            setAndStoreStepName("Let's Code");
            setOnboardingAccountOption({ invite_collaborator_completed: true });
          }}
        >
          setup email sending now.
        </UnstyledLink>
      </GuideListItemDescription>
    </GuideListItem>
  );
};

export default function ShowMeSparkpostStep() {
  return (
    <>
      <Panel.Section>
        <GuideBreadCrumbs />
        <SendTestEmailItem />
      </Panel.Section>
      <Panel.Section>
        <ExploreAnalyticsItem />
      </Panel.Section>
      <Panel.Section>
        <ViewEventsItem />
      </Panel.Section>
      <Panel.Section>
        <InviteCollaboratorItem />
      </Panel.Section>
    </>
  );
}
