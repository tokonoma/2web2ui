import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Page } from "@sparkpost/matchbox";

import { ApiErrorBanner, Loading } from "src/components";
import IPForm from "./components/IPForm";
import { showAlert } from "src/actions/globalAlert";
import { getPool, listPools, updatePool } from "src/actions/ipPools";
import { updateSendingIp } from "src/actions/sendingIps";
import { selectCurrentPool, selectIpForCurrentPool } from "src/selectors/ipPools";

import { decodeIp } from "src/helpers/ipNames";
import isDefaultPool from "./helpers/defaultPool";


export class EditIPPage extends Component {
  state = {
    showDelete: false
  };

  toggleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete });
  };

  onUpdateIp = (values) => {
    const { updateSendingIp, updatePool, showAlert, history, match: { params: { id } } } = this.props;

    console.log(values);

    debugger;
    // return Promise.all([]);
    /**
     * Pick out the IPs whose pool assignment is not the current pool ergo
     * have been reassigned by the user.
     */
    const changedIpKeys = Object.keys(values).filter((key) =>
      key !== "name" && key !== "signing_domain" && values[key] !== id);

    // if signing_domain is not set, then we want to clear it out to empty string.
    values.signing_domain = values.signing_domain || "";

    // Update each changed sending IP
    return Promise.all(changedIpKeys.map((ipKey) =>
      updateSendingIp(decodeIp(ipKey), values[ipKey])))
      .then(() => {
        // Update the pool itself
        if (!isDefaultPool(id)) {
          return updatePool(id, values);
        }
      })
      .then((res) => {
        showAlert({
          type: "success",
          message: `Updated IP pool ${id}.`
        });
        history.push("/account/ip-pools");
      });
  };

  loadDependentData = () => {
    this.props.listPools();
    this.props.getPool(this.props.match.params.id);
  };

  componentDidMount() {
    this.loadDependentData();
  }

  renderError() {
    const { listError, getError } = this.props;
    const msg = listError ? listError.message : getError.message;
    return <ApiErrorBanner
      errorDetails={msg}
      message="Sorry, we seem to have had some trouble loading your IP pool."
      reload={this.loadDependantData}
    />;
  }

  renderForm() {
    const { error, currentIp, currentPool } = this.props;
    if (error) {
      return this.renderError();
    }

    return <IPForm onSubmit={this.onUpdateIp}/>;
  }

  render() {
    const { loading, currentPool, currentIp } = this.props;

    if (loading || !currentIp) {
      return <Loading/>;
    }

    const breadcrumbAction = {
      content: currentPool.name,
      Component: Link,
      to: `/account/ip-pools/edit/${currentPool.id}`
    };

    return (
      <Page
        title={`Sending IP: ${currentIp.external_ip}`}
        breadcrumbAction={breadcrumbAction}
      >
        {this.renderForm()}
      </Page>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { getLoading, getError, listLoading, listError } = state.ipPools;

  return {
    currentIp: selectIpForCurrentPool(state, props),
    currentPool: selectCurrentPool(state),
    loading: getLoading || listLoading,
    error: listError || getError,
    listError,
    getError
  };
};

export default withRouter(connect(mapStateToProps, {
  updatePool,
  getPool,
  listPools,
  updateSendingIp,
  showAlert
})(EditIPPage));
