import React from 'react';
import { UploadedListPageSRV } from './UploadedListPage';
import { withRouter } from 'react-router-dom';

const UploadedListPageContainer = props => <UploadedListPageSRV {...props} />;

export default withRouter(UploadedListPageContainer);
