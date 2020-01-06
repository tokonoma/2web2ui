import React from 'react';
import { UnstyledLink } from '@sparkpost/matchbox';
import { GuideListItem, GuideListItemTitle, GuideListItemDescription } from './GuideListItem';
import { useGuideContext } from './GettingStartedGuide';

export default function CheckListItem({ name, title, description, action = {} }) {
  const {
    setAndStoreStepName,
    setOnboardingAccountOption,
    send_test_email_completed,
    explore_analytics_completed,
    invite_collaborator_completed,
    hasSendingDomains,
    hasApiKeysForSending,
    view_developer_docs_completed,
    handleAction,
  } = useGuideContext();
  const getDescription = checklist_name => {
    if (checklist_name === 'Invite a Collaborator')
      return (
        <>
          {
            'Need help integrating? Pass the ball on to someone else to finish setting up this account.'
          }
          <br />
          {'Or you can '}
          <UnstyledLink
            onClick={() => {
              setAndStoreStepName("Let's Code");
              setOnboardingAccountOption({ invite_collaborator_completed: true });
            }}
          >
            setup email sending now
          </UnstyledLink>
        </>
      );

    return null;
  };
  const itemCompleted = {
    'Add Sending Domain': hasSendingDomains,

    'Generate API Key': hasApiKeysForSending,

    'View Developer Docs': view_developer_docs_completed,

    'Send Test Email': send_test_email_completed,

    'Explore Analytics': explore_analytics_completed,

    'Invite a Collaborator': invite_collaborator_completed,
  };
  return (
    <GuideListItem
      action={{
        name: name,
        onClick: () => handleAction(name),
        ...action,
      }}
      itemCompleted={itemCompleted[name]}
    >
      <GuideListItemTitle>{title}</GuideListItemTitle>
      <GuideListItemDescription>{getDescription(name) || description}</GuideListItemDescription>
    </GuideListItem>
  );
}
