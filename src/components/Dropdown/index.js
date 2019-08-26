/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from 'emotion';

import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import SelectOnKeyPressContainer from './components/SelectOnKeyPressContainer';
import TickIcon from '../../icons/Tick';
import ChevronDown from '../../icons/ChevronDown';
import noop from '../../utils/noop';
import { colours, layout } from '../../theme/airways';

export function dropdownStyles({ withPadding }) {
  return css({
    label: 'runway-dropdown',
    fontFamily: 'Ciutadella',
    fontSize: '18px',
    fontWeight: 400,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.56,
    letterSpacing: 'normal',
    background: colours.mediumGrey,
    height: withPadding ? '65px' : '30px',
    borderColor: colours.darkeGrey,
    color: '#ffffff',
    position: 'relative'
  });
}

export function inputWrapperStyles({ withPadding }) {
  return css({
    label: 'runway-dropdown__input-wrapper',
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: withPadding ? 'space-between' : 'flex-end',
    boxSizing: 'border-box'
  });
}

export function inputStyles({ leftAlign, withPadding }) {
  return css({
    label: 'runway-dropdown__input',
    backgroundColor: 'transparent',
    border: 0,
    outline: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontStyle: 'inherit',
    fontWeight: 'inherit',
    fontStretch: 'inherit',
    letterSpacing: 'inherit',
    textTransform: 'none',
    color: 'inherit',
    padding: withPadding ? `0 0 0 ${layout.gutter}` : 0,
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    textAlign: leftAlign ? 'left' : 'right',
    '::placeholder': {
      color: 'inherit'
    }
  });
}

export function inputSvgStyles({ withPadding }) {
  return css({
    label: 'runway-dropdown__input-svg',
    width: '24px',
    height: '100%',
    fill: '#FFFFFF',
    verticalAlign: 'middle',
    padding: withPadding ? `0 ${layout.gutter} 0 0` : 0,
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
    fill: '#323232'
  });
}

function defaultItemToString(item) {
  return item === null ? '' : String(item);
}

function resolveItemAsString(itemToString = defaultItemToString, item) {
  return itemToString(item);
}

function generateMenu(menuProps) {
  const {
    isOpen,
    items,
    getItemProps,
    selectedItem,
    renderItem,
    itemToString,
    highlightedIndex,
    getMenuProps,
    focus,
    width
  } = menuProps;

  const list = items.map((item, index) => {
    const itemString = resolveItemAsString(itemToString, item);

    const props = {
      highlighted: highlightedIndex === index,
      selected: selectedItem.name === item.name,
      key: `${itemString}-${index}`,
      item
    };

    const itemProps = getItemProps({ ...props });

    return (
      <MenuItem {...itemProps}>{renderItem(item, index, itemProps)}</MenuItem>
    );
  });

  return (
    <Menu {...getMenuProps({ focus, width })} isOpen={isOpen}>
      {list}
    </Menu>
  );
}

function Render(props) {
  const {
    items,
    renderItem,
    focus,
    label,
    placeholder,
    downshiftProps,
    menuWidth
  } = props;

  const {
    isOpen,
    getItemProps,
    selectedItem,
    highlightedIndex,
    openMenu,
    getInputProps,
    getLabelProps,
    getMenuProps,
    closeMenu,
    itemToString
  } = downshiftProps;

  const menuProps = {
    isOpen,
    items,
    getItemProps,
    selectedItem,
    renderItem,
    itemToString,
    highlightedIndex,
    getMenuProps,
    focus,
    width: menuWidth
  };

  const inputProps = getInputProps({
    onClick: () => {
      openMenu();
    }
  });

  return (
    <div css={{ width: '100%', height: '100%' }}>
      <label {...getLabelProps()}>{label}</label>
      <span css={inputWrapperStyles(props)}>
        <input
          {...inputProps}
          css={inputStyles(props)}
          readOnly
          tabIndex="0"
          placeholder={placeholder}
          onBlur={() => {
            closeMenu();
          }}
          onFocus={() => {
            openMenu();
          }}
        />
        <span {...inputProps} css={inputSvgStyles(props)}>
          <ChevronDown css={inputSvgStyles(props)} />
        </span>
        {generateMenu(menuProps)}
      </span>
    </div>
  );
}

