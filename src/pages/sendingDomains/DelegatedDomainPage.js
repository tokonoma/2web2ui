import React from 'react';
import { connect } from 'react-redux';
import { list } from 'src/actions/delegatedDomains';
import { Page } from '@sparkpost/matchbox';

const DelegatedDomainPage = ({ delegatedDomains, list }) => {
  React.useEffect(() => {
    list();
  }, [list]);

  return <Page title="Delgated Sending Domains">My Body</Page>;
};

export default connect(state => ({ delegatedDomains: state.delegatedDomains }), { list })(
  DelegatedDomainPage,
);
