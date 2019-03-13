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
    matches: []
  }

  componentWillUnmount() {
    this.updateMatches.cancel();
  }

  handleInputValueChange = (value) => {
    this.updateMatches(value);
  }

  handleStateChange = (changes, downshift) => {
    // Highlights first item in list by default
    if (!downshift.highlightedIndex) {
      downshift.setHighlightedIndex(0);
    }
  }

  // note, depending on size of items this calculation to find matches could be expensive
  updateMatches = debounce((nextValue) => {
    const { items, maxNumberOfResults = 100 } = this.props;
    //const [inputLocalPart] = nextValue.split('@');
    const itemsArray = items.map((item) => _.get(item, 'domain', _.get(item, 'id', undefined)));
    //console.log('inputLocalPart', inputLocalPart);

    this.setState({ matches: itemsArray });

    const matches = sortMatch(
      itemsArray,
      nextValue
    );
    // note, exclude the first match if it is the current input value
    const begin = matches[0] === nextValue ? 1 : 0;

    this.setState({
      matches: matches.slice(begin, maxNumberOfResults + begin)
    });
  }, 300);

  render() {
    const { items, value, ...inputProps } = this.props;
    const { matches } = this.state;

    return (
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        onStateChange={this.handleStateChange}
        selectedItem={value}
      >
        {(downshift) => (
          <div className={styles.Typeahead}>
            <MultiFacetInput {...inputProps} downshift={downshift} />
            <MultiFacetMenu downshift={downshift} items={matches}/>
          </div>
        )}
      </Downshift>
    );
  }
}

export default MultiFacet;
