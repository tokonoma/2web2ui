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
  const [selected, setSelected] = useState(defaultSelected);
  const [menuItems, setMenuItems] = useState([]);
  const [updateMenuItems] = useDebouncedCallback((value) => {
    const items = value ? sortMatch(results, value, itemToString) : results;
    setMenuItems(items.slice(0, maxNumberOfResults));
  }, 400);

  useEffect(() => {
    onChange(selected.map(selectedMap));
  }, [onChange, selectedMap, selected]);

  useEffect(() => {
    updateMenuItems(inputValue);
  }, [inputValue, results, selected, updateMenuItems]);

  // see, https://github.com/downshift-js/downshift#statechangetypes
  const stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter: {
        setSelected([...selected, changes.selectedItem]);
        setInputValue('');

        return {
          ...changes,
          inputValue: '',
          isOpen: true, // leave menu open
          selectedItem: null
        };
      }
    }

    return changes;
  };

  const typeaheadfn = ({
    getInputProps,
    getMenuProps,
    isOpen,
    getItemProps,
    inputValue,
    highlightedIndex,
    getRootProps,
    openMenu
  }) => {
    const items = menuItems
      .filter((item) => !selected.some((selected) => selectedMap(selected) === selectedMap(item)))
      .map((item, index) => getItemProps({
        content: itemToString(item),
        highlighted: highlightedIndex === index,
        index,
        item
      }));

    const inputProps = getInputProps({
      disabled,
      error: error && !isOpen ? error : undefined,
      id: name,
      itemToString,
      label,
      onFocus: () => { openMenu(); },
      placeholder: selected.length ? '' : placeholder,
      readOnly: readOnly || results.length === 0,
      removeItem: (item) => { setSelected(selected.filter((i) => i !== item)); },
      selectedItems: selected,
      value: inputValue || ''
    });

    const menuProps = getMenuProps({
      items,
      isOpen: Boolean(isOpen && items.length),
      refKey: 'menuRef'
    });

    return (
      <ComboBox {...getRootProps({ refKey: 'rootRef' })}>
        <ComboBoxTextField {...inputProps} />
        <ComboBoxMenu {...menuProps} />
      </ComboBox>
    );
  };

  return (
    <Downshift
      defaultHighlightedIndex={0}
      itemToString={itemToString}
      onInputValueChange={(nextInputValue) => { setInputValue(nextInputValue); }}
      stateReducer={stateReducer}
    >
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
  readOnly: PropTypes.bool
};

ComboBoxTypeahead.defaultProps = {
  defaultSelected: [],
  itemToString: (item) => item,
  maxNumberOfResults: 100,
  results: [],
  selectedMap: (item) => item
};
