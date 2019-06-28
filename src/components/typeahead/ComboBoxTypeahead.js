import React, { useState, useEffect } from 'react';
import { ComboBox, ComboBoxTextField, ComboBoxMenu } from '@sparkpost/matchbox';
import Downshift from 'downshift';
import debounce from 'lodash/debounce';
import sortMatch from 'src/helpers/sortMatch';
import PropTypes from 'prop-types';

//This is done so that the debouce cancel can be tested
const debounce300ms = debounce((fn, input) => fn(input), 300);

export const ComboBoxTypeahead = (props) => {
  const { error,
    results = [],
    itemToString,
    maxNumberOfResults,
    onChange,
    disabled,
    label,
    name,
    selectedMap,
    placeholder,
    type,
    readOnly,
    debounceFn } = props;
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState(results);

  //Updates the value of this component
  useEffect(() => {
    onChange(selected.map(selectedMap));
  }, [onChange, selected, selectedMap]);

  //Clears the selected tags when the type changes
  useEffect(() => {
    setSelected([]);
  }, [type]);

  //This is so the list of matches is consistent with the prop results
  useEffect(() => {
    setMatches(results);
  }, [results]);

  //Cancels the debounce on unmount
  useEffect(() => () => debounceFn.cancel(), [debounceFn]);

  function stateReducer(state, changes) {

    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter:
        if (changes.selectedItem) {
          addItem(changes.selectedItem);
          return {
            ...changes,
            inputValue: '',
            selectedItem: null
          };
        } else {
          return changes;
        }
      case Downshift.stateChangeTypes.changeInput:
        debounceFn(updateMatches, changes.inputValue);
        return changes;
      default:
        return changes;
    }
  }

  function addItem(item) {
    setSelected([ ...selected, item ]);
  }

  function removeItem(item) {
    setSelected(selected.filter((i) => i !== item));
  }

  // note, sorting large result lists can be expensive
  function updateMatches(inputValue) {
    const inputMatches = inputValue ? sortMatch(results, inputValue, itemToString) : results;
    setMatches(inputMatches.slice(0, maxNumberOfResults));
  }

  function typeaheadfn(downshift) {
    const {
      getInputProps,
      getMenuProps,
      isOpen,
      getItemProps,
      inputValue,
      highlightedIndex,
      openMenu,
      getRootProps
    } = downshift;


    const rootProps = getRootProps({
      refKey: 'rootRef'
    });

    const items = matches
      .filter((item) => !selected.some((selected) => selectedMap(selected) === selectedMap(item)))
      .map((item, index) => getItemProps({
        content: itemToString(item),
        highlighted: highlightedIndex === index,
        index,
        item
      })
      );

    const inputProps = getInputProps({
      id: name,
      label,
      selectedItems: selected,
      itemToString,
      removeItem,
      onFocus: openMenu,
      onClick: openMenu,
      value: inputValue || '',
      error: error && !isOpen ? error : undefined,
      placeholder: (selected.length) ? '' : placeholder,
      disabled,
      readOnly: readOnly || (results.length === 0)
    });
    const menuProps = getMenuProps({
      items,
      isOpen: Boolean(isOpen && items.length),
      refKey: 'menuRef'
    });

    return (
      <ComboBox {...rootProps}>
        <ComboBoxTextField {...inputProps} />
        <ComboBoxMenu {...menuProps} />
      </ComboBox>
    );
  }

  return (
    <Downshift itemToString={itemToString} stateReducer={stateReducer} >
      {typeaheadfn}
    </Downshift>
  );
};

ComboBoxTypeahead.propTypes = {
  results: PropTypes.array,
  itemToString: PropTypes.func,
  maxNumberOfResults: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  selectedMap: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  readOnly: PropTypes.bool,
  debounceFn: PropTypes.func
};

ComboBoxTypeahead.defaultProps = {
  results: [],
  itemToString: (item) => item,
  selectedMap: (item) => item,
  maxNumberOfResults: 100,
  debounceFn: debounce300ms
};
