import React, { useState } from 'react';
import styles from './ReportTable.module.scss';
import { Box, Grid, Checkbox, Select } from 'src/components/matchbox';
import { GROUP_CONFIG } from '../constants/tableConfig';

export const GroupByOption = props => {
  const { groupBy, hasSubaccounts, tableLoading, _getTableData } = props;

  const [topDomainsOnly, setTopDomainsOnly] = useState(true);

  const handleGroupChange = e => {
    if (e.target.value !== 'placeholder') {
      _getTableData({ groupBy: e.target.value });
    }
  };

  const handleDomainsCheckboxChange = () => {
    const newTopDomainsOnly = !topDomainsOnly;
    setTopDomainsOnly(newTopDomainsOnly);
    const groupBy = newTopDomainsOnly ? 'watched-domain' : 'domain';
    _getTableData({ groupBy });
  };

  const getSelectOptions = () => {
    const filteredOptionsKeys = Object.keys(GROUP_CONFIG).filter(key => {
      return !(
        (key === 'subaccount' && !hasSubaccounts) ||
        (key === 'domain' && topDomainsOnly) ||
        (key === 'watched-domain' && !topDomainsOnly)
      );
    });

    const options = filteredOptionsKeys.map(key => ({
      value: key,
      label: GROUP_CONFIG[key].label,
    }));

    return options;
  };

  const renderDomainsCheckbox = () => {
    //Only show 'Top Domains Only' checkbox when on the recipient domains grouping
    if (groupBy !== 'watched-domain' && groupBy !== 'domain') {
      return null;
    }
    return (
      <Box marginTop={'500'} className={styles.TopDomainsCheckbox}>
        <Checkbox
          id="watchedDomains"
          label="Top Domains Only"
          checked={topDomainsOnly}
          onChange={handleDomainsCheckboxChange}
          disabled={tableLoading}
        />
      </Box>
    );
  };

  return (
    <Grid>
      <Grid.Column xs={12} md={5} lg={4}>
        <Select
          label="Break Down By"
          options={getSelectOptions()}
          value={groupBy}
          disabled={tableLoading}
          onChange={handleGroupChange}
          placeholder="Select Resource"
          placeholderValue="placeholder"
        />
      </Grid.Column>
      <Grid.Column xs={12} md={4} mdOffset={3} lg={3} lgOffset={5}>
        {renderDomainsCheckbox()}
      </Grid.Column>
    </Grid>
  );
};

export default GroupByOption;
