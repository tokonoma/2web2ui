import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Grid, Page, Panel } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementByProviders, getAllInboxPlacementMessages, resetState } from 'src/actions/inboxPlacement';
import { RedirectAndAlert } from 'src/components/globalAlert';
import PageLink from 'src/components/pageLink';
import StopTest from './components/StopTest';
import AllMessagesCollection from './components/AllMessagesCollection';
import InfoBlock from './components/InfoBlock';
import styles from './AllMessagesPage.module.scss';
import { formatPercent } from 'src/helpers/units';

export const AllMessagesPage = ({
  id,
  filterType,
  filterName,
  messages,
  loading,
  status,
  sent,
  placement,
  authentication,
  error,
  getInboxPlacementByProviders,
  getAllInboxPlacementMessages,
  resetState,
  StopTestComponent = StopTest,
  AllMessagesCollectionComponent = AllMessagesCollection
}) => {
  const loadMessages = useCallback(() => {
    const filters = { [filterType]: filterName };
    filterType === 'mailbox-provider' ? getInboxPlacementByProviders(id) : undefined; //TODO add sending ip request
    getAllInboxPlacementMessages(id, filters);
  }, [filterName, filterType, getAllInboxPlacementMessages, getInboxPlacementByProviders, id]);

  useEffect(() => {
    loadMessages();
    return (() => resetState());
  }, [id, loadMessages, resetState]);

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <RedirectAndAlert
      to={`/inbox-placement/details/${id}`}
      alert={{ type: 'error', message: error.message }}/>;
  }

  const deliveribilityStyleProps = {
    columnProps: { md: 3 },
    valueClassName: styles.DeliverabilityValue,
    labelClassName: styles.DeliverabilityHeader
  };

  const authenticationStyleProps = {
    columnProps: { md: 4 },
    valueClassName: styles.AuthenticationValue,
    labelClassName: styles.AuthenticationHeader
  };

  return (
    <Page
      breadcrumbAction={{
        component: PageLink,
        content: 'Inbox Placement Results',
        to: `/inbox-placement/details/${id}`
      }}
      title='Inbox Placement'
      subtitle={filterName}
      primaryArea={<StopTestComponent status={status} id={id} reload={loadMessages} />}
    >
      <Panel title="Diagnostics">
        <Grid>
          <Grid.Column lg={7} md={12}>
            <div className={styles.Divider} >
              <h5 className={styles.Title}>Deliverability</h5>
              <Grid className={styles.Panel}>
                <InfoBlock value={sent} label='Sent' {...deliveribilityStyleProps}/>
                <InfoBlock value={(placement.inbox_pct || 0) * sent} label='Inbox' {...deliveribilityStyleProps}/>
                <InfoBlock value={(placement.spam_pct || 0) * sent} label='Spam' {...deliveribilityStyleProps}/>
                <InfoBlock value={(placement.missing_pct || 0) * sent} label='Missing' {...deliveribilityStyleProps}/>
              </Grid>
            </div>
          </Grid.Column>
          <Grid.Column lg={5} md={12}>
            <h5 className={styles.Title}>Authentication</h5>
            <Grid className={styles.Panel}>
              <InfoBlock value={formatPercent((authentication.spf_pct || 0) * 100)} label='SPF' {...authenticationStyleProps}/>
              <InfoBlock value={formatPercent((authentication.dkim_pct || 0) * 100)} label='DKIM' {...authenticationStyleProps}/>
              <InfoBlock value={formatPercent((authentication.dmarc_pct || 0) * 100)} label='DMARC' {...authenticationStyleProps}/>
            </Grid>
          </Grid.Column>
        </Grid>
      </Panel>
      <Panel title="Seed Diagnostics">
        <AllMessagesCollectionComponent data={messages} testId={id} />
      </Panel>
    </Page>
  );
};


function mapStateToProps(state, props) {
  const { id, filterType, filterName } = props.match.params;
  const result = ((filterType === 'mailbox-provider')
    ? state.inboxPlacement.placementsByProvider.find(({ mailbox_provider }) => mailbox_provider === filterName)
    : undefined) || //TODO add sending ip
    {};

  return {
    id,
    filterType,
    filterName,
    status: result.status,
    sent: result.seedlist_count || 0,
    placement: result.placement || {},
    authentication: result.authentication || {},
    stopTestLoading: state.inboxPlacement.stopTestPending,
    messages: state.inboxPlacement.allMessages,
    loading: state.inboxPlacement.getAllMessagesPending,
    error: state.inboxPlacement.getAllMessagesError || state.inboxPlacement.getByProviderError
  };
}

export default connect(mapStateToProps, { getInboxPlacementByProviders, getAllInboxPlacementMessages, resetState })(AllMessagesPage);
