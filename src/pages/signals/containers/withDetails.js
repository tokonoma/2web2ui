import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSelectedDateFromRouter } from 'src/selectors/signals';
import { getDateTicks } from 'src/helpers/date';
import { getDisplayName } from 'src/helpers/hoc';
import _ from 'lodash';

export class WithDetails extends Component {
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props;

    // Refresh when filters change
    if (!_.isEqual(prevProps.filters, filters)) {
      this.getData();
    }
  }

  getData = () => {
    const { fetch, facet, facetId, filters, subaccountId } = this.props;

    fetch({
      facet,
      filter: facetId,
      from: filters.from,
      subaccount: subaccountId,
      to: filters.to
    });
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
      <WrappedComponent {...details} facet={facet} facetId={facetId} gap={gap} selected={selected} xTicks={getDateTicks(filters)} subaccountId={subaccountId} />
    );
  }
}

/**
 * Provides Signals details to the provided component
 * @example
 *    export default withDetails(MyComponent, { getThisData, getThatData }, selectMyData);
 */
function withDetails(WrappedComponent, fetchData = {}, selectData) {
  const Wrapper = (props) => (
    <WithDetails {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'WithDetails');

  const mapStateToProps = (state, props) => ({
    ...selectData(state, props),
    filters: state.signalOptions,
    selected: getSelectedDateFromRouter(state, props)
  });

  const mapDispatchToProps = (dispatch) => ({
    fetch: (options) => {
      _.each(fetchData, (get) => {
        dispatch(get(options));
      });
    }
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper));
}

export default withDetails;
