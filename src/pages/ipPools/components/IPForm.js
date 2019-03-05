import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { ConfirmationModal, LabelledValue } from 'src/components';
import { getOverflowPoolsOptions, getReAssignPoolsOptions, getStageOptions, getIpInitialValues } from 'src/selectors/ipPools';
import { CheckboxWrapper } from '../../../components/reduxFormWrappers';


const columns = ['Sending IP', 'Hostname'];
const formName = 'ipForm';

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

  enableAutoWarmup = () => {
    const { change } = this.props;

    change('auto_warmup_enabled', true);
    this.setState({ warningModal: false });
  };

  componentWillReceiveProps(nextProps) {
    const { warningModal } = this.state;
    if (this.props.ipAutoWarmupEnabled && !nextProps.ipAutoWarmupEnabled) { //attempted to disable warmup
      this.setState({ warningModal: true });
    }
  }

  render() {
    const { currentIp, overflowPoolsOptions, reAssignPoolsOptions, stageOptions, handleSubmit, currentPool, ipAutoWarmupState, submitting, pristine, ipAutoWarmupEnabled } = this.props;

    const autoWarmupDisableWarning = ipAutoWarmupEnabled
      ? 'If you disable auto warmup, this, this and that will happen to your campaign.'
      : '';

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
                disabled={submitting}
              />
            </LabelledValue>
          </Panel.Section>
          <Panel.Section actions={[{ content: 'What is Auto Warmup', onClick: _.noop, color: 'orange' }]}>
            <LabelledValue label='Auto IP Warmup'>
              <Field
                name="auto_warmup_enabled"
                component={CheckboxWrapper}
                type="checkbox"
                label="Enable"
                helpText={autoWarmupDisableWarning}
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
                  helpText="You can select an earlier stage but can not select an advanced stage."
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
              {submitting ? 'Saving' : 'Update Sending IP'}
            </Button>
          </Panel.Section>
        </form>

        <ConfirmationModal
          open={this.state.warningModal}
          title='Are you sure you want to disable auto IP Warmup?'
          content={<p>Disabling auto warmup has some severe consequences to your email deliverabilities.</p>}
          onCancel={this.enableAutoWarmup}
          onConfirm={() => this.setState({ warningModal: false })}
          confirmVerb='Disable'
        />
      </Panel>
    );
  }
}

const valueSelector = formValueSelector(formName);

const mapStateToProps = (state, props) => {
  const { currentIp } = props;
  return {
    reAssignPoolsOptions: getReAssignPoolsOptions(state, props),
    overflowPoolsOptions: getOverflowPoolsOptions(state, props),
    stageOptions: getStageOptions(state, props),
    ipAutoWarmupEnabled: valueSelector(state, 'auto_warmup_enabled'),
    initialValues: getIpInitialValues(state, props)
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const PoolReduxForm = reduxForm(formOptions)(PoolForm);
export default withRouter(connect(mapStateToProps, {})(PoolReduxForm));
