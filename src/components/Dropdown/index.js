/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from 'emotion';
import {
  CSS_SELECTOR_HOVER,
  CSS_SELECTOR_ACTIVE,
  CSS_SELECTOR_FOCUS
} from '../../constants/css';

import TickIcon from '../../icons/Tick';
import ChevronDown from '../../icons/ChevronDown';
import noop from '../../utils/noop';
import { colours, layout, fontWeight, fontSize } from '../../theme/airways';

export function dropdownStyles({ highlighted, growMenu, inline, height }) {
  return css({
    label: 'runway-dropdown',
    fontSize: '18px',
    fontWeight: highlighted ? fontWeight.bold : fontWeight.regular,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.56,
    letterSpacing: 'normal',
    color: highlighted ? colours.highlights : colours.white,
    textDecoration: highlighted ? 'underline' : 'none',
    position: growMenu ? 'static' : 'relative',
    width: inline ? 'fit-content' : '100%',
    height,
    maxWidth: '100%'
  });
}

export function buttonWrapperStyles({ highlighted, growMenu, inline, height }) {
  return css({
    label: 'runway-dropdown__input-wrapper',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    padding: inline ? 0 : `0 ${layout.gutter}`,
    fontSize: fontSize.label,
    fontWeight: highlighted ? fontWeight.bold : fontWeight.regular,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.56,
    letterSpacing: 'normal',
    background: colours.mediumGrey,
    borderColor: colours.mediumGrey,
    color: highlighted ? colours.highlights : colours.white,
    textDecoration: highlighted ? 'underline' : 'none',
    position: growMenu ? 'static' : 'relative',
    width: inline ? 'fit-content' : '100%',
    height,
    maxWidth: '100%'
  });
}

export function inputSvgStyles({ highlighted }) {
  return css({
    label: 'runway-dropdown__input-svg',
    width: '24px',
    height: '100%',
    fill: highlighted ? colours.highlights : colours.white,
    verticalAlign: 'middle',
    padding: 0,
    boxSizing: 'content-box'
  });
}

export function itemSvgContainerStyles({ selected }) {
  const visibility = selected ? 'visible' : 'hidden';

  return css({
    label: 'runway-dropdown__item-svg-container',
    visibility,
    marginRight: '10px'
  });
}

export function itemContainerStyles() {
  return css({
    label: 'runway-dropdown__item-container',
    display: 'inline-flex'
  });
}

export function itemSvgStyles() {
  return css({
    label: 'runway-dropdown__item-svg',
    width: '24px',
    fill: colours.darkerGrey
  });
}

export function menuStyles({ width }) {
  return css({
    label: 'runway-dropdown__menu',
    minWidth: '240px',
    borderRadius: '4px',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    border: 'solid 1px #dadada',
    backgroundColor: '#ffffff',
    listStyle: 'none',
    position: 'absolute',
    zIndex: '5',
    margin: 0,
    top: '0',
    left: '0',
    width: width || '100%',
    boxSizing: 'border-box',
    padding: '10px'
  });
}

export function menuItemsStyles({ highlighted }) {
  return css({
    label: 'runway-dropdown__menu-item',
    fontWeight: 400,
    backgroundColor: highlighted ? colours.lightGrey : 'none',
    color: colours.darkerGrey,
    boxSizing: 'border-box',
    padding: '10px',
    minHeight: '50px',
    [`${CSS_SELECTOR_HOVER}, ${CSS_SELECTOR_ACTIVE}, ${CSS_SELECTOR_FOCUS}`]: {
      backgroundColor: colours.lightGrey
    }
  });
}

