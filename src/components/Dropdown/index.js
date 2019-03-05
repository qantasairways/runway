import * as React from 'react';
import Downshift from 'downshift';

import { Menu, MenuItem } from './components/Menu';
import SelectOnKeyPressContainer from './components/SelectOnKeyPressContainer';

const render = props => downshiftProps => {
  const {
    items,
    renderItem,
    itemToString,
    focus,
    setFocus,
    label,
    placeholder
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
    closeMenu
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

  return (
    <div>
      <label {...getLabelProps()}>{label}</label>
      <input
        {...getInputProps({
          onClick: event => {
            openMenu();
          },
          'aria-label': 'Social Media Dropdown'
        })}
        readOnly
        tabIndex="0"
        placeholder={placeholder}
        onBlur={e => {
          selectHighlightedItem();
          closeMenu();
        }}
        onFocus={e => {
          openMenu();
        }}
      />
      {generateMenu(menuProps)}
    </div>
  );
};

const generateMenu = menuProps => {
  const {
    width,
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

  const defaultItemToString = item => (item === null ? '' : String(item));

  const resolveItemAsString = (itemToString = defaultItemToString, item) => {
    return itemToString(item);
  };

  const list = items.map((item, index) => {
    const isLast = lastIndex === index;

    const itemString = resolveItemAsString(itemToString, item);

    const props = {
      highlighted: highlightedIndex === index,
      selected: selectedItem === item,
      isLast,
      key: `${itemString}-${index}`,
      item
    };

    return (
      <MenuItem {...getItemProps({ ...props })}>
        {renderItem(item, index)}
      </MenuItem>
    );
  });
  return (
    <Menu {...getMenuProps({ focus })} isOpen={isOpen}>
      {list}
    </Menu>
  );
};

class Dropdown extends React.Component {
  state = { focus: false };

  render() {
    const { focus } = this.state;
    const { props } = this;
    const renderProps = {
      ...props,
      focus,
      setFocus: focus => this.setState({ focus })
    };

    return (
      <Downshift
        {...props.downShiftProps}
        onChange={props.onChange}
        initialSelectedItem={props.initialSelectedItem}
      >
        {downshiftProps => {
          return (
            <div>
              <SelectOnKeyPressContainer
                items={props.items}
                itemToString={props.downShiftProps.itemToString}
                focus={focus}
                downshiftProps={downshiftProps}
                children={render(renderProps)(downshiftProps)}
              />
            </div>
          );
        }}
      </Downshift>
    );
  }
}

Dropdown.defaultProps = {
  items: [],
  renderItem: props => <span>{props.name}</span>,
  label: '',
  placeholder: '',
  onChange: undefined,
  initialSelectedItem: null,
  downShiftProps: {
    itemToString: selectedItem => {
      if (selectedItem && selectedItem.name) {
        return String(selectedItem.name);
      }
    }
  }
};

export default Dropdown;
