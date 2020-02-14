import React from 'react';
import { connect } from 'react-redux';
import UploadedListPage, { UploadedListPageSRV } from './UploadedListPage';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { withRouter } from 'react-router-dom';

const UploadedListPageContainer = props =>
  props.isStandAloneRVSet ? <UploadedListPageSRV {...props} /> : <UploadedListPage {...props} />;

const mapStateToProps = state => {
  return {
    isStandAloneRVSet: isAccountUiOptionSet('standalone_rv')(state),
  };
};

export default withRouter(connect(mapStateToProps, null)(UploadedListPageContainer));
