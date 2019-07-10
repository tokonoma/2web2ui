import React, { useState, useEffect } from 'react';
import { ComboBox, ComboBoxTextField, ComboBoxMenu } from '@sparkpost/matchbox';
import Downshift from 'downshift';
import debounce from 'lodash/debounce';
import sortMatch from 'src/helpers/sortMatch';
import PropTypes from 'prop-types';

export const ComboBoxTypeahead = (props) => {
  const {
    error,
    results,
    itemToString,
    maxNumberOfResults,
    onChange,
    disabled,
    label,
    name,
    selectedMap,
    placeholder,
    readOnly,
    debounceFn //Needed for testing
  } = props;
  const [selected, setSelected] = useState([]);
  const [matches, setMatches] = useState(results);
  const [updateMatches, setUpdateMatches] = useState(() => undefined);

  //Updates the value of this component
  useEffect(() => {
    onChange(selected.map(selectedMap));
  }, [onChange, selected, selectedMap]);

  //Creates debounce function and cancels the debounce on unmount
  useEffect(() => {
    setMatches(results);
    const updateMatchesFn = debounceFn((inputValue) => {
      const inputMatches = inputValue ? sortMatch(results, inputValue, itemToString) : results;
      setMatches(inputMatches.slice(0, maxNumberOfResults));
    }, 300);
    setUpdateMatches(() => updateMatchesFn);
    return () => updateMatchesFn.cancel();
  }, [debounceFn, itemToString, maxNumberOfResults, results]);

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
        updateMatches(changes.inputValue);
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

    /*When losing focus, the text input clears. Thus, the first
    click will always be for an empty text field. This both opens
    the matches and reset the matches.
    */
    const firstOpen = () => {
      openMenu();
      setMatches(results);
    };

    const inputProps = getInputProps({
      id: name,
      label,
      selectedItems: selected,
      itemToString,
      removeItem,
      onFocus: firstOpen,
      onClick: firstOpen,
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
  readOnly: PropTypes.bool,
  debounceFn: PropTypes.func
};

ComboBoxTypeahead.defaultProps = {
  results: [],
  itemToString: (item) => item,
  selectedMap: (item) => item,
  maxNumberOfResults: 100,
  debounceFn: debounce
};
