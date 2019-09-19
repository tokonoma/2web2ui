import React, { useState, useEffect } from 'react';
import { ComboBox, ComboBoxTextField, ComboBoxMenu } from '@sparkpost/matchbox';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from 'use-debounce';
import sortMatch from 'src/helpers/sortMatch';

export const ComboBoxTypeahead = ({
  defaultSelected,
  disabled,
  error,
  itemToString,
  label,
  maxNumberOfResults,
  name,
  onChange,
  placeholder,
  readOnly,
  results,
  selectedMap
}) => {
  const [inputValue, setInputValue] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(defaultSelected);
  const [updateMenuItems] = useDebouncedCallback((value) => {
    const items = value ? sortMatch(results, value, itemToString) : results;
    const nextMenuItems = items.slice(0, maxNumberOfResults);
    setMenuItems(nextMenuItems);
  }, 300);

  // Report change to selected items (important for redux-form Fields)
  useEffect(() => {
    onChange(selectedItems.map(selectedMap));
  }, [onChange, selectedMap, selectedItems]);

  // Update list of menu items when available list of items (results), input value or select items changes
  useEffect(() => {
    updateMenuItems(inputValue);
  }, [updateMenuItems, inputValue, results, selectedItems]);

  // note, not all items are objects
  const isExclusiveItem = (item) => (
    typeof item === 'object' && Boolean(item.isExclusiveItem)
  );

  const isSelectedItem = (item) => (
    selectedItems.some((selectedItem) => selectedMap(selectedItem) === selectedMap(item))
  );

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
          selectedItem: null
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
    openMenu
  }) => {
    const hasSelectedItems = Boolean(selectedItems.length);
    const isSelectedItemExclusive = isExclusiveItem(selectedItems[0]);
    const items = menuItems
      .filter((item) => (
        !isSelectedItem(item) && !(hasSelectedItems && isExclusiveItem(item))
      ))
      .map((item, index) => getItemProps({
        content: itemToString(item),
        highlighted: highlightedIndex === index,
        index,
        item
      }));
    const isMenuOpen = isOpen && Boolean(items.length) && !isSelectedItemExclusive;

    const inputProps = getInputProps({
      disabled,
      error: error && !isMenuOpen ? error : undefined,
      id: name,
      itemToString,
      label,
      onFocus: () => { openMenu(); },
      placeholder: hasSelectedItems ? '' : placeholder,
      readOnly: readOnly || isSelectedItemExclusive,
      removeItem: (itemToRemove) => {
        const mappedItemToRemove = selectedMap(itemToRemove);
        const nextSelectedItems = selectedItems.filter((selectedItem) => (
          selectedMap(selectedItem) !== mappedItemToRemove)
        );
        setSelectedItems(nextSelectedItems);
      },
      selectedItems,
      value: inputValue || ''
    });

    return (
      <ComboBox {...getRootProps({ refKey: 'rootRef' })}>
        <ComboBoxTextField {...inputProps} />
        <ComboBoxMenu {...getMenuProps({ items, isOpen: isMenuOpen, refKey: 'menuRef' })} />
      </ComboBox>
    );
  };

  return (
    <Downshift
      defaultHighlightedIndex={0}
      itemToString={itemToString}
      stateReducer={stateReducer}
    >
      {typeaheadfn}
    </Downshift>
  );
};

ComboBoxTypeahead.propTypes = {
  defaultSelected: PropTypes.array,
  disabled: PropTypes.bool,
  itemToString: PropTypes.func,
  label: PropTypes.string,
  maxNumberOfResults: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  results: PropTypes.array,
  selectedMap: PropTypes.func
};

ComboBoxTypeahead.defaultProps = {
  defaultSelected: [],
  itemToString: (item) => item,
  maxNumberOfResults: 100,
  placeholder: '',
  results: [],
  selectedMap: (item) => item
};
