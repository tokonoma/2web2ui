import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Panel, Button, UnstyledLink } from '@sparkpost/matchbox';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { TableCollection, LabelledValue } from 'src/components';
import AccessControl from 'src/components/auth/AccessControl';
import { required } from 'src/helpers/validation';
import { configFlag } from 'src/helpers/conditions/config';
import { TextFieldWrapper, SendingDomainTypeaheadWrapper } from 'src/components';
import { selectIpPoolFormInitialValues, selectIpsForCurrentPool, shouldShowIpPurchaseCTA } from 'src/selectors/ipPools';
import isDefaultPool from '../helpers/defaultPool';
import { CheckboxWrapper, RadioGroup } from '../../../components/reduxFormWrappers';


const columns = ['Sending IP', 'Hostname'];

export class PoolForm extends Component {
  poolSelect = (ip, poolOptions, submitting) => (<Field
    name={ip.id}
    component={SelectWrapper}
    options={poolOptions}
    disabled={submitting}/>
  );

  getRowData = (poolOptions, ip) => {
    const { submitting, pool } = this.props;
    const ipLink = <Link to={`/account/ip-pools/edit/${pool.id}/ip/${ip.external_ip}`}>{ip.external_ip}</Link>;
    console.log(ipLink);
    return [
      ipLink,
      ip.hostname
      // this.poolSelect(ip, poolOptions, submitting)
    ];
  }

  renderCollection() {
    const { isNew, ips, list, pool: currentPool, showPurchaseCTA } = this.props;
    const poolOptions = list.map((pool) => ({
      value: pool.id,
      label: (pool.id === currentPool.id) ? '-- Change Pool --' : `${pool.name} (${pool.id})`
    }));
    const getRowDataFunc = this.getRowData.bind(this, poolOptions);

    // New pools have no IPs
    if (isNew) {
      return null;
    }

    // Loading
    if (!ips) {
      return null;
    }

    const purchaseCTA = showPurchaseCTA
      ? <Fragment>, or by <UnstyledLink to="/account/billing" component={Link}>purchasing new IPs</UnstyledLink></Fragment>
      : null;

    return (
      <Fragment>
        <Panel.Section>
          <p>
            Add dedicated IPs to this pool by moving them from their current pool{purchaseCTA}.
          </p>
        </Panel.Section>
        <TableCollection
          columns={columns}
          rows={ips}
          getRowData={getRowDataFunc}
          pagination={false}
        />
      </Fragment>
    );
  }

  render() {
    const { isNew, pool = {}, ip, list, handleSubmit, currentPool = {}, submitting, pristine } = this.props;
    const editingDefault = !isNew && isDefaultPool(pool.id);
    const helpText = editingDefault ? 'You cannot change the default IP pool\'s name' : '';
    const poolOptions = list.map((pool) => ({
      value: pool.id,
      label: (pool.id === currentPool.id) ? '-- Change Pool --' : `${pool.name} (${pool.id})`
    }));

    const stageOptions = _.map(_.range(20), (i) => ({ value: `stage${i + 1}`, label: `Stage ${i + 1} (${(i + 1) * 200})/day)`, disabled: i > 10 }));

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
                name={ip.id}
                component={SelectWrapper}
                options={poolOptions}
                // disabled={submitting}
              />
            </LabelledValue>
          </Panel.Section>
          <Panel.Section actions={[{ content: 'What is Auto Warmup', onClick: _.noop, color: 'orange' }]}>
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
                options={poolOptions}
                // disabled={submitting}
                helpText="Overflow pool will be used when stage threshold for this IP has been met. Learn more about Overflow Pool."
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

const mapStateToProps = (state, props) => {
  const { ipPools } = state;
  const { pool, list = []} = ipPools;

  return {
    ip: { external_ip: '111.111.24.8', id: 101, hostname: 'host1.mydomain.com' },
    list,
    pool,
    ips: selectIpsForCurrentPool(state),
    initialValues: selectIpPoolFormInitialValues(state, props),
    showPurchaseCTA: shouldShowIpPurchaseCTA(state)
  };
};

const formOptions = {
  form: 'poolForm',
  enableReinitialize: true
};

const PoolReduxForm = reduxForm(formOptions)(PoolForm);
export default connect(mapStateToProps, {})(PoolReduxForm);
