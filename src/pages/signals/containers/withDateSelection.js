import React, { Component } from 'react';
import { getDisplayName } from 'src/helpers/hoc';
import _ from 'lodash';

export class WithDateSelection extends Component {
  state = {
    selectedDate: null
  }

  componentDidMount() {
    const { selected } = this.props;

    if (selected) {
      this.setState({ selectedDate: selected });
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const { selectedDate } = this.state;

    const dataSetChanged = prevProps.data !== data;
    let selectedDataByDay = _.find(data, ['date', selectedDate]);

    // Select last date in time series
    if (dataSetChanged && !selectedDataByDay) {
      selectedDataByDay = _.last(data);
      this.setState({ selectedDate: selectedDataByDay.date });
    }
  }

  handleDateSelect = (node) => {
    this.setState({ selectedDate: _.get(node, 'payload.date') });
  }

  render() {
    const { component: WrappedComponent, selected, ...rest } = this.props;
    const { selectedDate } = this.state;

    return (
      <WrappedComponent {...rest} selectedDate={selectedDate} handleDateSelect={this.handleDateSelect} />
    );
  }
}

/**
 * Provides date selection handlers for signals details pages
 * @example
 *   export default withDateSelection(MyComponent);
 */
function withDateSelection(WrappedComponent) {
  const Wrapper = (props) => (
    <WithDateSelection {...props} component={WrappedComponent} />
  );

  Wrapper.displayName = getDisplayName(WrappedComponent, 'withDateSelection');

  return Wrapper;
}

export default withDateSelection;
