import React from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs as MbTabs } from '@sparkpost/matchbox';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import _ from 'lodash';

const tabs = [
  { content: 'Cohorts', path: '/signals/engagement/cohorts' },
  { content: 'Engagement Rate', path: '/signals/engagement/engagement-rate' },
  { content: 'Unsubscribe Rate', path: '/signals/engagement/unsubscribes' },
  { content: 'Complaint Rate', path: '/signals/engagement/complaints' }
];

export function Tabs({ facet, facetId, history, location, subaccountId }) {
  const renderTabs = tabs.map(({ content }) => ({ content }));
  const handleSelect = (i) => history.push(`${tabs[i].path}/${facet}/${facetId}${setSubaccountQuery(subaccountId)}`);
  const selected = _.findIndex(tabs, ({ path }) => location.pathname.includes(path));

  return (
    <MbTabs
      tabs={renderTabs}
      onSelect={handleSelect}
      connectBelow
      selected={selected}
      fitted
    />
  );
}

export default withRouter(Tabs);
