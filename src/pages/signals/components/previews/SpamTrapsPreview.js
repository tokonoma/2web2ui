import React from 'react';
import { getSpamHits } from 'src/actions/signals';
import { selectSpamHitsDetails } from 'src/selectors/signals';
import { PanelLoading } from 'src/components';
import { PageLink } from 'src/components/links';
import { Panel } from 'src/components/matchbox';
import Callout from 'src/components/callout';
import { useHibana } from 'src/context/HibanaContext';
import { SPAM_TRAP_INFO } from '../../constants/info';
import { spamTrapHitTypesCollection } from '../../constants/spamTrapHitTypes';
import withDetails from '../../containers/withDetails';
import BarChart from '../charts/barchart/BarChart';
import ChartHeader from '../ChartHeader';
import { setSubaccountQuery } from 'src/helpers/subaccounts';
import { roundToPlaces } from 'src/helpers/units';

export function SpamTrapsPreview(props) {
  const [state] = useHibana();
  const { isHibanaEnabled } = state;

  const renderContent = () => {
    const { data, gap, empty, error } = props;

    if (error) {
      return (
        <Callout height="170px" title="Unable to Load Data">
          {error.message}
        </Callout>
      );
    }

    if (empty) {
      return (
        <Callout height="170px" title="No Data Available">
          Insufficient data to populate this chart
        </Callout>
      );
    }

    return (
      <BarChart
        height={170}
        disableHover
        isLink
        margin={{ top: 12, left: 12, right: 0, bottom: 12 }}
        gap={gap}
        timeSeries={data}
        yKeys={spamTrapHitTypesCollection
          .map(({ OGFill, hibanaFill, key }) => {
            const fill = isHibanaEnabled ? hibanaFill : OGFill;

            return {
              fill,
              key: `relative_${key}`,
            };
          })
          .reverse()}
        yAxisProps={{
          tickFormatter: tick => `${roundToPlaces(tick * 100, 2)}%`,
          domain: data.every(({ relative_trap_hits }) => !relative_trap_hits)
            ? [0, 1]
            : ['auto', 'auto'],
        }}
        xAxisProps={{ hide: true }}
      />
    );
  };

  const { facet, facetId, loading, subaccountId } = props;

  if (loading) {
    return <PanelLoading minHeight="170px" />;
  }

  return (
    <PageLink to={`/signals/spam-traps/${facet}/${facetId}${setSubaccountQuery(subaccountId)}`}>
      <Panel>
        <Panel.Section>
          <ChartHeader title="Spam Trap Monitoring" hideLine tooltipContent={SPAM_TRAP_INFO} />
        </Panel.Section>
        <Panel.Section>{renderContent()}</Panel.Section>
      </Panel>
    </PageLink>
  );
}

export default withDetails(SpamTrapsPreview, { getSpamHits }, selectSpamHitsDetails);
