import React from 'react';
import { connect } from 'react-redux';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCondition } from 'src/selectors/accessConditionState';
import JobsTableCollection from './JobsTableCollection';
import ListResults from './ListResults';

// TODO: Remove in SE-156
export const ListResultsFeatureToggle = ({ isFlagEnabled }) => {
  if (isFlagEnabled) {
    return <JobsTableCollection />;
  }

  return <ListResults />;
};


const mapStateToProps = (state) => ({
  isFlagEnabled: selectCondition(isAccountUiOptionSet('recipientValidationV2'))(state)
});

export default connect(mapStateToProps)(ListResultsFeatureToggle);
