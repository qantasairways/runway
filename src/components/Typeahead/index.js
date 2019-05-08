/* eslint jsx-a11y/label-has-associated-control: "off",
jsx-a11y/label-has-for: "off" */ // These attributes are generated by the Downshift library

import React, { Component } from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';
import { findAll } from 'highlight-words-core';

import { colours } from '../../theme/airways';
import noop from '../../utils/noop';

function typeaheadStyles() {
  return {
    lineHeight: 1.53
  };
}

function labelInputContainerStyles() {
  return {
    width: '100%',
    padding: '0 10px'
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
    padding: '14px 10px 10px 10px'
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

function menuStyles() {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    margin: '10px 0'
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
    display: 'inline-flex',
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center'
  };
}

function listItemBadgeStyles() {
  return {
    marginLeft: 'auto',
    fontSize: '16px',
    textAlign: 'right',
    borderRadius: '3px',
    backgroundColor: '#8de2e0',
    fontWeight: 600,
    padding: '2px 3px 0px'
  };
}

function highlightedListItemStyles() {
  return {
    fontWeight: 600
  };
}

class Typeahead extends Component {
  constructor(props) {
    super(props);

    const { placeholder } = props;

    this.state = {
      placeholder
    };
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
    inputValue
  ) => {
    const { items, itemToString, fetchListOnInput, badgeToString } = this.props;
    const filteredItems = fetchListOnInput
      ? items
      : this.filterItems(items, inputValue);

    return (
      <ul {...getMenuProps()} css={menuStyles()}>
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
              {highlightedItem}
              {badge && <span css={listItemBadgeStyles()}>{badge}</span>}
            </li>
          );
        })}
      </ul>
    );
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
      message,
      stateReducer,
      valid,
      selectItemCollector,
      maxLength
    } = this.props;

    const { placeholder } = this.state;

    return (
      <Downshift
        initialSelectedItem={initialSelectedItem}
        isFetchingList={isFetchingList}
        itemToString={itemToString}
        onChange={onChange}
        onInputValueChange={this.onInputValueChange}
        stateReducer={stateReducer}
      >
        {({
          setState,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
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
            <div css={typeaheadStyles()}>
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
                    placeholder,
                    maxLength,
                    onFocus: e => {
                      setState({
                        inputValue: ''
                      });
                      this.setState({
                        placeholder: e.target.value
                      });
                      onFocus();
                    },
                    onBlur: () => {
                      setState({
                        inputValue: itemToString(selectedItem),
                        placeholder: ''
                      });
                      this.setState({
                        placeholder: ''
                      });
                      onBlur();
                    }
                  })}
                />
              </div>
              {isOpen && !isFetchingList && inputValue.length >= minChars
                ? this.renderItems(
                    getMenuProps,
                    getItemProps,
                    highlightedIndex,
                    selectedItem,
                    inputValue
                  )
                : null}
              {isFetchingList && <span>Loading...</span>}
              {message && !valid && <div>{message}</div>}
            </div>
          );
        }}
      </Downshift>
    );
  }
}

Typeahead.propTypes = {
  disabled: PropTypes.bool,
  fetchListOnInput: PropTypes.func,
  id: PropTypes.string,
  initialSelectedItem: PropTypes.shape(),
  isFetchingList: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape),
  itemToString: PropTypes.func,
  badgeToString: PropTypes.func,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onInputValueChange: PropTypes.func,
  filterItems: PropTypes.func,
  message: PropTypes.string,
  minChars: PropTypes.number,
  placeholder: PropTypes.string,
  stateReducer: PropTypes.func,
  valid: PropTypes.bool,
  selectItemCollector: PropTypes.func,
  maxLength: PropTypes.number
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
  onInputValueChange: noop,
  message: '',
  minChars: 0,
  placeholder: '',
  stateReducer: undefined,
  valid: true,
  maxLength: 100
};

export default Typeahead;
