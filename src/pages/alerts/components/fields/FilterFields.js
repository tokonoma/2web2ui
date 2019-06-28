import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, change } from 'redux-form';
import { SelectWrapper } from 'src/components/reduxFormWrappers';
import { getFormSpec } from '../../helpers/alertForm';
import _ from 'lodash';
import { MAILBOX_PROVIDERS } from 'src/constants';
import { ComboBoxTypeaheadWrapper } from 'src/components';
import { Grid } from '@sparkpost/matchbox';
import { getIpPools } from 'src/selectors/ipPools';
import { selectVerifiedDomains } from 'src/selectors/sendingDomains';
import { FORM_NAME } from '../../constants/formConstants';
import { listPools } from 'src/actions/ipPools';
import { list as listSendingDomains } from 'src/actions/sendingDomains';
import { list as listSendingIps } from 'src/actions/sendingIps';
import styles from '../AlertForm.module.scss';

const mbItemToString = (item) => MAILBOX_PROVIDERS[item] || '';

export class FilterFields extends Component {

  componentDidMount() {
    const { listPools, listSendingDomains, listSendingIps } = this.props;
    listPools();
    listSendingDomains();
    listSendingIps();
  }

  resetSingleFilterValue = () => {
    this.props.change(FORM_NAME, 'single_filter.filter_values', []);
  };

  render() {
    const {
      metric,
      single_filter,
      ipPools,
      ipPoolLoading,
      sendingDomains,
      sendingDomainsLoading,
      sendingIps,
      disabled
    } = this.props;

    const formSpec = getFormSpec(metric);

    const filterTypeaheadResults = {
      ip_pool: _.map(ipPools, 'id'),
      mailbox_provider: _.keys(MAILBOX_PROVIDERS),
      sending_domain: _.map(sendingDomains, 'domain'),
      sending_ip: _.map(sendingIps, 'external_ip')
    };

    const extraProps = {
      none: {
        disabled: true,
        placeholder: 'No facet type selected'
      },
      ip_pool: {
        disabled: disabled || ipPoolLoading || (ipPools.length === 0),
        placeholder: ipPoolLoading
          ? 'Loading your IP Pools...'
          : (ipPools.length === 0) ? 'No Options Available' : 'Type To Search'
      },
      mailbox_provider: {
        disabled: disabled,
        itemToString: mbItemToString,
        placeholder: 'Type To Search'
      },
      sending_domain: {
        disabled: disabled || sendingDomainsLoading || (sendingDomains.length === 0),
        placeholder: sendingDomainsLoading
          ? 'Loading your Sending Domains...'
          : (sendingDomains.length === 0) ? 'No Options Available' : 'Type To Search'
      },
      sending_ip: {
        disabled: disabled || (sendingIps.length === 0),
        placeholder: (sendingIps.length === 0) ? 'No Options Available' : 'Type To Search'
      }
    };

    const renderSingleFilter = () => (
      <Grid>
        <Grid.Column sm={12} md={3} lg={3}>
          <Field
            name='single_filter.filter_type'
            component={SelectWrapper}
            options={formSpec.filterOptions}
            disabled={disabled}
            onChange={this.resetSingleFilterValue}
            label='Facet'
          />
        </Grid.Column>
        <Grid.Column sm={12} md={9} lg={9}>
          <div className={styles.SingleFilter}>
            <Field
              name='single_filter.filter_values'
              component={ComboBoxTypeaheadWrapper}
              results={filterTypeaheadResults[single_filter.filter_type] || []}
              type={single_filter.filter_type}
              {...extraProps[single_filter.filter_type]}
            />
          </div>
        </Grid.Column>
      </Grid>);

    const renderMultiFilters = () => (
      formSpec.filterOptions.map(({ label, value }) =>
        (<Field
          key={value}
          name={value}
          component={ComboBoxTypeaheadWrapper}
          results={filterTypeaheadResults[value]}
          label={label}
          {...extraProps[value]}
        />)
      ));

    return (
      <>
        {formSpec.filterType === 'single' &&
        renderSingleFilter()
        }
        {formSpec.filterType === 'multi' &&
        renderMultiFilters()
        }
      </>);
  }
}

const mapStateToProps = (state) => {
  const selector = formValueSelector(FORM_NAME);

  return {
    single_filter: selector(state, 'single_filter') || {},
    metric: selector(state, 'metric'),
    ipPools: getIpPools(state) || [],
    sendingDomains: selectVerifiedDomains(state) || [],
    sendingIps: state.sendingIps.list || [],
    ipPoolsLoading: state.ipPools.listLoading,
    sendingDomainsLoading: state.sendingDomains.listLoading
  };
};

const mapDispatchToProps = {
  listPools,
  listSendingDomains,
  listSendingIps,
  change
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterFields);
