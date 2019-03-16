import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { LabelledValue } from 'src/components';
import {
  selectIpFormInitialValues,
  getIpPools,
  selectCurrentPool,
  selectIpForCurrentPool
} from 'src/selectors/ipPools';

export class IpForm extends Component {
  render() {
    const { ip, pool, pools, handleSubmit, submitting, pristine } = this.props;
    const reAssignPoolsOptions = pools.map((currentPool) => ({
      value: currentPool.id,
      label: (currentPool.id === pool.id) ? '-- Select a new pool --' : `${currentPool.name} (${currentPool.id})`
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

IpForm.defaultProps = {
  pools: [],
  pool: {},
  ip: {}
};

const formName = 'ipForm';
const mapStateToProps = (state, props) => ({
  pool: selectCurrentPool(state, props),
  ip: selectIpForCurrentPool(state, props),
  pools: getIpPools(state, props),
  initialValues: selectIpFormInitialValues(state, props)
});

const formOptions = {
  form: formName,
  enableReinitialize: true
};

const connectedForm = withRouter(connect(mapStateToProps)(reduxForm(formOptions)(IpForm)));
connectedForm.displayName = 'IpForm';
export default connectedForm;
