import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Grid, Page, Panel } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementByProviders, getAllInboxPlacementMessages } from 'src/actions/inboxPlacement';
import { RedirectAndAlert } from 'src/components/globalAlert';
import StopTest from './components/StopTest';
import AllMessagesCollection from './components/AllMessagesCollection';
import InfoBlock from './components/InfoBlock';
import styles from './AllMessagesPage.module.scss';
import { formatPercent } from 'src/helpers/units';

export const AllMessagesPage = (props) => {
  const {
    history,
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
    StopTestComponent = StopTest //This is for unit testing purposes
  } = props;

  const loadMessages = useCallback(() => {
    const filters = { [filterType]: filterName };
    filterType === 'mailbox-provider' ? getInboxPlacementByProviders(id) : undefined; //TODO add sending ip request
    getAllInboxPlacementMessages(id, filters);
  }, [filterName, filterType, getAllInboxPlacementMessages, getInboxPlacementByProviders, id]);

  useEffect(() => {
    loadMessages();
  }, [id, loadMessages]);


  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <RedirectAndAlert
      to={`/inbox-placement/details/${id}`}
      alert={{ type: 'error', message: error.message }}/>;
  }

  return (
    <Page
      breadcrumbAction={{
        content: 'Inbox Placement Results',
        onClick: () => history.push(`/inbox-placement/details/${id}`)
      }}
      title='Inbox Placement'
      subtitle={filterName}
      primaryArea={<StopTestComponent status={status} id={id} reload={loadMessages} />}
    >
      <Panel>
        <Panel.Section>
          <h3>Diagnostics</h3>
        </Panel.Section>
        <Grid>
          <Grid.Column lg={7} md={12}>
            <div className={styles.Divider} >
              <h5 className={styles.Title}>Deliverability</h5>
              <Grid className={styles.Panel}>
                <InfoBlock value={sent} label='Sent' columnProps={{ md: 3 }} className={styles.Deliverability}/>
                <InfoBlock value={(placement.inbox_pct || 0) * sent} label='Inbox' columnProps={{ md: 3 }} className={styles.Deliverability}/>
                <InfoBlock value={(placement.spam_pct || 0) * sent} label='Spam' columnProps={{ md: 3 }} className={styles.Deliverability}/>
                <InfoBlock value={(placement.missing_pct || 0) * sent} label='Missing' columnProps={{ md: 3 }} className={styles.Deliverability}/>
              </Grid>
            </div>
          </Grid.Column>
          <Grid.Column lg={5} md={12}>
            <h5 className={styles.Title}>Authentication</h5>
            <Grid className={styles.Panel}>
              <InfoBlock value={formatPercent((authentication.spf_pct || 0) * 100)} label='SPF' columnProps={{ md: 4 }} className={styles.Authentication}/>
              <InfoBlock value={formatPercent((authentication.dkim_pct || 0) * 100)} label='DKIM' columnProps={{ md: 4 }} className={styles.Authentication}/>
              <InfoBlock value={formatPercent((authentication.dmarc_pct || 0) * 100)} label='DMARC' columnProps={{ md: 4 }} className={styles.Authentication}/>
            </Grid>
          </Grid.Column>
        </Grid>
      </Panel>
      <Panel title={'Seed Diagnostics'}>
        <AllMessagesCollection data={messages}/>
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
    sent: result.seedlist_count,
    placement: result.placement || {},
    authentication: result.authentication || {},
    stopTestLoading: state.inboxPlacement.stopTestPending,
    messages: state.inboxPlacement.allMessages,
    loading: state.inboxPlacement.getAllMessagesPending
  };
}

export default connect(mapStateToProps, { getInboxPlacementByProviders, getAllInboxPlacementMessages })(AllMessagesPage);
