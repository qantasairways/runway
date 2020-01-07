/* eslint jsx-a11y/label-has-associated-control: "off",
jsx-a11y/label-has-for: "off" */ // These attributes are generated by the Downshift library

import React, { Component } from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { findAll } from 'highlight-words-core';

import { colours, mq } from '../../theme/airways';
import noop from '../../utils/noop';

/* TODO: Add props for listHeight and loadingText.
Find alternative solution to padding. Remove the padding bottom so its not there forever not even as a prop
*/

function typeaheadStyles() {
  return {
    lineHeight: 1.53,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };
}

function labelInputContainerStyles() {
  return {
    width: '100%',
    padding: '0px',
    boxSizing: 'border-box'
  };
}

function inputStyles() {
  return {
    border: 'solid 2px #8de2e0',
    fontFamily: 'Ciutadella',
    fontSize: '22px',
    boxSizing: 'border-box',
    '&:focus': {
      outlineColor: colours.highlights
    },
    width: '100%',
    padding: '14px 10px 10px 10px',
    borderRadius: '0px',
    WebkitAppearance: 'none'
  };
}

function labelStyles() {
  return {
    fontFamily: 'Ciutadella',
    fontSize: '16px',
    fontWeight: '',
    lineHeight: 1.75,
    color: '#323232',
    textTransform: 'none'
  };
}

function menuWrapStyles({ menuHeight }) {
  return {
    maxHeight: 'none',
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
    [mq.medium]: {
      maxHeight: menuHeight,
      height: '100%'
    }
  };
}

function menuStyles() {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: '10px 0',
    paddingBottom: '303px',
    [mq.medium]: {
      padding: 0
    }
  };
}

function listItemStyles(isHighlighted) {
  return {
    backgroundColor: isHighlighted ? '#f4f5f6' : colours.transparent,
    borderRadius: '2px',
    listStyleType: 'none',
    padding: '16px 10px',
    fontFamily: 'Ciutadella',
    fontSize: '18px',
    lineHeight: 1,
    color: '#323232',
    display: 'flex',
    justifyContent: 'space-between'
  };
}

function listItemBadgeStyles() {
  return {
    fontSize: '16px',
    textAlign: 'right',
    borderRadius: '3px',
    backgroundColor: '#8de2e0',
    fontWeight: 600,
    padding: '2px 3px 0px',
    height: '100%'
  };
}

function highlightedListItemStyles() {
  return {
    fontWeight: 600
  };
}

class Typeahead extends Component {
  componentDidMount() {
    if (typeof this.props.setRef === 'function' && this.inputRef) {
      this.props.setRef(this.inputRef);
    }
  }

  onInputValueChange = (value, stateAndHelpers) => {
    const { fetchListOnInput } = this.props;
    if (
      fetchListOnInput &&
      stateAndHelpers.type === Downshift.stateChangeTypes.changeInput
    ) {
      fetchListOnInput(value);
    }
  };

  filterItems = (items, inputValue) => {
    const { itemToString, filterItems } = this.props;
    return filterItems
      ? filterItems(items, inputValue)
      : items.filter(item => {
          const regex = new RegExp(inputValue, 'gi');
          return regex.test(itemToString(item));
        });
  };

  renderItems = (
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    inputValue,
    menuHeight
  ) => {
    const { items, itemToString, fetchListOnInput, badgeToString } = this.props;
    const { ref: refUsedInParent, ...menuProps } = getMenuProps();
    const filteredItems = fetchListOnInput
      ? items
      : this.filterItems(items, inputValue);

    return filteredItems.length ? (
      <ul {...menuProps} css={menuStyles()}>
        {filteredItems.map((item, index) => {
          const isHighlighted = highlightedIndex === index;
          const isSelected = selectedItem === item;

          const text = itemToString(item);
          const chunks = findAll({
            searchWords: [inputValue],
            textToHighlight: text
          });
          const highlightedItem = chunks.map(({ start, end, highlight }) => {
            const textChunk = text.substr(start, end - start);
            return highlight ? (
              <strong css={highlightedListItemStyles()}>{textChunk}</strong>
            ) : (
              textChunk
            );
          });
          const badge = badgeToString(item);

          return (
            <li
              key={itemToString(item)}
              {...getItemProps({
                index,
                item
              })}
              css={listItemStyles(isHighlighted, isSelected)}
            >
              <span>{highlightedItem}</span>
              {badge && <span css={listItemBadgeStyles()}>{badge}</span>}
            </li>
          );
        })}
      </ul>
    ) : (
      <div css={{ height: menuHeight }} />
    );
  };

  setInputRef = el => {
    this.inputRef = el;
  };

  setListRef = (el, getMenuProps) => {
    // Downshift ref for scrolling highlighted item into view
    getMenuProps().ref(el);
    // scroll ref prop
    if (this.props.listRef) {
      this.props.listRef(el);
    }
  };

