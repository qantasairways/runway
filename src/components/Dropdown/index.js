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
    focus
  } = menuProps;

  const lastIndex = items.length - 1;

  const list = items.map((item, index) => {
    const isLast = lastIndex === index;

    const itemString = resolveItemAsString(itemToString, item);

    const props = {
      highlighted: highlightedIndex === index,
      selected: selectedItem.name === item.name,
      isLast,
      key: `${itemString}-${index}`,
      item
    };

    const itemProps = getItemProps({ ...props });

    return (
      <MenuItem {...itemProps}>{renderItem(item, index, itemProps)}</MenuItem>
    );
  });

  return (
    <Menu {...getMenuProps({ focus })} isOpen={isOpen}>
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
    downshiftProps
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
    selectHighlightedItem,
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
    focus
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
            selectHighlightedItem();
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
    selectedItem: PropTypes.number,
    highlightedIndex: PropTypes.number,
    openMenu: PropTypes.func,
    getInputProps: PropTypes.func,
    getLabelProps: PropTypes.func,
    getMenuProps: PropTypes.func,
    selectHighlightedItem: PropTypes.number,
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
  leftAlign: false
};

export default class Dropdown extends React.Component {
  state = { focus: false, downshiftSelectedItem: null };

  componentDidUpdate(prevProps) {
    if (this.props.items.length !== prevProps.items.length) {
      debugger;
      if (
        this.props.items.filter(
          item => item.value === this.state.downshiftSelectedItem.value
        ).length === 0
      ) {
        return this.downshiftStateAndHelpers.selectItem(
          this.props.defaultItemWhenNoneSelected
        );
      }
    }
  }

  setFocus(focus) {
    this.setState({ focus });
  }

  render() {
    const { focus } = this.state;

    const { props, setFocus } = this;

    return (
      <Downshift
        {...props.downShiftProps}
        onChange={(selectedItem, stateAndHelpers) => {
          this.setState({ downshiftSelectedItem: selectedItem });
          this.downshiftStateAndHelpers = stateAndHelpers;
          props.onChange(selectedItem, stateAndHelpers);
        }}
        initialSelectedItem={props.initialSelectedItem}
      >
        {downshiftProps => {
          const renderProps = {
            ...props,
            focus,
            setFocus,
            downshiftProps
          };
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  renderItem: PropTypes.func,
  withPadding: PropTypes.bool,
  focus: PropTypes.bool,
  downShiftProps: PropTypes.shape({
    itemToString: PropTypes.func
  })
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
  }
};
