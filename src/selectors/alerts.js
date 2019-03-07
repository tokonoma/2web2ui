import getAssignTo from 'src/pages/alerts/helpers/getAssignTo';
import { getDomains, isVerified } from 'src/selectors/sendingDomains';
import { getIpPools } from 'src/selectors/ipPools';
import { selectSubaccountFromId } from 'src/selectors/subaccounts';
import _ from 'lodash';
import { formValueSelector } from 'redux-form';
import { createSelector } from 'reselect';

const subaccountIdSelected = (state, formName) => {
  const selector = formValueSelector(formName);
  return selector(state, 'subaccount.id');
};

const assignToSelected = (state, formName) => {
  const selector = formValueSelector(formName);
  return selector(state, 'assignTo');
};

export function formatEditValues(state, { id, name, alert_metric, alert_subaccount, email_addresses, facet_name = 'ALL', facet_value, threshold, enabled } = {}) {
  const assignTo = getAssignTo(alert_subaccount);
  const subaccount = selectSubaccountFromId(state, alert_subaccount);
  const values = { id, name, alert_metric, assignTo, subaccount, alert_subaccount, email_addresses, facet_name, facet_value, threshold, enabled };
  return values;
}

// Selects sending domains for Multi Facet typeahead
export const selectDomainsBySubaccount = createSelector(
  [getDomains, subaccountIdSelected, assignToSelected],
  (domains, subaccountId, assignTo) => {
    const filteredDomains = _.filter(domains, (domain) => {
      if (!isVerified(domain)) {
        return false;
      }

      switch (assignTo) {
        case 'all':
          return true;
        case 'master':
          return !domain.subaccount_id;
        case 'subaccount':
          return domain.shared_with_subaccounts || domain.subaccount_id === Number(subaccountId);
        default:
          return true;
      }
    });

    return filteredDomains;
  }
);

// Selects ip pools for Multi Facet typeahead
export const selectIpPools = createSelector(
  [getIpPools],
  (ipPools) => ipPools
);
