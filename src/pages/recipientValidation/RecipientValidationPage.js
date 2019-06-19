import React from 'react';

import { Page, Tabs, Panel } from '@sparkpost/matchbox';
import ListForm from './components/ListForm';
import SingleAddressForm from './components/SingleAddressForm';
import ListResults from './components/ListResults';
import ApiDetails from './components/ApiDetails';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import RVDisabledPage from './components/RVDisabledPage';
import ConditionSwitch, { Case, defaultCase } from 'src/components/auth/ConditionSwitch';
import useTabs from 'src/hooks/useTabs';

const TABS = [
  { content: 'Validate A List', key: 'list' },
  { content: 'Validate a Single Address', key: 'single' },
  { content: 'API Integration', key: 'api' }
];

export const RecipientValidationPage = () => {

  const [selectedTabIndex, tabs] = useTabs(TABS);
  const selectedTabKey = tabs[selectedTabIndex].key;

  let panelContent;

  if (selectedTabKey === 'list') {
    panelContent = <ListForm />;
  }

  if (selectedTabKey === 'single') {
    panelContent = <SingleAddressForm />;
  }

  if (selectedTabKey === 'api') {
    panelContent = <ApiDetails />;
  }

  const renderRecipientValidation = () => (
    <Page
      title='Recipient Email Validation'>
      <Tabs
        selected={selectedTabIndex}
        connectBelow={true}
        tabs={tabs}
      />
      <Panel>
        {panelContent}
      </Panel>
      {selectedTabKey === 'list' && <ListResults/>}
    </Page>
  );

  return (
    <ConditionSwitch>
      <Case condition={hasAccountOptionEnabled('recipient_validation')}>
        {renderRecipientValidation()}
      </Case>
      <Case condition={defaultCase}>
        <RVDisabledPage/>
      </Case>
    </ConditionSwitch>
  );
};

export default RecipientValidationPage;
