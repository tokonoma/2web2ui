import { connect } from 'react-redux';
import { getSnippets } from 'src/actions/snippets';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import { hasGrants } from 'src/helpers/conditions';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import ListPage from './ListPage';

const mapStateToProps = (state) => ({
  canCreate: hasGrants('templates/modify')(state), // snippet grants are inherited from templates
  userAccessLevel: state.currentUser.access_level,
  error: state.snippets.error,
  hasSubaccounts: hasSubaccounts(state),
  loading: state.snippets.loading,
  snippets: state.snippets.items,
  subaccounts: state.subaccounts.list
});

const mapDispatchToProps = {
  getSnippets,
  listSubaccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);
