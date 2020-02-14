import React from 'react';
import { connect } from 'react-redux';
import RecipientValidationPage, { RecipientValidationPageSRV } from './RecipientValidationPage';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';

const RVPageContainer = props =>
  props.isStandAloneRVSet ? (
    <RecipientValidationPageSRV {...props} />
  ) : (
    <RecipientValidationPage {...props} />
  );

const mapStateToProps = state => {
  return {
    isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
  };
};

export default connect(mapStateToProps, null)(RVPageContainer);
