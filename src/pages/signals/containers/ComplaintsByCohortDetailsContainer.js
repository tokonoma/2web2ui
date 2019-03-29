import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getComplaintsByCohort } from 'src/actions/signals';
import { selectComplaintsByCohortDetails, getSelectedDateFromRouter } from 'src/selectors/signals';
import { getDateTicks } from 'src/helpers/date';
import { getDisplayName } from 'src/helpers/hoc';

export class WithComplaintsByCohortDetails extends Component {
  componentDidMount() {
    const { getComplaintsByCohort, facet, facetId, filters, subaccountId } = this.props;
    getComplaintsByCohort({
      facet,
      filter: facetId,
      relativeRange: filters.relativeRange,
      subaccount: subaccountId
    });
  }

  componentDidUpdate(prevProps) {
    const { getComplaintsByCohort, facet, facetId, filters, subaccountId } = this.props;
    const prevRange = prevProps.filters.relativeRange;
    const nextRange = filters.relativeRange;

    // Refresh when date range changes
    if (prevRange !== nextRange) {
      getComplaintsByCohort({
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
 *   export default withComplaintsByCohortDetails(MyComponent);
 */
function withComplaintsByCohortDetails(WrappedComponent) {
  const Wrapper = (props) => (
    <WithComplaintsByCohortDetails {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withComplaintsByCohortDetails');

  const mapStateToProps = (state, props) => ({
    ...selectComplaintsByCohortDetails(state, props),
    filters: state.signalOptions,
    selected: getSelectedDateFromRouter(state, props)
  });

  return withRouter(connect(mapStateToProps, { getComplaintsByCohort })(Wrapper));
}

export default withComplaintsByCohortDetails;
