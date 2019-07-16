import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatDateTime, formatDate } from 'src/helpers/date';
import classnames from 'classnames';
import { fetch as getAccount } from 'src/actions/account';
import PanelLoading from 'src/components/panelLoading/PanelLoading';

import { Panel, ProgressBar } from '@sparkpost/matchbox';
import styles from './UsageReport.module.scss';
import { LINKS } from 'src/constants';
import SendMoreCTA from './SendMoreCTA';

const actions = [
  {
    content: 'What counts towards usage?',
    to: LINKS.DAILY_USAGE,
    external: true,
    color: 'orange'
  }
];

const getPercent = (used, limit) => Math.floor((used / limit) * 100);

const DisplayNumber = ({ label, content, orange }) => (
  <div className={styles.Display}>
    <h5 className={classnames(styles.Content, orange && styles.orange)}>{content}</h5>
    <h6 className={styles.Label}>{label}</h6>
  </div>
);

const ProgressLabel = ({ title, secondaryTitle }) => (
  <div>
    <h5 className={styles.ProgressTitle}>{title}</h5>
    <h6 className={styles.ProgressSecondary}>{secondaryTitle}</h6>
  </div>
);

export class UsageReport extends Component {
  componentDidMount() {
    this.props.getAccount({ include: 'usage' });
  }

  render() {
    const { subscription, usage } = this.props;

    if (!subscription || !usage) {
      return <PanelLoading />;
    }

    const remaining = subscription.plan_volume - usage.month.used;
    const overage = remaining < 0 ? Math.abs(remaining) : 0;
    const hasDailyLimit = usage.day.limit > 0;
    const hasMonthlyLimit = usage.month.limit > 0;

    const overageMarkup = overage
      ? <DisplayNumber label='Extra Emails Used' content={overage.toLocaleString()}/>
      : null;

    return (
      <Panel title='Your Usage Report' actions={actions}>
        <Panel.Section>
          <ProgressLabel
            title='Today'
            secondaryTitle={`Since ${formatDateTime(usage.day.start)}`}
          />
          {hasDailyLimit && (
            <ProgressBar completed={getPercent(usage.day.used, usage.day.limit)} />
          )}
          <DisplayNumber label='Used' content={usage.day.used.toLocaleString()} orange />
          {hasDailyLimit && (
            <DisplayNumber label='Daily Limit' content={usage.day.limit.toLocaleString()} />
          )}
          <SendMoreCTA />
        </Panel.Section>
        <Panel.Section>
          <ProgressLabel
            title='This Month'
            secondaryTitle={`Billing cycle: ${formatDate(usage.month.start)} - ${formatDate(usage.month.end)}`}
          />
          {hasMonthlyLimit && (
            <ProgressBar completed={getPercent(usage.month.used, usage.month.limit)} />
          )}
          <DisplayNumber label='Used' content={usage.month.used.toLocaleString()} orange />
          <DisplayNumber label='Included' content={subscription.plan_volume.toLocaleString()}/>
          {overageMarkup}
          {hasMonthlyLimit && (
            <DisplayNumber label='Monthly limit' content={usage.month.limit.toLocaleString()} />
          )}
        </Panel.Section>
      </Panel>
    );
  }
}

const mapStateToProps = ({ account: { usage, subscription }}) => ({ usage, subscription });
export default connect(mapStateToProps, { getAccount })(UsageReport);