  render() {
    const {
      disabled,
      id,
      initialSelectedItem,
      isFetchingList,
      itemToString,
      label,
      minChars,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      message,
      stateReducer,
      valid,
      selectItemCollector,
      maxLength,
      menuHeight,
      selectedItemValue,
      placeholder
    } = this.props;

    return (
      <Downshift
        initialSelectedItem={initialSelectedItem}
        isFetchingList={isFetchingList}
        itemToString={itemToString}
        onChange={onChange}
        onInputValueChange={this.onInputValueChange}
        stateReducer={stateReducer}
        selectedItem={selectedItemValue || undefined}
      >
        {({
          setState,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getRootProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          selectItem
        }) => {
          if (selectItemCollector) {
            selectItemCollector(selectItem);
          }
          return (
            <div css={typeaheadStyles()} {...getRootProps()}>
              <div css={labelInputContainerStyles()}>
                {label && (
                  <label {...getLabelProps()} css={labelStyles()}>
                    {label}
                  </label>
                )}
                <input
                  css={inputStyles()}
                  {...getInputProps({
                    disabled,
                    id,
                    maxLength,
                    placeholder: placeholder || itemToString(selectedItem),
                    onFocus: () => {
                      setState({ inputValue: '' });
                      onFocus();
                    },
                    onBlur: () => {
                      setState({ inputValue: itemToString(selectedItem) });
                      onBlur();
                    },
                    onKeyDown,
                    ref: this.setInputRef
                  })}
                />
              </div>
              <div
                css={menuWrapStyles({ menuHeight })}
                ref={el => this.setListRef(el, getMenuProps)}
              >
                {isOpen && !isFetchingList && inputValue.length >= minChars ? (
                  this.renderItems(
                    getMenuProps,
                    getItemProps,
                    highlightedIndex,
                    selectedItem,
                    inputValue,
                    menuHeight
                  )
                ) : (
                  <div css={{ height: menuHeight }}>
                    {isFetchingList && (
                      <div css={{ padding: '16px 10px' }}>
                        Loading airports...
                      </div>
                    )}
                    {message && !valid && <div>{message}</div>}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

Typeahead.propTypes = {
  /** Flag to disable the input */
  disabled: PropTypes.bool,
  /** Optional function to fetch list items asyncronously
   *
   * @param {String} value The input value */
  fetchListOnInput: PropTypes.func,
  /** Optional id for the html input */
  id: PropTypes.string,
  /** Optional selected item when the compoenent first renders */
  initialSelectedItem: PropTypes.shape(),
  /** Flag showing that the list is being fetched asyncronously */
  isFetchingList: PropTypes.bool,
  /** Array of list items */
  items: PropTypes.arrayOf(PropTypes.shape),
  /** Optional function to transform each list item into the string that should
   * be rendered in the menu
   * @param {Object|String} item The list item */
  itemToString: PropTypes.func,
  /** Optional function to transform each list item into the string that should
   * be rendered as the badge
   * @param {Object|String} item The list item */
  badgeToString: PropTypes.func,
  /** Label for the html input */
  label: PropTypes.string,
  /** Triggered when the typeahead loses focus */
  onBlur: PropTypes.func,
  /** Triggered when the typeahead is focused */
  onFocus: PropTypes.func,
  /** Triggered when a list item is selected */
  onChange: PropTypes.func,
  /** Triggered when the keydown event is fired */
  onKeyDown: PropTypes.func,
  /** Triggered when the value of the imput is changed */
  onInputValueChange: PropTypes.func,
  /** Function to filter the array of list items
   *
   * @param {Array} items The array of list items
   * @param {String} inputValue The input value */
  filterItems: PropTypes.func,
  /** Error message to display */
  message: PropTypes.string,
  /** Optional number to only display the menu after a minimum number of characters are typed */
  minChars: PropTypes.number,
  /** String to display in the input when no value is selected or typed */
  placeholder: PropTypes.string,
  /** Optional function to pass as Downshift's stateReducer prop */
  stateReducer: PropTypes.func,
  /** Flag to show whether the typeahead value is valid */
  valid: PropTypes.bool,
  /** Optional function triggered when item is selected
   *
   * @param {Object|String} selectItem The item to select */
  selectItemCollector: PropTypes.func,
  /** Optional function to set a ref on the input element
   *
   * @param {Node} inputRef The input element */
  setRef: PropTypes.func,
  /** Optional maxLength value for the html input */
  maxLength: PropTypes.number,
  /** Optional specify height for the menu */
  menuHeight: PropTypes.string,
  /** Optional specify selectedItemValue to manage selectedItem state externally */
  selectedItemValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ])
};

Typeahead.defaultProps = {
  ...Downshift.propTypes,
  disabled: false,
  fetchListOnInput: undefined,
  id: null,
  initialSelectedItem: null,
  isFetchingList: false,
  itemToString: item => (item ? String(item) : ''),
  badgeToString: () => null,
  items: [],
  label: '',
  onBlur: noop,
  onFocus: noop,
  onChange: noop,
  onKeyDown: noop,
  onInputValueChange: null,
  setRef: noop,
  message: '',
  minChars: 1,
  placeholder: '',
  stateReducer: undefined,
  valid: true,
  maxLength: 100,
  menuHeight: '285px'
};

export default Typeahead;
