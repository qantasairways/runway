/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from 'emotion';

import SelectOnKeyPressContainer from './components/SelectOnKeyPressContainer';

import { ButtonBase } from '../ButtonBase';
import { List } from '../List';
import { MenuItem } from '../MenuItem';
import ChevronDown from '../../icons/ChevronDown';
import noop from '../../utils/noop';
import { colours, layout, fontWeight, fontSize } from '../../theme/airways';

export function dropdownMenuContainerStyles({
  highlighted,
  growMenu,
  inline,
  height
}) {
  return css({
    label: 'runway-dropdown__container',
    color: highlighted ? colours.highlights : colours.white,
    position: growMenu ? 'static' : 'relative',
    width: inline ? 'fit-content' : '100%',
    height,
    maxWidth: '100%'
  });
}

export function buttonStyles({ highlighted, inline, height }) {
  return css({
    justifyContent: 'space-between',
    padding: inline ? 0 : `0 ${layout.gutter}`, // TODO: remove variants
    fontSize: fontSize.label, // TODO: better name this variable
    fontWeight: highlighted ? fontWeight.bold : fontWeight.regular, // TODO: remove variants
    lineHeight: 1.56, // TODO: Line heights are bad
    background: colours.mediumGrey, // TODO: theme this bad boy
    color: highlighted ? colours.highlights : colours.white, // TODO: remove variants
    textDecoration: highlighted ? 'underline' : 'none', // TODO: remove variants
    width: inline ? 'fit-content' : '100%', // TODO: remove variants
    height // TODO: why, if anything should be padding :scream:
  });
}

export function buttonSvgStyles({ highlighted }) {
  return css({
    label: 'runway-dropdown__button-svg',
    width: '24px',
    height: '100%',
    fill: highlighted ? colours.highlights : colours.white,
    verticalAlign: 'middle',
    padding: 0
  });
}

function DropdownMenu(props) {
  const {
    items,
    renderItem,
    downshiftProps,
    menuWidth,
    ariaLabel,
    className
  } = props;

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

  const toggleButtonProps = getToggleButtonProps({
    'aria-activedescendant': inputProps['aria-activedescendant'],
    'aria-label':
      selectedItem && `${ariaLabel} Menu, ${selectedItem.name} selected`
  });

  return (
    <React.Fragment>
      <ButtonBase
        css={css(buttonStyles(props), className)}
        {...toggleButtonProps}
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
        <span css={buttonSvgStyles(props)}>
          <ChevronDown css={buttonSvgStyles(props)} />
        </span>
      </ButtonBase>
      {!isOpen ? null : (
        <List {...getMenuProps()} width={menuWidth}>
          {items.map((item, index) => {
            const itemProps = getItemProps({
              highlighted: highlightedIndex === index,
              selected: selectedItem && selectedItem.name === item.name,
              key: index,
              item
            });

            return (
              <MenuItem {...itemProps}>
                {renderItem(item, index, itemProps)}
              </MenuItem>
            );
          })}
        </List>
      )}
    </React.Fragment>
  );
}

DropdownMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  renderItem: PropTypes.func,
  label: PropTypes.string,
  menuWidth: PropTypes.string,
  ariaLabel: PropTypes.string,
  height: PropTypes.string,
  highlighted: PropTypes.bool,
  inline: PropTypes.bool,
  growMenu: PropTypes.bool,
  downshiftProps: PropTypes.shape({
    isOpen: PropTypes.bool,
    getItemProps: PropTypes.func,
    selectedItem: PropTypes.object,
    highlightedIndex: PropTypes.number,
    getToggleButtonProps: PropTypes.func,
    getMenuProps: PropTypes.func,
    getInputProps: PropTypes.func,
    itemToString: PropTypes.func
  }).isRequired
};

DropdownMenu.defaultProps = {
  items: [],
  renderItem: noop,
  label: '',
  menuWidth: null,
  ariaLabel: '',
  height: null,
  highlighted: false,
  inline: false,
  growMenu: false
};

export default class Select extends React.Component {
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
            <div css={dropdownMenuContainerStyles(props, isOpen)}>
              <SelectOnKeyPressContainer
                items={props.items}
                itemToString={props.downShiftProps.itemToString}
                downshiftProps={downshiftProps}
              >
                <DropdownMenu {...renderProps} />
              </SelectOnKeyPressContainer>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

function renderDefaultItem(item) {
  return item.name;
}

Select.propTypes = {
  /** Array of list items for the dropdown */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  /** Prop to render each list item. Must return an element. */
  renderItem: PropTypes.func,
  downShiftProps: PropTypes.shape({
    itemToString: PropTypes.func
  }),
  /** Optional string to set the width of the menu */
  menuWidth: PropTypes.string,
  /** Optional string set the aria label to call dropdown name */
  ariaLabel: PropTypes.string,
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

Select.defaultProps = {
  renderItem: renderDefaultItem,
  downShiftProps: {
    itemToString: selectedItem => {
      if (!selectedItem || !selectedItem.name) {
        return '';
      }
      return String(selectedItem.name);
    }
  },
  menuWidth: null,
  ariaLabel: '',
  height: '100%',
  onChange: null,
  highlighted: false,
  inline: false,
  growMenu: false
};
