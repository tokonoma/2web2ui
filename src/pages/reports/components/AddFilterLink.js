import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import qs from 'qs';

import { addFilters } from 'src/actions/reportOptions';
import { stringifyTypeaheadfilter } from 'src/helpers/string';
import { selectReportSearchOptions, selectSummaryChartSearchOptions } from 'src/selectors/reportSearchOptions';
import { UnstyledLink } from '@sparkpost/matchbox';

export const AddFilterLink = ({
  //From parent
  newFilter,
  reportType,
  content,
  //From redux
  currentSearchOptions,
  addFilters }) => {

  const currentFilters = currentSearchOptions.filters || [];

  const handleOnClick = (e) => {
    addFilters([newFilter]);
    //This prevents the browser from following the link and reloading the page.
    e.preventDefault();
  };

  const mergedFilters = _.uniqWith([ ...currentFilters, stringifyTypeaheadfilter(newFilter)], _.isEqual);
  const newSearchOptions = { ...currentSearchOptions, filters: mergedFilters };
  const linkParams = qs.stringify(newSearchOptions, { arrayFormat: 'repeat' });
  const fullLink = `/reports/${reportType}/?${linkParams}`;

  return (
    <UnstyledLink onClick={handleOnClick} to={fullLink}>{content}</UnstyledLink>
  );
};

const mapStateToProps = (state, props) => ({
  currentSearchOptions: (props.reportType === 'summary')
    ? selectSummaryChartSearchOptions(state)
    : selectReportSearchOptions(state)
});

export default connect(mapStateToProps, { addFilters })(AddFilterLink);