function DropdownMenu(props) {
  const { items, renderItem, downshiftProps, menuWidth } = props;

  const {
    isOpen,
    getItemProps,
    selectedItem,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getInputProps
  } = downshiftProps;

  const inputProps = getInputProps();

  return (
    <div css={{ width: '100%', height: '100%' }}>
      <button
        css={buttonWrapperStyles(props)}
        type="button"
        {...getToggleButtonProps({
          'aria-activedescendant': inputProps['aria-activedescendant'],
          'aria-label': selectedItem && `${selectedItem.name} selected`
        })}
      >
        <span
          css={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {selectedItem && selectedItem.name}
        </span>
        <span css={inputSvgStyles(props)}>
          <ChevronDown css={inputSvgStyles(props)} />
        </span>
      </button>
      {!isOpen ? null : (
        <ul css={menuStyles({ menuWidth })} {...getMenuProps()}>
          {items.map((item, index) => {
            const itemProps = getItemProps({
              highlighted: highlightedIndex === index,
              selected: selectedItem && selectedItem.name === item.name,
              key: index,
              item
            });

            return (
              <li {...itemProps} css={menuItemsStyles(itemProps)}>
                {renderItem(item, index, itemProps)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func,
  focus: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  menuWidth: PropTypes.string,
  height: PropTypes.string,
  highlighted: PropTypes.bool,
  inline: PropTypes.bool,
  growMenu: PropTypes.bool,
  downshiftProps: PropTypes.shape({
    isOpen: PropTypes.bool,
    getItemProps: PropTypes.func,
    selectedItem: PropTypes.object,
    highlightedIndex: PropTypes.number,
    openMenu: PropTypes.func,
    getToggleButtonProps: PropTypes.func,
    getMenuProps: PropTypes.func,
    getInputProps: PropTypes.func,
    closeMenu: PropTypes.func,
    itemToString: PropTypes.func
  }).isRequired
};

DropdownMenu.defaultProps = {
  items: [],
  renderItem: noop,
  focus: false,
  label: '',
  placeholder: '',
  menuWidth: null,
  height: null,
  highlighted: false,
  inline: false,
  growMenu: false
};

export default class Dropdown extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.initialSelectedItem !== this.props.initialSelectedItem) {
      /* eslint-disable no-console */
      console.warn(
        'Runway Dropdown: initialSelectedItem should not change, please use selectedItem if you want a controlled component'
      );
    }
  }

  getInitialSelectedItem = () =>
    this.validItem(this.props.initialSelectedItem)
      ? this.props.initialSelectedItem
      : this.props.items[0];

  getSelectedItem = () =>
    this.validItem(this.props.selectedItem) && this.props.selectedItem;

  validItem = item => {
    const { items } = this.props;
    return (
      item &&
      typeof item.name === 'string' &&
      typeof item.value === 'string' &&
      items.includes(item)
    );
  };

  render() {
    const { props, isOpen } = this;

    return (
      <Downshift
        {...props.downShiftProps}
        onChange={(selectedItem, stateAndHelpers) => {
          if (typeof props.onChange === 'function') {
            props.onChange(selectedItem, stateAndHelpers);
          }
        }}
        initialSelectedItem={this.getInitialSelectedItem()}
        selectedItem={this.getSelectedItem()}
      >
        {downshiftProps => {
          const renderProps = {
            ...props,
            isOpen,
            downshiftProps
          };
          return (
            <div css={dropdownStyles(props)}>
              <DropdownMenu {...renderProps} />
            </div>
          );
        }}
      </Downshift>
    );
  }
}

function renderDefaultItem(item, props) {
  return (
    <span css={itemContainerStyles(props)}>
      <span css={itemSvgContainerStyles(props)}>
        <TickIcon css={itemSvgStyles(props)} />
      </span>
      <span css={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
        {item.name}
      </span>
    </span>
  );
}

Dropdown.propTypes = {
  /** Array of list items for the dropdown */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  /** Prop to render each list item. Must return an element. */
  renderItem: PropTypes.func,
  /** @ignore */
  focus: PropTypes.bool,
  /** @ignore */
  downShiftProps: PropTypes.shape({
    itemToString: PropTypes.func
  }),
  /** Optional string to set the width of the menu */
  menuWidth: PropTypes.string,
  /** Optional string to set the height of the dropdown */
  height: PropTypes.string,
  /** Triggered when the user changes the value
   *
   * @param {Object} selectedItem New value
   * @param {Object} stateAndHelpers stateAndHelpers object from Downshift */
  onChange: PropTypes.func,
  /** Optional flag to use highlighted styles */
  highlighted: PropTypes.bool,
  /** Optional flag to make the dropdown inline rather than full width */
  inline: PropTypes.bool,
  /**
   * Optional flag to allow the dropdown menu to grow larger than the dropdown container
   * Setting this flag to true requires a parent to have `position:absolute;` applied */
  growMenu: PropTypes.bool
};

Dropdown.defaultProps = {
  renderItem: renderDefaultItem,
  focus: false,
  downShiftProps: {
    itemToString: selectedItem => {
      if (!selectedItem || !selectedItem.name) {
        return '';
      }
      return String(selectedItem.name);
    }
  },
  menuWidth: null,
  height: '100%',
  onChange: null,
  highlighted: false,
  inline: false,
  growMenu: false
};
