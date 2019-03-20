import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, formValueSelector, getFormValues, reduxForm, submit } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { CheckboxWrapper, SelectWrapper } from 'src/components/reduxFormWrappers';
import { ConfirmationModal, LabelledValue } from 'src/components';
import AccessControl from 'src/components/auth/AccessControl';
import { IP_WARMUP_STAGES } from '../constants';
import {
  getIpPools,
  selectCurrentPool,
  selectIpForCurrentPool,
  selectIpFormInitialValues
} from 'src/selectors/ipPools';
import { configFlag } from '../../../helpers/conditions/config';


export class IpForm extends Component {
  state = {
    confirmationModal: false
  }

  submitForm = () => {
    const { submit } = this.props;
    return submit(formName);
  };

  confirmAndSubmit = () => {
    const { isAutoWarmupEnabled, ip } = this.props;
    const isEnabling = isAutoWarmupEnabled && !ip.auto_warmup_enabled;
    const isDisabling = !isAutoWarmupEnabled && ip.auto_warmup_enabled;
    if (isEnabling || isDisabling) {
      this.setState({ confirmationModal: true });
      return false;
    } else {
      return this.submitForm();
    }
  }

  render() {
    const { ip, pool, pools, isAutoWarmupEnabled, handleSubmit, submitting, pristine } = this.props;
    const reAssignPoolsOptions = pools.map((currentPool) => ({
      value: currentPool.id,
      label: (currentPool.id === pool.id) ? '-- Select a new pool --' : `${currentPool.name} (${currentPool.id})`
    }));

    const confirmationModalText = isAutoWarmupEnabled
      ? 'Enabling Auto IP Warmup will limit the amount of traffic that you can send over this IP based on the warmup stage. Remaining traffic will be distributed amongst other IPs in the same pool or the designated overflow pool.'
      : 'Disabling Auto IP Warmup will remove the volume restrictions from this IP. If this IP is not properly warmed, this can have negative consequences on your deliverability and sender reputation.';

    const stageOptions = IP_WARMUP_STAGES.map((stage) => ({
      label: `${stage.name} (Volume: ${stage.volume})`,
      value: stage.id,
      disabled: stage.id > (ip.auto_warmup_stage || 1)
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
          <AccessControl condition={configFlag('featureFlags.ip_auto_warmup')}>
            <Panel.Section actions={[{ content: 'What is Auto Warmup?', to: 'https://www.sparkpost.com/docs/deliverability/ip-warm-up-overview/', external: true, color: 'orange' }]}>
              <LabelledValue label='Auto IP Warmup'>
                <Field
                  name="auto_warmup_enabled"
                  component={CheckboxWrapper}
                  type="checkbox"
                  label="Enable"
                  disabled={submitting}
                />
              </LabelledValue>
              {isAutoWarmupEnabled &&
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
          </AccessControl>
          <Panel.Section>
            <Button primary disabled={submitting || pristine} onClick={this.confirmAndSubmit}>
              {submitting ? 'Saving' : 'Update Sending IP'}
            </Button>
          </Panel.Section>
        </form>

        <ConfirmationModal
          open={this.state.confirmationModal}
          title={`Are you sure you want to ${isAutoWarmupEnabled ? 'enable' : 'disable'} Auto IP Warmup?`}
          content={<p>{confirmationModalText}</p>}
          onCancel={() => this.setState({ confirmationModal: false })}
          onConfirm={() => this.setState({ confirmationModal: false }, this.submitForm)}
          confirmVerb={isAutoWarmupEnabled ? 'Yes, I want to turn ON Auto IP Warmup' : 'Yes, I want to turn OFF Auto IP Warmup'}
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
  isAutoWarmupEnabled: valueSelector(state, 'auto_warmup_enabled'),
  formValues: getFormValues(formName)(state)
});

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const connectedForm = withRouter(connect(mapStateToProps, { submit })(reduxForm(formOptions)(IpForm)));
connectedForm.displayName = 'IpForm';
export default connectedForm;
