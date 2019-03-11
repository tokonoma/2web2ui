import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { LabelledValue } from 'src/components';
import {
  getIpFormInitialValues,
  getReAssignPoolsOptions,
  selectCurrentPool,
  selectIpForCurrentPool
} from 'src/selectors/ipPools';

export class IPForm extends Component {
  render() {
    const { currentIp, reAssignPoolsOptions, handleSubmit, submitting, pristine } = this.props;

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
                name='ip_pool'
                component={SelectWrapper}
                options={reAssignPoolsOptions}
                disabled={submitting}
              />
            </LabelledValue>
          </Panel.Section>

          <Panel.Section>
            <Button submit primary disabled={submitting || pristine}>
              {submitting ? 'Saving' : 'Update Sending IP'}
            </Button>
          </Panel.Section>
        </form>
      </Panel>
    );
  }
}

const formName = 'ipForm';
const mapStateToProps = (state, props) => ({
  currentPool: selectCurrentPool(state),
  currentIp: selectIpForCurrentPool(state, props),
  reAssignPoolsOptions: getReAssignPoolsOptions(state, props),
  initialValues: getIpFormInitialValues(state, props)
});

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const IPReduxForm = reduxForm(formOptions)(IPForm);
export default withRouter(connect(mapStateToProps)(IPReduxForm));
