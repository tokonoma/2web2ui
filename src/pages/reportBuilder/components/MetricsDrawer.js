import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Inline, Checkbox, Tooltip, Drawer } from 'src/components/matchbox';

import { categorizedMetricsList, list } from 'src/config/metrics';
import _ from 'lodash';

const INITIAL_STATE = list.reduce((accumulator, { key }) => {
  accumulator[key] = false;
  return accumulator;
}, {});

export default function MetricsDrawer(props) {
  const getStateFromProps = useCallback(() => {
    return props.selectedMetrics.reduce(
      (accumulator, current) => {
        accumulator[current.key] = true;
        return accumulator;
      },
      { ...INITIAL_STATE },
    );
  }, [props.selectedMetrics]);

  const [selectedMetrics, setSelectedMetrics] = useState(getStateFromProps());

  useEffect(() => {
    const newSelectedMetrics = getStateFromProps();
    setSelectedMetrics(newSelectedMetrics);
  }, [getStateFromProps, props.selectedMetrics]);

  const handleCheckbox = key => {
    const newSelectedMetric = { ...selectedMetrics };
    newSelectedMetric[key] = !newSelectedMetric[key];
    setSelectedMetrics(newSelectedMetric);
  };

  const handleApply = () => {
    props.handleSubmit({ metrics: getSelectedMetrics() });
  };

  const getSelectedMetrics = () => _.keys(selectedMetrics).filter(key => !!selectedMetrics[key]);

  const renderMetricsCategories = () => {
    return categorizedMetricsList.map(({ category, metrics }) => {
      return (
        <div key={category}>
          <Box fontWeight="semibold" marginTop="600" marginBottom="400" paddingLeft={'100'}>
            {category}
          </Box>
          <Inline space="100">{renderMetrics(metrics)}</Inline>
        </div>
      );
    });
  };
  const renderMetrics = metrics =>
    metrics.map(metric => {
      return (
        <Box marginRight="300" width="200px" key={metric.key} paddingLeft={'100'}>
          <Tooltip id={metric.key} content={metric.description} portalID="tooltip-portal">
            <Checkbox
              id={metric.key}
              onChange={() => handleCheckbox(metric.key)}
              checked={selectedMetrics[metric.key]}
              label={metric.label}
            />
          </Tooltip>
        </Box>
      );
    });

  const isSelectedMetricsSameAsCurrentlyAppliedMetrics =
    props.selectedMetrics
      .map(({ key }) => key)
      .sort()
      .join(',') ===
    getSelectedMetrics()
      .sort()
      .join(',');

  //Needs this for current tests as hibana is not enabled for tests but is required for the Drawer component
  const { DrawerFooter = Drawer.Footer } = props;
  return (
    <>
      <Box margin="400" paddingBottom={'90px'}>
        {renderMetricsCategories()}
      </Box>
      <DrawerFooter margin="400">
        <Inline spacing="400">
          <Button
            onClick={handleApply}
            variant="primary"
            disabled={
              getSelectedMetrics().length < 1 || isSelectedMetricsSameAsCurrentlyAppliedMetrics
            }
          >
            Apply Metrics
          </Button>
          <Button onClick={() => setSelectedMetrics(INITIAL_STATE)} variant="secondary">
            Clear Metrics
          </Button>
        </Inline>
      </DrawerFooter>
    </>
  );
}
