import React from 'react';
import { connect } from 'react-redux';
import { getCaretProps } from 'src/helpers/signals';
import { selectHealthScoreOverviewData, getHealthScoreData } from 'src/selectors/signals';
import { Panel, Tooltip } from '@sparkpost/matchbox';
import { InfoOutline } from '@sparkpost/matchbox-icons';
import { PanelLoading } from 'src/components';
import Callout from 'src/components/callout';
import Gauge from './Gauge';
import MetricDisplay from '../MetricDisplay/MetricDisplay';
import { HEALTH_SCORE_INFO } from '../../../constants/info';
import thresholds from '../../../constants/healthScoreThresholds';
import _ from 'lodash';

import styles from './CurrentHealthGauge.module.scss';

export function CurrentHealthGauge({ data, loading, error }) {
  const accountData = _.find(data, ['sid', -1]) || {};
  const noData = _.isNil(accountData.current_health_score);

  if (loading) {
    return <PanelLoading minHeight='407px' />;
  }

  if (error) {
    return (
      <Panel sectioned>
        <div className={styles.Content}>
          <div className={styles.ErrorMessage}>
            <Callout title='Unable to Load Data' height='auto' children={error.message} />
          </div>
        </div>
      </Panel>
    );
  }

  let threshold = {};

  for (const key in thresholds) {
    if (thresholds[key].condition(accountData.current_health_score)) {
      threshold = thresholds[key];
    }
  }

  const DescriptionIcon = threshold.icon;

  function getMetricProps(key) {
    const value = accountData[key];
    return { value: _.isNil(value) ? 'n/a' : `${value}%`, ...getCaretProps(value) };
  }

  return (
    <Panel sectioned>
      <div className={styles.Content}>
        <h2 className={styles.Header}>
          Current Health Score – Overall
          {' '}
          <Tooltip
            children={<InfoOutline className={styles.TooltipIcon} size={18} />}
            content={HEALTH_SCORE_INFO}
            dark
            horizontalOffset='-1rem'
            right
          />
        </h2>
        {noData && <div><Callout height='auto'>Current Health Score Not Available</Callout></div>}
        {!noData && (
          <>
            <Gauge score={accountData.current_health_score} threshold={threshold} />
            <div className={styles.Description}>
              <DescriptionIcon className={styles.DescriptionIcon} size={25} style={{ fill: threshold.color }} />
              <p className={styles.DescriptionContent}>{threshold.description}</p>
            </div>
          </>
        )}
        <div className={styles.Metrics}>
          <MetricDisplay label='WoW Change' {...getMetricProps('WoW')} />
          <MetricDisplay label='DoD Change' {...getMetricProps('DoD')} />
        </div>
      </div>
    </Panel>
  );
}

const mapStateToProps = (state) => ({
  ...getHealthScoreData(state),
  data: selectHealthScoreOverviewData(state)
});

export default connect(mapStateToProps, {})(CurrentHealthGauge);
