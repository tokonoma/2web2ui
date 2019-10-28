import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  getTestDataV2,
  deleteTemplateV2,
  createV2 as createTemplateV2,
  listTemplates,
  getDraft,
  getPublished
} from 'src/actions/templates';
import { hasGrants } from 'src/helpers/conditions';
import { selectTemplatesForListTable } from 'src/selectors/templates';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { showAlert } from '../../actions/globalAlert';
import ListPage from './ListPage';

function mapStateToProps(state) {
  const templates = selectTemplatesForListTable(state);
  const canModify = hasGrants('templates/modify')(state);

  return {
    templates,
    hasSubaccounts: hasSubaccounts(state),
    userAccessLevel: state.currentUser.access_level,
    loading: Boolean(state.templates.listLoading),
    error: state.templates.listError,
    canModify,
    isDeletePending: Boolean(state.templates.deletePending),
    isCreatePending: Boolean(state.templates.createPending),
    draftPending: Boolean(state.templates.getDraftLoading),
    publishedPending: Boolean(state.templates.getPublishedLoading)
  };
}

const mapDispatchToProps = {
  listTemplates,
  deleteTemplateV2,
  showAlert,
  createTemplateV2,
  getTestDataV2,
  getDraft,
  getPublished
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPage));
