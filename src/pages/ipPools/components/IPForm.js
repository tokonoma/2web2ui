import React, { Component, Fragment } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { Button, Panel } from "@sparkpost/matchbox";
import { SelectWrapper } from "src/components/reduxFormWrappers";
import { ConfirmationModal, LabelledValue } from "src/components";
import {
  getIpInitialValues,
  getOverflowPoolsOptions,
  getReAssignPoolsOptions,
  getStageOptions,
  selectCurrentPool,
  selectIpForCurrentPool
} from "src/selectors/ipPools";
import { CheckboxWrapper } from "../../../components/reduxFormWrappers";


const columns = ["Sending IP", "Hostname"];
const formName = "ipForm";

export class PoolForm extends Component {
  state = {
    warningModal: false
  };

  getRowData = (poolOptions, ip) => {
    const { submitting, currentPool } = this.props;
    const ipLink = <Link to={`/account/ip-pools/edit/${pool.id}/ip/${ip.external_ip}`}>{ip.external_ip}</Link>;
    return [
      ipLink,
      ip.hostname
    ];
  };

  handleModalCancel = () => {
    const { change, ipAutoWarmupEnabled } = this.props;
    //revert the last action
    ipAutoWarmupEnabled ? change("auto_warmup_enabled", false) : change("auto_warmup_enabled", true);
    this.setState({ warningModal: false });
  };

  handleModalConfirm = () => {
    this.setState({ warningModal: false });
  };

  render() {
    const { currentIp, overflowPoolsOptions, reAssignPoolsOptions, stageOptions, handleSubmit, currentPool, ipAutoWarmupState, submitting, pristine, ipAutoWarmupEnabled } = this.props;

    const confirmationModalText = ipAutoWarmupEnabled
      ? "Enabling Auto IP Warmup will limit the amount of traffic that is able to be sent over this IP based on the warmup stage. Additional traffic will be distributed amongst other IPs in the same pool or the designated overflow pool."
      : "Disabling Auto IP Warmup will remove the volume restrictions from this IP, if this IP is not properly warmed, this can have negative consequences on deliverability and sender reputation.";


    return (
      <Panel>
        <form onSubmit={handleSubmit(this.props.onSubmit)}>
          <Panel.Section>
            <LabelledValue label='Hostname'>
              <p>{currentIp.hostname}</p>
            </LabelledValue>
          </Panel.Section>
          <Panel.Section>
            <LabelledValue label='Reassign Pool'>
              <Field
                name='ip_pool'
                component={SelectWrapper}
                options={reAssignPoolsOptions}
                disabled={submitting}
              />
            </LabelledValue>
          </Panel.Section>
          <Panel.Section actions={[{ content: "What is Auto Warmup", onClick: _.noop, color: "orange" }]}>
            <LabelledValue label='Auto IP Warmup'>
              <Field
                name="auto_warmup_enabled"
                component={CheckboxWrapper}
                onChange={() => {
                  console.log("hi");
                  this.setState({ warningModal: true });
                }}
                type="checkbox"
                label="Enable"
                disabled={submitting}
              />
            </LabelledValue>
            {ipAutoWarmupEnabled &&
            <Fragment>
              <LabelledValue label='Warmup Stage'>
                <Field
                  name='auto_warmup_stage'
                  component={SelectWrapper}
                  options={stageOptions}
                  helpText="You can select an previous stage but can not select an advanced stage."
                  disabled={submitting}
                />
              </LabelledValue>
              <LabelledValue label='Overflow Pool'>
                <Field
                  name='auto_warmup_overflow_pool'
                  component={SelectWrapper}
                  options={overflowPoolsOptions}
                  disabled={submitting}
                  helpText="Overflow pool will be used when stage threshold for this IP has been met. Learn more about Overflow Pool."
                />
              </LabelledValue>
            </Fragment>
            }
          </Panel.Section>


          <Panel.Section>
            <Button submit primary disabled={submitting || pristine}>
              {submitting ? "Saving" : "Update Sending IP"}
            </Button>
          </Panel.Section>
        </form>

        <ConfirmationModal
          open={this.state.warningModal}
          title={`Are you sure you want to ${ipAutoWarmupEnabled ? "enable" : "disable"} Auto IP Warmup?`}
          content={<p>{confirmationModalText}</p>}
          onCancel={this.handleModalCancel}
          onConfirm={this.handleModalConfirm}
          confirmVerb={ipAutoWarmupEnabled ? "Yes, I want to turn ON Auto IP Warmup" : "Yes, I want to turn OFF Auto IP Warmup"}
        />
      </Panel>
    );
  }
}

const valueSelector = formValueSelector(formName);

const mapStateToProps = (state, props) => {
  const { currentIp } = props;
  return {
    currentPool: selectCurrentPool(state),
    currentIp: selectIpForCurrentPool(state, props),
    reAssignPoolsOptions: getReAssignPoolsOptions(state, props),
    overflowPoolsOptions: getOverflowPoolsOptions(state, props),
    stageOptions: getStageOptions(state, props),
    ipAutoWarmupEnabled: valueSelector(state, "auto_warmup_enabled"),
    initialValues: getIpInitialValues(state, props)
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const PoolReduxForm = reduxForm(formOptions)(PoolForm);
export default withRouter(connect(mapStateToProps, {})(PoolReduxForm));
