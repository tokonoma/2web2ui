import React, { Component } from 'react';
import { selectHealthScoreDetails } from 'src/selectors/signals';
import { getHealthScore, getSpamHits } from 'src/actions/signals';
import { Panel } from '@sparkpost/matchbox';
import { PanelLoading, PageLink } from 'src/components';
import Callout from 'src/components/callout';
import { HEALTH_SCORE_INFO } from '../../constants/info';
import withDetails from '../../containers/withDetails';
import BarChart from '../charts/barchart/BarChart';
import ChartHeader from '../ChartHeader';
import { setSubaccountQuery } from 'src/helpers/subaccounts';

export class HealthScorePreview extends Component {
  renderContent = () => {
    const { data, gap, empty, error } = this.props;

    if (error) {
      return <Callout height='170px' title='Unable to Load Data'>{error.message}</Callout>;
    }

    if (empty) {
      return <Callout height='170px' title='No Data Available'>Insufficient data to populate this chart</Callout>;
    }

    return (
      <BarChart
        height={170}
        disableHover
        margin={{ top: 12, left: 12, right: 0, bottom: 12 }}
        gap={gap}
        timeSeries={data}
        yKey='health_score'
        yAxisProps={{
          tickFormatter: (tick) => parseInt(tick * 100),
          domain: [0,1]
        }}
        xAxisProps={{ hide: true }}
      />
    );
  }

  render() {
    const { facet, facetId, loading, subaccountId } = this.props;

    if (loading) {
      return <PanelLoading minHeight='170px' />;
    }

    return (
      <PageLink to={`/signals/health-score/${facet}/${facetId}${setSubaccountQuery(subaccountId)}`}>
        <Panel>
          <Panel.Section>
            <ChartHeader
              title='Health Score'
              hideLine
              tooltipContent={HEALTH_SCORE_INFO}
            />
          </Panel.Section>
          <Panel.Section>
            {this.renderContent()}
          </Panel.Section>
        </Panel>
      </PageLink>
    );
  }
}

export default withDetails(
  HealthScorePreview,
  { getHealthScore, getSpamHits },
  selectHealthScoreDetails
);
