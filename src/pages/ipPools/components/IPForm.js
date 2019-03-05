import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Button, Panel } from "@sparkpost/matchbox";
import { SelectWrapper } from "src/components/reduxFormWrappers";
import { LabelledValue } from "src/components";
import { getOverflowPoolsOptions, getReAssignPoolsOptions, getStageOptions } from "src/selectors/ipPools";
import { CheckboxWrapper } from "../../../components/reduxFormWrappers";


const columns = ["Sending IP", "Hostname"];

export class PoolForm extends Component {
  getRowData = (poolOptions, ip) => {
    const { submitting, currentPool } = this.props;
    const ipLink = <Link to={`/account/ip-pools/edit/${pool.id}/ip/${ip.external_ip}`}>{ip.external_ip}</Link>;
    return [
      ipLink,
      ip.hostname
    ];
  };

  render() {
    const { currentIp, overflowPoolsOptions, reAssignPoolsOptions, stageOptions, handleSubmit, currentPool, submitting, pristine } = this.props;

    return (
      <Panel>
        <form onSubmit={handleSubmit}>
          <Panel.Section>
            <LabelledValue label='Hostname'>
              <p>{currentIp.hostname}</p>
            </LabelledValue>
          </Panel.Section>
          <Panel.Section>
            <LabelledValue label='Reassign Pool'>
              <Field
                name={currentIp.external_ip}
                component={SelectWrapper}
                options={reAssignPoolsOptions}
                // disabled={submitting}
              />
            </LabelledValue>
          </Panel.Section>
          <Panel.Section actions={[{ content: "What is Auto Warmup", onClick: _.noop, color: "orange" }]}>
            <LabelledValue label='Auto IP Warmup'>
              <Field
                name="autowarmup"
                component={CheckboxWrapper}
                type="checkbox"
                label="Enable"
                helpText="If you disable auto warmup, this, this and that will happen to your campaign."
              />
            </LabelledValue>
            <LabelledValue label='Warmup Stage'>
              <Field
                name='warmup_stage'
                component={SelectWrapper}
                options={stageOptions}
                helpText="You can select an earlier stage but can not select an advanced stage."
                // disabled={submitting}
              />
            </LabelledValue>
            <LabelledValue label='Overflow Pool'>
              <Field
                name='overflow_pool'
                component={SelectWrapper}
                options={overflowPoolsOptions}
                // disabled={submitting}
                helpText="Overflow pool will be used when stage threshold for this IP has been met. Learn more about Overflow Pool."
              />
            </LabelledValue>
          </Panel.Section>


          <Panel.Section>
            <Button submit primary disabled={submitting || pristine}>
              {submitting ? "Saving" : "Update Sending IP"}
            </Button>
          </Panel.Section>
        </form>
      </Panel>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    reAssignPoolsOptions: getReAssignPoolsOptions(state, props),
    overflowPoolsOptions: getOverflowPoolsOptions(state, props),
    stageOptions: getStageOptions(state, props)
  };
};

const formOptions = {
  form: "ipForm",
  enableReinitialize: true
};

const PoolReduxForm = reduxForm(formOptions)(PoolForm);
export default connect(mapStateToProps, {})(PoolReduxForm);
