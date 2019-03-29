import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getEngagementRateByCohort } from 'src/actions/signals';
import { selectEngagementRateByCohortDetails, getSelectedDateFromRouter } from 'src/selectors/signals';
import { getDateTicks } from 'src/helpers/date';
import { getDisplayName } from 'src/helpers/hoc';

export class WithEngagementRateByCohortDetails extends Component {
  componentDidMount() {
    const { getEngagementRateByCohort, facet, facetId, filters, subaccountId } = this.props;
    getEngagementRateByCohort({
      facet,
      filter: facetId,
      relativeRange: filters.relativeRange,
      subaccount: subaccountId
    });
  }

  componentDidUpdate(prevProps) {
    const { getEngagementRateByCohort, facet, facetId, filters, subaccountId } = this.props;
    const prevRange = prevProps.filters.relativeRange;
    const nextRange = filters.relativeRange;

    // Refresh when date range changes
    if (prevRange !== nextRange) {
      getEngagementRateByCohort({
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

    return (
      <WrappedComponent {...details} facet={facet} facetId={facetId} xTicks={getDateTicks(filters.relativeRange)} selected={selected} subaccountId={subaccountId} />
    );
  }
}

/**
 * Provides engagement rate by engagement cohort details to the provided component
 * @example
 *   export default withEngagementRateByCohortDetails(MyComponent);
 */
function withEngagementRateByCohortDetails(WrappedComponent) {
  const Wrapper = (props) => (
    <WithEngagementRateByCohortDetails {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withEngagementRateByCohortDetails');

  const mapStateToProps = (state, props) => ({
    ...selectEngagementRateByCohortDetails(state, props),
    filters: state.signalOptions,
    selected: getSelectedDateFromRouter(state, props)
  });

  return withRouter(connect(mapStateToProps, { getEngagementRateByCohort })(Wrapper));
}

export default withEngagementRateByCohortDetails;
