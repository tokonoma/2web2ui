import { connect } from 'react-redux';
import { change } from 'redux-form';
import { list as listDomains } from 'src/actions/sendingDomains';
import { selectDomainsBySubaccount } from 'src/selectors/templates';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { not } from 'src/helpers/conditions';
import { selectCondition } from 'src/selectors/accessConditionState';
import { isSubaccountUser } from 'src/helpers/conditions/user';

import Form from '../Form';

const mapStateToProps = (state, props) => ({
  domains: selectDomainsBySubaccount(state, props),
  domainsLoading: state.sendingDomains.listLoading,
  hasSubaccounts: hasSubaccounts(state),
  canViewSubaccount: selectCondition(not(isSubaccountUser))(state)
});

export default connect(mapStateToProps, { change, listDomains })(Form);
