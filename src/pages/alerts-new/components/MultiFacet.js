import Downshift from 'downshift';
import debounce from 'lodash/debounce';
import React, { Component } from 'react';
import sortMatch from 'src/helpers/sortMatch';

import MultiFacetInput from './MultiFacetInput';
import MultiFacetMenu from './MultiFacetMenu';
import styles from './MultiFacet.module.scss';
import _ from 'lodash';

/**
 * This component controls downshift's inputValue manually to prevent cursor jumping on change
 * See:
 * https://github.com/paypal/downshift#oninputvaluechange
 * https://github.com/paypal/downshift/issues/217
 */
class MultiFacet extends Component {
  state = {
    matches: this.props.items
  }

  componentWillUnmount() {
    this.updateMatches.cancel();
  }

  handleStateChange = (changes, downshift) => {
    const input = _.get(changes, 'inputValue', '');
    (input) ? this.updateMatches(input) : this.handleFocus(changes);
    if (!downshift.highlightedIndex) {
      downshift.setHighlightedIndex(0);
    }
  }

  // note, depending on size of items this calculation to find matches could be expensive
  updateMatches = debounce((nextValue) => {
    const updateMatches = sortMatch(
      this.props.items,
      nextValue
    );

    // note, exclude the first match if it is the current input value
    const filterMatch = (updateMatches[0] === nextValue) ? _.filter(updateMatches, nextValue) : updateMatches;

    this.setState({
      matches: filterMatch
    });
  }, 300);

  handleFocus = (stateChange) => {
    const stateType = _.get(stateChange, 'type', '');

    if (stateType === '__autocomplete_change_input__' || stateType === '__autocomplete_unknown__') {
      this.setState({
        matches: this.props.items
      });
    }
  };

  render() {
    const { items, value, ...inputProps } = this.props;
    const { matches } = this.state;

    return (
      <Downshift
        onStateChange={this.handleStateChange}
        selectedItem={value}
      >
        {(downshift) => {
          inputProps.onFocus = downshift.openMenu;
          return <div className={styles.Typeahead}>
            <MultiFacetInput {...inputProps} downshift={downshift} />
            <MultiFacetMenu downshift={downshift} items={matches}/>
          </div>;
        }}
      </Downshift>
    );
  }
}

export default MultiFacet;
