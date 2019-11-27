/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from 'emotion';
import { KEY_CODE_SPACE, KEY_CODE_ENTER } from '../../constants/keyCodes';

import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import SelectOnKeyPressContainer from './components/SelectOnKeyPressContainer';
import TickIcon from '../../icons/Tick';
import ChevronDown from '../../icons/ChevronDown';
import noop from '../../utils/noop';
import { colours, layout, fontWeight } from '../../theme/airways';

export function dropdownStyles(
  { highlighted, growMenu, inline, height },
  isFocused,
  isOpen
) {
  return css({
    label: 'runway-dropdown',
    fontFamily: 'Ciutadella',
    fontSize: '18px',
    fontWeight: highlighted ? fontWeight.bold : fontWeight.regular,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.56,
    letterSpacing: 'normal',
    background: colours.mediumGrey,
    borderColor: colours.darkeGrey,
    color: highlighted ? colours.highlights : colours.white,
    textDecoration: highlighted ? 'underline' : 'none',
    position: growMenu ? 'static' : 'relative',
    width: inline ? 'fit-content' : '100%',
    height,
    maxWidth: '100%',
    outline: isFocused && !isOpen ? '-webkit-focus-ring-color auto 5px' : 'none'
  });
}

export function inputWrapperStyles() {
  return css({
    label: 'runway-dropdown__input-wrapper',
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    boxSizing: 'border-box',
    justifyContent: 'space-between'
  });
}

export function inputStyles({ inline }) {
  return css({
    border: '0px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    margin: '-1px',
    position: 'absolute',
    label: 'runway-dropdown__input',
    backgroundColor: 'transparent',
    color: inline ? 'transparent' : 'inherit',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    '::placeholder': {
      color: 'inherit'
    }
  });
}

export function inputSvgStyles({ inline, highlighted }) {
  return css({
    label: 'runway-dropdown__input-svg',
    width: '24px',
    height: '100%',
    fill: highlighted ? colours.highlights : colours.white,
    verticalAlign: 'middle',
    padding: inline ? 0 : `0 ${layout.gutter} 0 0`,
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
    isFocused,
    setFocus,
    label,
    placeholder,
    downshiftProps,
    menuWidth,
    inline
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
    focus: isFocused,
    width: menuWidth
  };

  const inputProps = getInputProps();

  const containerProps = {
    onClick: () => {
      openMenu();
    }
  };

  return (
    <div css={{ width: '100%', height: '100%' }}>
      <label {...getLabelProps()}>{label}</label>
      <div {...containerProps} css={inputWrapperStyles(props)}>
        <span
          css={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            padding: inline ? 0 : `0 0 0 ${layout.gutter}`
          }}
        >
          {inputProps.value}
        </span>
        <input
          css={inputStyles(props)}
          readOnly
          tabIndex="0"
          placeholder={placeholder}
          {...getInputProps({
            onBlur: () => {
              closeMenu();
              setFocus(false);
            },
            onKeyDown: event => {
              const { keyCode } = event;
              if (keyCode === KEY_CODE_SPACE || keyCode === KEY_CODE_ENTER) {
                event.preventDefault();
                event.stopPropagation();
                setFocus(false);
                openMenu();
              }
            },
            onFocus: () => {
              setFocus(true);
            }
          })}
        />
        <span css={inputSvgStyles(props)}>
          <ChevronDown css={inputSvgStyles(props)} />
        </span>
      </div>
      {generateMenu(menuProps)}
    </div>
  );
}

Render.propTypes = {
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
    getInputProps: PropTypes.func,
    getLabelProps: PropTypes.func,
    getMenuProps: PropTypes.func,
    closeMenu: PropTypes.func,
    itemToString: PropTypes.func
  }).isRequired
};

Render.defaultProps = {
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
  state = {
    isFocused: false
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

  setFocus = isFocused => {
    this.setState({ isFocused });
  };

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
    const { isFocused } = this.state;
    const { props, setFocus } = this;
    const { isOpen } = this;

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
            isOpen,
            isFocused,
            setFocus,
            downshiftProps
          };

          this.collectSelectItem(renderProps.downshiftProps.selectItem);
          this.collectSelectedItem(renderProps.downshiftProps.selectedItem);
          return (
            <div css={dropdownStyles(props, isFocused, isOpen)}>
              <SelectOnKeyPressContainer
                items={props.items}
                itemToString={props.downShiftProps.itemToString}
                focus={isFocused}
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
