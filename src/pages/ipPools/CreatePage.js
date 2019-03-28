import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Page } from '@sparkpost/matchbox';
import { ApiErrorBanner, Loading } from 'src/components';
import PoolForm from './components/PoolForm';

import { showAlert } from 'src/actions/globalAlert';
import { createPool, listPools } from 'src/actions/ipPools';


const breadcrumbAction = {
  content: 'IP Pools',
  Component: Link,
  to: '/account/ip-pools'
};

export class CreatePage extends Component {
  loadDependentData = () => {
    this.props.listPools();
  };

  componentDidMount() {
    this.loadDependentData();
  }

  createPool = (values) => {
    const { createPool, showAlert, history } = this.props;

    return createPool(values).then(() => {
      showAlert({
        type: 'success',
        message: `Created IP pool ${values.name}.`
      });
      history.push('/account/ip-pools');
    });
  };

  renderError() {
    const { listError } = this.props;
    return <ApiErrorBanner
      errorDetails={listError.message}
      message="Sorry, we seem to have had some trouble loading your IP pool."
      reload={this.loadDependentData}
    />;
  }

  render() {
    const { loading, listError } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (listError) {
      return this.renderError();
    }

    return (
      <Page title="Create IP Pool" breadcrumbAction={breadcrumbAction}>
        <PoolForm onSubmit={this.createPool} isNew={true} />
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => ({
  listError: state.ipPools.listError,
  loading: state.ipPools.listLoading
});

export default connect(mapStateToProps, {
  createPool,
  listPools,
  showAlert
})(CreatePage);
