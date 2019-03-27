import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { Button, Panel } from '@sparkpost/matchbox';
import { SendingDomainTypeaheadWrapper, TextFieldWrapper } from 'src/components';
import AccessControl from 'src/components/auth/AccessControl';
import { required } from 'src/helpers/validation';
import { configFlag } from 'src/helpers/conditions/config';
import { isAccountUiOptionSet } from 'src/helpers/conditions/account';
import { selectCurrentPool } from 'src/selectors/ipPools';
import isDefaultPool from '../helpers/defaultPool';
import { SelectWrapper } from '../../../components/reduxFormWrappers';
import { getIpPools } from '../../../selectors/ipPools';

export class PoolForm extends Component {
  getOverflowPoolOptions = () => {
    const { pools, pool } = this.props;

    const overflowPools = _.compact(pools.map((currentPool) => {
      if (!currentPool.ips.length || currentPool.id === pool.id) {
        return null;
      }

      return {
        label: `${currentPool.name} (${currentPool.id})`,
        value: currentPool.id
      };
    }));

    overflowPools.unshift({ label: 'Select an Overflow Pool', value: '' });
    return overflowPools;
  }

  render() {
    const { isNew, pool, handleSubmit, submitting, pristine } = this.props;
    const submitText = isNew ? 'Create IP Pool' : 'Update IP Pool';
    const editingDefault = !isNew && isDefaultPool(pool.id);
    const helpText = editingDefault ? 'You cannot change the default IP pool\'s name' : '';

    const overflowPools = this.getOverflowPoolOptions();

    return (
      <Panel>
        <form onSubmit={handleSubmit}>
          <Panel.Section>
            <Field
              name='name'
              component={TextFieldWrapper}
              validate={required}
              label='Pool Name'
              placeholder='My IP Pool'
              disabled={editingDefault || submitting}
              helpText={helpText}
            />

            {!editingDefault &&
              <AccessControl condition={configFlag('featureFlags.allow_default_signing_domains_for_ip_pools')}>
                <Field
                  name="signing_domain"
                  component={SendingDomainTypeaheadWrapper}
                  label="Default Signing Domain"
                  disabled={submitting}
                />
              </AccessControl>
            }

            {!editingDefault && overflowPools.length > 1 &&
              <AccessControl condition={isAccountUiOptionSet('ip_auto_warmup', false)}>
                <Field
                  name='auto_warmup_overflow_pool'
                  label='Overflow Pool'
                  component={SelectWrapper}
                  options={overflowPools}
                  helpText='With automatic IP Warmup enabled, selected pool will be used when volume threshold for this pool has been reached.'
                  disabled={submitting}
                />
              </AccessControl>
            }
          </Panel.Section>
          <Panel.Section>
            <Button submit primary disabled={submitting || pristine}>
              {submitting ? 'Saving' : submitText}
            </Button>
          </Panel.Section>
        </form>
      </Panel>
    );
  }
}

PoolForm.defaultProps = {
  pool: {},
  pools: []
};

const mapStateToProps = (state, props) => {
  const pool = selectCurrentPool(state, props);
  return {
    pool,
    pools: getIpPools(state, props),
    initialValues: {
      ...pool
    }
  };
};

const formOptions = {
  form: 'poolForm',
  enableReinitialize: true
};

const PoolReduxForm = reduxForm(formOptions)(PoolForm);
export default withRouter(connect(mapStateToProps, {})(PoolReduxForm));