Render.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func,
  focus: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  leftAlign: PropTypes.bool,
  downshiftProps: PropTypes.shape({
    isOpen: PropTypes.bool,
    getItemProps: PropTypes.func,
    selectedItem: PropTypes.object,
    highlightedIndex: PropTypes.number,
    openMenu: PropTypes.func,
    getInputProps: PropTypes.func,
    getLabelProps: PropTypes.func,
    getMenuProps: PropTypes.func,
    closeMenu: PropTypes.func,
    itemToString: PropTypes.func
  }).isRequired,
  menuWidth: PropTypes.string
};

Render.defaultProps = {
  items: [],
  renderItem: noop,
  focus: false,
  label: '',
  placeholder: '',
  leftAlign: false,
  menuWidth: null
};

export default class Dropdown extends React.Component {
  state = {
    focus: false
  };

  // eslint-disable-next-line consistent-return
  componentDidUpdate = prevProps => {
    if (this.itemsChanged(prevProps.items, this.props.items)) {
      if (
        this.validItem(this.downshiftSelectedItem) &&
        this.itemsContains(this.downshiftSelectedItem)
      )
        return this.downshiftSelectItem(this.downshiftSelectedItem);
      if (
        this.validItem(this.props.defaultItemWhenNoneSelected) &&
        this.itemsContains(this.props.defaultItemWhenNoneSelected)
      )
        return this.downshiftSelectItem(this.props.defaultItemWhenNoneSelected);
      return this.downshiftSelectItem(this.props.items[0]);
    }
  };

  setFocus(focus) {
    this.setState({ focus });
  }

  itemsContains = target =>
    !!this.props.items.filter(item => item.value === target.value).length;

  itemsChanged = (prevItems, nextItems) =>
    prevItems.length !== nextItems.length ||
    !prevItems.every(prevItem =>
      nextItems.some(nextItem => nextItem.value === prevItem.value)
    );

  collectSelectItem = selectItem => {
    this.downshiftSelectItem = selectItem;
  };

  collectSelectedItem = selectedItem => {
    this.downshiftSelectedItem = selectedItem;
  };

  getInitialSelectedItem = () =>
    this.validItem(this.props.initialSelectedItem)
      ? this.props.initialSelectedItem
      : this.props.items[0];

  validItem = item =>
    item && typeof item.name === 'string' && typeof item.value === 'string';

  render() {
    const { focus } = this.state;
    const { props, setFocus } = this;

    return (
      <Downshift
        {...props.downShiftProps}
        onChange={(selectedItem, stateAndHelpers) => {
          if (typeof props.onChange === 'function') {
            props.onChange(selectedItem, stateAndHelpers);
          }
        }}
        initialSelectedItem={this.getInitialSelectedItem()}
      >
        {downshiftProps => {
          const renderProps = {
            ...props,
            focus,
            setFocus,
            downshiftProps
          };

          this.collectSelectItem(renderProps.downshiftProps.selectItem);
          this.collectSelectedItem(renderProps.downshiftProps.selectedItem);
          return (
            <div css={dropdownStyles(props)}>
              <SelectOnKeyPressContainer
                items={props.items}
                itemToString={props.downShiftProps.itemToString}
                focus={focus}
                downshiftProps={downshiftProps}
              >
                <Render {...renderProps} />
              </SelectOnKeyPressContainer>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

function renderDefaultItem(item, index, props) {
  return (
    <span css={itemContainerStyles(props)}>
      <span css={itemSvgContainerStyles(props)}>
        <TickIcon css={itemSvgStyles(props)} />
      </span>
      <span>{item.name}</span>
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
  /** Flag to display variant with vertical padding */
  withPadding: PropTypes.bool,
  /** @ignore */
  focus: PropTypes.bool,
  /** @ignore */
  downShiftProps: PropTypes.shape({
    itemToString: PropTypes.func
  }),
  /** Optional string to set the width of the menu */
  menuWidth: PropTypes.string,
  /** Flag to display variant left aligned text */
  leftAlign: PropTypes.bool,
  /** Triggered when the user changes the value
   *
   * @param {Object} selectedItem New value
   * @param {Object} stateAndHelpers stateAndHelpers object from Downshift */
  onChange: PropTypes.func
};

Dropdown.defaultProps = {
  withPadding: false,
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
  leftAlign: PropTypes.false,
  onChange: null
};
