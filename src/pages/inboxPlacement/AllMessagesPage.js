import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Grid, Page, Panel } from '@sparkpost/matchbox';

import { Loading } from 'src/components';
import { getInboxPlacementByProvider, getInboxPlacementByRegion, getInboxPlacementBySendingIp, getAllInboxPlacementMessages, resetState } from 'src/actions/inboxPlacement';
import { RedirectAndAlert } from 'src/components/globalAlert';
import PageLink from 'src/components/pageLink';
import StopTest from './components/StopTest';
import AllMessagesCollection from './components/AllMessagesCollection';
import InfoBlock from './components/InfoBlock';
import styles from './AllMessagesPage.module.scss';
import { formatPercent } from 'src/helpers/units';
import { PLACEMENT_FILTER_TYPES } from './constants/types';
import { selectSinglePlacementResult } from 'src/selectors/inboxPlacement';
import formatFilterName from './helpers/formatFilterName';

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
  getInboxPlacementByProvider,
  getInboxPlacementByRegion,
  getInboxPlacementBySendingIp,
  getAllInboxPlacementMessages,
  resetState,
  StopTestComponent = StopTest,
  AllMessagesCollectionComponent = AllMessagesCollection
}) => {

  const loadMessages = useCallback(() => {
    const filterTypeToQueryParamMap = {
      [PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER]: 'mailbox_providers',
      [PLACEMENT_FILTER_TYPES.REGION]: 'regions',
      [PLACEMENT_FILTER_TYPES.SENDING_IP]: 'sending_ips'
    };
    const filters = { [filterTypeToQueryParamMap[filterType]]: filterName };

    switch (filterType) {
      case PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER:
        getInboxPlacementByProvider(id);
        break;
      case PLACEMENT_FILTER_TYPES.REGION:
        getInboxPlacementByRegion(id);
        break;
      case PLACEMENT_FILTER_TYPES.SENDING_IP:
        getInboxPlacementBySendingIp(id);
        break;
      default:
    }
    getAllInboxPlacementMessages(id, filters);
  }, [filterName, filterType, getAllInboxPlacementMessages, getInboxPlacementByProvider, getInboxPlacementByRegion, getInboxPlacementBySendingIp, id]);

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

  const deliverabilityStyleProps = {
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
      subtitle={formatFilterName(filterType, filterName)}
      primaryArea={<StopTestComponent status={status} id={id} reload={loadMessages} />}
    >
      <Panel title="Diagnostics">
        <Grid>
          <Grid.Column lg={7} md={12}>
            <div className={styles.Divider} >
              <h5 className={styles.Title}>Deliverability</h5>
              <Grid className={styles.Panel}>
                <InfoBlock value={sent} label='Sent' {...deliverabilityStyleProps}/>
                <InfoBlock value={(placement.inbox_pct || 0) * sent} label='Inbox' {...deliverabilityStyleProps}/>
                <InfoBlock value={(placement.spam_pct || 0) * sent} label='Spam' {...deliverabilityStyleProps}/>
                <InfoBlock value={(placement.missing_pct || 0) * sent} label='Missing' {...deliverabilityStyleProps}/>
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
  const {
    status,
    seedlist_count = 0,
    placement = {},
    authentication = {}} = selectSinglePlacementResult(state, props) || {};

  return {
    id,
    filterType,
    filterName,
    status,
    sent: seedlist_count,
    placement,
    authentication,
    stopTestLoading: state.inboxPlacement.stopTestPending,
    messages: state.inboxPlacement.allMessages,
    loading: state.inboxPlacement.getAllMessagesPending,
    error: state.inboxPlacement.getAllMessagesError || state.inboxPlacement.getByProviderError
  };
}

export default connect(mapStateToProps, { getInboxPlacementByProvider, getInboxPlacementByRegion, getInboxPlacementBySendingIp, getAllInboxPlacementMessages, resetState })(AllMessagesPage);
