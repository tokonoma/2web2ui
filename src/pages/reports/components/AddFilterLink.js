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
  summarySearchOptions,
  reportSearchOptions,
  addFilters }) => {

  const searchOptions = reportType === 'summary' ? summarySearchOptions : reportSearchOptions; //summarySearchOptions includes selected metrics options
  const oldFilters = searchOptions.filters || [];

  const handleOnClick = (e) => {
    addFilters([newFilter]);
    //This prevents the browser from following the link and reloading the page.
    e.preventDefault();
  };

  const mergedFilters = _.uniqWith([ ...oldFilters, stringifyTypeaheadfilter(newFilter)], _.isEqual);
  const linkParams = qs.stringify({ ...searchOptions, filters: mergedFilters }, { arrayFormat: 'repeat' });
  const fullLink = `/reports/${reportType}/?${linkParams}`;

  return (
    <UnstyledLink onClick={handleOnClick} to={fullLink}>{content}</UnstyledLink>
  );
};

const mapStateToProps = (state) => ({
  summarySearchOptions: selectSummaryChartSearchOptions(state),
  reportSearchOptions: selectReportSearchOptions(state)
});

export default connect(mapStateToProps, { addFilters })(AddFilterLink);
