import React, { useState, useEffect } from 'react';
import { ComboBox, ComboBoxTextField, ComboBoxMenu } from '@sparkpost/matchbox';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import sortMatch from 'src/helpers/sortMatch';

export const ComboBoxTypeahead = ({
  disabled,
  error,
  isExclusiveItem,
  itemToString,
  label,
  maxNumberOfResults,
  name,
  onChange,
  placeholder,
  readOnly,
  results,
  value,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(value);
  const [updateMenuItems] = useDebouncedCallback(input => {
    const items = input ? sortMatch(results, input, itemToString) : results;
    const nextMenuItems = items.slice(0, maxNumberOfResults);
    setMenuItems(nextMenuItems);
  }, 300);

  // Updated list of selected menu items when combo box is being controlled
  // note, state must be initialized with defaultSelected to avoid a runaway effect
  useEffect(() => {
    setSelectedItems(value);
  }, [setSelectedItems, value]);

  // Report change to selected items (important for redux-form Fields)
  useEffect(() => {
    onChange(selectedItems);
  }, [onChange, selectedItems]);

  // Update list of menu items when available list of items (results), input value or select items changes
  useEffect(() => {
    updateMenuItems(inputValue);
  }, [updateMenuItems, inputValue, results, selectedItems]);

  const isSelectedItem = item => selectedItems.some(selectedItem => selectedItem === item);

  // Must use state reducer to avoid menu automatically closing
  // see, https://github.com/downshift-js/downshift#statechangetypes
  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter: {
        setSelectedItems([...selectedItems, changes.selectedItem]);
        setInputValue(''); // unset below won't trigger a changeInput action

        return {
          ...changes,
          inputValue: '', // unset input value, now that it has been saved in selected items
          isOpen: true, // leave menu open
          selectedItem: null,
        };
      }
      case Downshift.stateChangeTypes.changeInput:
        setInputValue(changes.inputValue);
    }

    return changes;
  };

  const typeaheadfn = ({
    getInputProps,
    getItemProps,
    getMenuProps,
    getRootProps,
    highlightedIndex,
    inputValue,
    isOpen,
    openMenu,
  }) => {
    const hasSelectedItems = Boolean(selectedItems.length);
    const isSelectedItemExclusive = isExclusiveItem(selectedItems[0]);
    const items = menuItems
      .filter(
        item =>
          !isSelectedItemExclusive &&
          !isSelectedItem(item) &&
          !(hasSelectedItems && isExclusiveItem(item)),
      )
      .map((item, index) =>
        getItemProps({
          content: itemToString(item),
          highlighted: highlightedIndex === index,
          index,
          item,
        }),
      );
    const isMenuOpen = isOpen && Boolean(items.length);

    const inputProps = getInputProps({
      disabled,
      error: error && !isMenuOpen ? error : undefined,
      id: name,
      itemToString,
      label,
      onFocus: () => {
        openMenu();
      },
      placeholder: hasSelectedItems ? '' : placeholder,
      readOnly: readOnly || isSelectedItemExclusive,
      removeItem: itemToRemove => {
        const mappedItemToRemove = itemToRemove;
        const nextSelectedItems = selectedItems.filter(
          selectedItem => selectedItem !== mappedItemToRemove,
        );
        setSelectedItems(nextSelectedItems);
      },
      selectedItems,
      value: inputValue || '',
    });

    return (
      <ComboBox {...getRootProps({ refKey: 'rootRef' })}>
        <ComboBoxTextField {...inputProps} />
        <ComboBoxMenu {...getMenuProps({ items, isOpen: isMenuOpen, refKey: 'menuRef' })} />
      </ComboBox>
    );
  };

  return (
    <Downshift defaultHighlightedIndex={0} itemToString={itemToString} stateReducer={stateReducer}>
      {typeaheadfn}
    </Downshift>
  );
};

ComboBoxTypeahead.propTypes = {
  defaultSelected: PropTypes.array,
  disabled: PropTypes.bool,
  isExclusiveItem: PropTypes.func,
  itemToString: PropTypes.func,
  label: PropTypes.string,
  maxNumberOfResults: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  results: PropTypes.array,
};

ComboBoxTypeahead.defaultProps = {
  defaultSelected: [],
  isExclusiveItem: () => false,
  itemToString: item => item,
  maxNumberOfResults: 100,
  placeholder: '',
  results: [],
};
