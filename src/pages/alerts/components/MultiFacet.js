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
 *
 * This component differs from the global Typeahead component:
 * no clear button is rendered
 * no selectedItem is set
 * connectLeft is used
 */
class MultiFacet extends Component {
  state = {
    matches: []
  }

  componentDidMount() {
    this.setState({ matches: this.props.items });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.facetname !== this.props.facetname) {
      this.setState({ matches: this.props.items });
    }
  }

  componentWillUnmount() {
    this.updateMatches.cancel();
  }

  handleStateChange = (changes, downshift) => {
    if (!downshift.highlightedIndex) {
      downshift.setHighlightedIndex(0);
    }
  }

  // note, depending on size of items this calculation to find matches could be expensive
  updateMatches = debounce((nextValue) => {
    const { items } = this.props;

    const updateMatches = nextValue ? sortMatch(items, nextValue) : items;

    // note, exclude the first match if it is the current input value
    const filterMatch = (updateMatches[0] === nextValue) ? _.filter(updateMatches, nextValue) : updateMatches;

    this.setState({ matches: filterMatch });
  }, 300);

  render() {
    const { value, ...inputProps } = this.props;
    const { matches } = this.state;

    return (
      <Downshift
        onStateChange={this.handleStateChange}
        onInputValueChange={this.updateMatches}
        selectedItem={value}
      >
        {(downshift) => <div className={styles.Typeahead}>
          <MultiFacetInput {...inputProps} downshift={downshift} />
          <MultiFacetMenu downshift={downshift} items={matches}/>
        </div>}
      </Downshift>
    );
  }
}

export default MultiFacet;
