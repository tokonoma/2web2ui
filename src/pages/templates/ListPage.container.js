import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listTemplates } from 'src/actions/templates';
import { hasGrants } from 'src/helpers/conditions';
import { selectTemplates } from 'src/selectors/templates';
import { hasSubaccounts } from 'src/selectors/subaccounts';

import ListPage from './ListPage';

function mapStateToProps(state) {
  const templates = selectTemplates(state);
  const canModify = hasGrants('templates/modify')(state);

  return {
    templates,
    hasSubaccounts: hasSubaccounts(state),
    userAccessLevel: state.currentUser.access_level,
    loading: state.templates.listLoading,
    error: state.templates.listError,
    canModify
  };
}

export default withRouter(connect(mapStateToProps, { listTemplates })(ListPage));
