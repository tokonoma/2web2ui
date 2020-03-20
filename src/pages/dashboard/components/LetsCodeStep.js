import React from 'react';
import { Panel } from 'src/components/matchbox';
import GuideBreadCrumbs from './GuideBreadCrumbs';
import { GuideListItem, GuideListItemTitle, GuideListItemDescription } from './GuideListItem';
import { useGuideContext } from './GettingStartedGuide';
import { Abbreviation } from 'src/components';

const AddSendingDomainItem = () => {
  const { hasSendingDomains, handleAction } = useGuideContext();
  return (
    <GuideListItem
      action={{
        name: 'Add Sending Domain',
        onClick: () => handleAction('Add Sending Domain'),
      }}
      itemCompleted={hasSendingDomains}
    >
      <GuideListItemTitle>Add a Sending Domain</GuideListItemTitle>
      <GuideListItemDescription>
        You'll need to add a sending domain in order to start sending emails.
      </GuideListItemDescription>
    </GuideListItem>
  );
};

const GenerateApiKeyItem = () => {
  const { hasApiKeysForSending, handleAction } = useGuideContext();

  return (
    <GuideListItem
      action={{
        name: 'Generate API Key',
        onClick: () => handleAction('Generate API Key'),
      }}
      itemCompleted={hasApiKeysForSending}
    >
      <GuideListItemTitle>Generate an API Key</GuideListItemTitle>
      <GuideListItemDescription>
        An API Key is required to use our APIs within your app.
      </GuideListItemDescription>
    </GuideListItem>
  );
};

const ViewDeveloperDocsItem = () => {
  const { view_developer_docs_completed, handleAction } = useGuideContext();

  return (
    <GuideListItem
      action={{
        name: 'View Developer Docs',
        onClick: () => handleAction('View Developer Docs'),
        to: 'https://developers.sparkpost.com/api',
        external: true,
      }}
      itemCompleted={view_developer_docs_completed}
    >
      <GuideListItemTitle>Check Out the Documentation</GuideListItemTitle>
      <GuideListItemDescription>
        <span>Visit our developer docs for all the details on our&nbsp;</span>
        <Abbreviation title="Application Programming Interface">API</Abbreviation>
        <span>&nbsp;and&nbsp;</span>
        <Abbreviation title="Simple Mail Transfer Protocol">SMTP</Abbreviation>
        <span>&nbsp;powered delivery.</span>
      </GuideListItemDescription>
    </GuideListItem>
  );
};

export default function LetsCodeStep() {
  return (
    <>
      <Panel.Section>
        <GuideBreadCrumbs />
        <AddSendingDomainItem />
      </Panel.Section>
      <Panel.Section>
        <GenerateApiKeyItem />
      </Panel.Section>
      <Panel.Section>
        <ViewDeveloperDocsItem />
      </Panel.Section>
    </>
  );
}
