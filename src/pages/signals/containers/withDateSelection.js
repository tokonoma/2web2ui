import React, { Component } from 'react';
import { getDisplayName } from 'src/helpers/hoc';
import _ from 'lodash';

export class WithDateSelection extends Component {
  state = {
    selectedDate: null,
    hoveredDate: null,
    shouldHighlightSelected: false
  }

  componentDidMount() {
    const { selected, hovered } = this.props;

    if (selected) {
      this.setState({ selectedDate: selected });
    }

    if (hovered) {
      this.setState({ hoveredDate: hovered });
    }
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const { selectedDate } = this.state;

    const dataSetChanged = prevProps.data !== data;
    const selectedDataByDay = data.find(({ date }) => date === selectedDate);


    if (dataSetChanged && !selectedDataByDay) {
      this.setDefaultSelected();
    }
  }

  // Select last date in time series
  setDefaultSelected() {
    const lastDataByDay = _.last(this.props.data);
    this.setState({ selectedDate: lastDataByDay.date, hoveredDate: null, shouldHighlightSelected: false });
  }

  handleDateSelect = (node) => {
    const newDate = _.get(node, 'payload.date');

    if (newDate === this.state.selectedDate) {
      this.setDefaultSelected();
    } else {
      this.setState({ selectedDate: _.get(node, 'payload.date'), shouldHighlightSelected: true });
    }
  }

  handleDateHover = (node) => {
    this.setState({ hoveredDate: _.get(node, 'payload.date') });
  }

  resetDateHover = () => {
    this.setState({ hoveredDate: '' });
  }

  render() {
    const { component: WrappedComponent, selected: _selected, hovered: _hovered, ...rest } = this.props;
    const { selectedDate, hoveredDate, shouldHighlightSelected } = this.state;

    return (
      <WrappedComponent
        {...rest}
        selectedDate={selectedDate}
        hoveredDate={hoveredDate}
        shouldHighlightSelected={shouldHighlightSelected}
        handleDateSelect={this.handleDateSelect}
        handleDateHover={this.handleDateHover}
        resetDateHover={this.resetDateHover}/>
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
