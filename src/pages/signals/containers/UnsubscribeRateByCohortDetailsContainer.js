import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUnsubscribeRateByCohort } from 'src/actions/signals';
import { selectUnsubscribeRateByCohortDetails, getSelectedDateFromRouter } from 'src/selectors/signals';
import { getDateTicks } from 'src/helpers/date';
import { getDisplayName } from 'src/helpers/hoc';

export class WithUnsubscribeRateByCohortDetails extends Component {
  componentDidMount() {
    const { getUnsubscribeRateByCohort, facet, facetId, filters, subaccountId } = this.props;
    getUnsubscribeRateByCohort({
      facet,
      filter: facetId,
      relativeRange: filters.relativeRange,
      subaccount: subaccountId
    });
  }

  componentDidUpdate(prevProps) {
    const { getUnsubscribeRateByCohort, facet, facetId, filters, subaccountId } = this.props;
    const prevRange = prevProps.filters.relativeRange;
    const nextRange = filters.relativeRange;

    // Refresh when date range changes
    if (prevRange !== nextRange) {
      getUnsubscribeRateByCohort({
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
 * Provides unsubscribe rate by engagement cohort details to the provided component
 * @example
 *   export default withUnsubscribeRateByCohortDetails(MyComponent);
 */
function withUnsubscribeRateByCohortDetails(WrappedComponent) {
  const Wrapper = (props) => (
    <WithUnsubscribeRateByCohortDetails {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withUnsubscribeRateByCohortDetails');

  const mapStateToProps = (state, props) => ({
    ...selectUnsubscribeRateByCohortDetails(state, props),
    filters: state.signalOptions,
    selected: getSelectedDateFromRouter(state, props)
  });

  return withRouter(connect(mapStateToProps, { getUnsubscribeRateByCohort })(Wrapper));
}

export default withUnsubscribeRateByCohortDetails;
