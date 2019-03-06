import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEngagementRecency } from 'src/actions/signals';
import { selectEngagementRecencyDetails, getSelectedDateFromRouter } from 'src/selectors/signals';
import { getDateTicks } from 'src/helpers/date';
import { getDisplayName } from 'src/helpers/hoc';

export class WithEngagementRecencyDetails extends Component {
  componentDidMount() {
    const { getEngagementRecency, facet, facetId, filters, subaccountId } = this.props;
    getEngagementRecency({
      facet,
      filter: facetId,
      relativeRange: filters.relativeRange,
      subaccount: subaccountId
    });
  }

  componentDidUpdate(prevProps) {
    const { getEngagementRecency, facet, facetId, filters, subaccountId } = this.props;
    const prevRange = prevProps.filters.relativeRange;
    const nextRange = filters.relativeRange;

    // Refresh when date range changes
    if (prevRange !== nextRange) {
      getEngagementRecency({
        facet,
        filter: facetId,
        relativeRange: nextRange,
        subaccount: subaccountId
      });
    }
  }

  render() {
    const {
      component: WrappedComponent,
      details,
      facet,
      facetId,
      filters,
      selected,
      subaccountId
    } = this.props;

    // Calculate gap here to share with preview and details
    const gap = details.data && details.data.length > 15 ? 0.2 : 1;

    return (
      <WrappedComponent {...details} facet={facet} facetId={facetId} gap={gap} xTicks={getDateTicks(filters.relativeRange)} selected={selected} subaccountId={subaccountId} />
    );
  }
}

/**
 * Provides Spam Trap details to the provided component
 * @example
 *   export default withEngagementRecencyDetails(MyComponent);
 */
function withEngagementRecencyDetails(WrappedComponent) {
  const Wrapper = (props) => (
    <WithEngagementRecencyDetails {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withEngagementRecencyDetails');

  const mapStateToProps = (state, props) => ({
    ...selectEngagementRecencyDetails(state, props),
    filters: state.signalOptions,
    selected: getSelectedDateFromRouter(state, props)
  });

  return withRouter(connect(mapStateToProps, { getEngagementRecency })(Wrapper));
}

export default withEngagementRecencyDetails;
