import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { LabelledValue } from 'src/components';
import {
  getIpFormInitialValues,
  getReAssignPoolsOptions,
  selectCurrentPool,
  selectIpForCurrentPool
} from 'src/selectors/ipPools';

const columns = ['Sending IP', 'Hostname'];
const formName = 'ipForm';

export class IPForm extends Component {
  getRowData = (poolOptions, ip) => {
    const { submitting, currentPool } = this.props;
    const ipLink = <Link to={`/account/ip-pools/edit/${pool.id}/ip/${ip.external_ip}`}>{ip.external_ip}</Link>;
    return [
      ipLink,
      ip.hostname
    ];
  };

  render() {
    const { currentIp, reAssignPoolsOptions, handleSubmit, currentPool, submitting, pristine } = this.props;

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

const valueSelector = formValueSelector(formName);

const mapStateToProps = (state, props) => {
  const { currentIp } = props;
  return {
    currentPool: selectCurrentPool(state),
    currentIp: selectIpForCurrentPool(state, props),
    reAssignPoolsOptions: getReAssignPoolsOptions(state, props),
    initialValues: getIpFormInitialValues(state, props)
  };
};

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const IPReduxForm = reduxForm(formOptions)(IPForm);
export default withRouter(connect(mapStateToProps, {})(IPReduxForm));
