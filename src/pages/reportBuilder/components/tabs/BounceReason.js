import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { refreshBounceReport } from 'src/actions/bounceReport';
import { Empty, LongTextContainer, Percent, TableCollection, PanelLoading } from 'src/components';
import { mapStateToProps } from 'src/selectors/bounceReport';
import { Box, Table, Tag, Text } from 'src/components/matchbox';
import styles from '../../ReportBuilder.module.scss';
import { safeRate } from 'src/helpers/math';

const filterBoxConfig = {
  show: true,
  keyMap: {
    category: 'bounce_category_name',
    classification: 'bounce_class_name',
  },
  itemToStringKeys: ['bounce_category_name', 'bounce_class_name', 'domain', 'reason'],
  exampleModifiers: ['domain', 'category', 'classification'],
  matchThreshold: 5,
  wrapper: props => (
    <>
      <Box padding="500">
        <Text as="div" fontSize="400" fontWeight="600">
          Filter
        </Text>
        {props}
      </Box>
      <hr className={styles.Line} />
    </>
  ),
};

const columns = [
  { label: 'Count %', sortKey: 'count_bounce' },
  { label: 'Classification', sortKey: 'classification_id' },
  { label: 'Category', sortKey: 'bounce_category_name' },
  { label: 'Reason', width: '45%', sortKey: 'reason' },
  { label: 'Domain', sortKey: 'domain' },
];

const wrapperComponent = props => (
  <>
    <Table>{props.children}</Table>
    <hr className={styles.Line} />
  </>
);

export function BounceReason(props) {
  const { aggregates, reasons, refreshBounceReport, reportOptions, tableLoading } = props;

  useEffect(() => {
    if (reportOptions.to && reportOptions.from) {
      refreshBounceReport(reportOptions);
    }
  }, [refreshBounceReport, reportOptions]);

  const getRowData = useCallback(
    item => {
      const { reason, domain, bounce_category_name, bounce_class_name, count_bounce } = item;
      let numerator = count_bounce;
      let denominator = aggregates.countBounce;

      return [
        <Percent value={safeRate(numerator, denominator)} />,
        bounce_class_name,
        <Tag>{bounce_category_name}</Tag>,
        <LongTextContainer text={reason} />,
        domain,
      ];
    },
    [aggregates],
  );

  if (tableLoading) {
    return <PanelLoading />;
  }

  if (!reasons.length) {
    return (
      <Box height={'200px'} paddingTop={'70px'}>
        <Empty message={'No bounce reasons to report'} hasPanel={false} />
      </Box>
    );
  }

  return (
    <TableCollection
      columns={columns}
      rows={reasons}
      getRowData={getRowData}
      defaultSortColumn="count_bounce"
      defaultSortDirection="desc"
      wrapperComponent={wrapperComponent}
      pagination
      filterBox={filterBoxConfig}
    />
  );
}

const mapDispatchToProps = {
  refreshBounceReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(BounceReason);
