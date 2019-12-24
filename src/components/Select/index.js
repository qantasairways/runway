/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */
import * as React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { css } from 'emotion';

import SelectOnKeyPressContainer from './components/SelectOnKeyPressContainer';

import ListItem from '../ListItem';
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
    label: 'runway-dropdown__button-wrapper',
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
    border: 0,
    color: highlighted ? colours.highlights : colours.white,
    textDecoration: highlighted ? 'underline' : 'none',
    width: inline ? 'fit-content' : '100%',
    height,
    maxWidth: '100%'
  });
}

export function buttonSvgStyles({ highlighted }) {
  return css({
    label: 'runway-dropdown__button-svg',
    width: '24px',
    height: '100%',
    fill: highlighted ? colours.highlights : colours.white,
    verticalAlign: 'middle',
    padding: 0,
    boxSizing: 'content-box'
  });
}

function DropdownMenu(props) {
  const { items, renderItem, downshiftProps, menuWidth, ariaLabel } = props;

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
        css={buttonStyles(props)}
        type="button"
        {...getToggleButtonProps({
          'aria-activedescendant': inputProps['aria-activedescendant'],
          'aria-label':
            selectedItem && `${ariaLabel} Menu, ${selectedItem.name} selected`
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
        <span css={buttonSvgStyles(props)}>
          <ChevronDown css={buttonSvgStyles(props)} />
        </span>
      </button>
      {!isOpen ? null : (
        <MenuList {...getMenuProps()}>
          {items.map((item, index) => {
            const itemProps = getItemProps({
              highlighted: highlightedIndex === index,
              selected: selectedItem && selectedItem.name === item.name,
              key: index,
              item
            });

            return (
              <ListItem {...itemProps}>
                {renderItem(item, index, itemProps)}
              </ListItem>
            );
          })}
        </MenuList>
      )}
    </div>
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
