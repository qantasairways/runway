import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { colours, layout, fontWeight, fontSize } from '../../theme/airways';
import TickIcon from '../../icons/Tick';
import MenuItem from '../MenuItem';

export function itemContainerStyles() {
  return css({
    label: 'runway-dropdown__item-container',
    display: 'inline-flex'
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

export function itemSvgStyles() {
  return css({
    label: 'runway-dropdown__item-svg',
    width: '24px',
    fill: colours.darkerGrey
  });
}

const ListItem = React.forwardRef(function ListItem(props, ref) {
  const {
    component: Component = 'span',
    children,
    item,
    ...otherProps
  } = props;

  return (
    <MenuItem {...otherProps}>
      <Component css={itemContainerStyles(props)}>
        <span css={itemSvgContainerStyles(props)}>
          <TickIcon css={itemSvgStyles(props)} />
        </span>
        <span css={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {children}
        </span>
      </Component>
    </MenuItem>
  );
});

ListItem.propTypes = {
  children: PropTypes.node,
  component: PropTypes.elementType
};
export default ListItem;
