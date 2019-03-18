import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel, UnstyledLink } from '@sparkpost/matchbox';
import { SelectWrapper, CheckboxWrapper } from 'src/components/reduxFormWrappers';
import { LabelledValue, ConfirmationModal } from 'src/components';
import {
  selectIpFormInitialValues,
  getIpPools,
  selectCurrentPool,
  selectIpForCurrentPool
} from 'src/selectors/ipPools';

export class IpForm extends Component {
  state = {
    warningModal: false
  }
  revertAutoWarmupToggling = () => {
    const { change, ipAutoWarmupEnabled } = this.props;
    ipAutoWarmupEnabled ? change('auto_warmup_enabled', false) : change('auto_warmup_enabled', true);
    this.setState({ warningModal: false });
  };

  render() {
    const { ip, pool, pools, ipAutoWarmupEnabled, handleSubmit, submitting, pristine } = this.props;
    const reAssignPoolsOptions = pools.map((currentPool) => ({
      value: currentPool.id,
      label: (currentPool.id === pool.id) ? '-- Select a new pool --' : `${currentPool.name} (${currentPool.id})`
    }));

    const confirmationModalText = ipAutoWarmupEnabled
      ? 'Enabling Auto IP Warmup will limit the amount of traffic that is able to be sent over this IP based on the warmup stage. Additional traffic will be distributed amongst other IPs in the same pool or the designated overflow pool.'
      : 'Disabling Auto IP Warmup will remove the volume restrictions from this IP, if this IP is not properly warmed, this can have negative consequences on deliverability and sender reputation.';

    const stageOptions = _.map(_.range(20), (i) => ({
      value: i + 1,
      label: `Stage ${i + 1}`,
      disabled: i >= (ip.auto_warmup_stage || 1)
    }));

    return (
      <Panel>
        <form onSubmit={handleSubmit}>
          <Panel.Section>
            <LabelledValue label='Hostname'>
              <p>{ip.hostname}</p>
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

          <Panel.Section actions={[{ content: <UnstyledLink to="https://www.sparkpost.com/docs/deliverability/ip-warm-up-overview/" external>What is Auto Warmup?</UnstyledLink>, onClick: _.noop, color: 'orange' }]}>
            <LabelledValue label='Auto IP Warmup'>
              <Field
                name="auto_warmup_enabled"
                component={CheckboxWrapper}
                onChange={() => {
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
                  parse={(value) => _.toInteger(value)}
                  helpText="You can select an previous stage but can not select an advanced stage."
                  disabled={submitting}
                />
              </LabelledValue>
            </Fragment>
            }
          </Panel.Section>

          <Panel.Section>
            <Button submit primary disabled={submitting || pristine}>
              {submitting ? 'Saving' : 'Update Sending IP'}
            </Button>
          </Panel.Section>
        </form>

        <ConfirmationModal
          open={this.state.warningModal}
          title={`Are you sure you want to ${ipAutoWarmupEnabled ? 'enable' : 'disable'} Auto IP Warmup?`}
          content={<p>{confirmationModalText}</p>}
          onCancel={this.revertAutoWarmupToggling}
          onConfirm={() => this.setState({ warningModal: false })}
          confirmVerb={ipAutoWarmupEnabled ? 'Yes, I want to turn ON Auto IP Warmup' : 'Yes, I want to turn OFF Auto IP Warmup'}
        />
      </Panel>
    );
  }
}

IpForm.defaultProps = {
  pools: [],
  pool: {},
  ip: {}
};

const formName = 'ipForm';
const valueSelector = formValueSelector(formName);
const mapStateToProps = (state, props) => ({
  pool: selectCurrentPool(state, props),
  ip: selectIpForCurrentPool(state, props),
  pools: getIpPools(state, props),
  initialValues: selectIpFormInitialValues(state, props),
  ipAutoWarmupEnabled: valueSelector(state, 'auto_warmup_enabled')

});

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const connectedForm = withRouter(connect(mapStateToProps)(reduxForm(formOptions)(IpForm)));
connectedForm.displayName = 'IpForm';
export default connectedForm;
