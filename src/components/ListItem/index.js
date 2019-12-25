import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { colours, layout, fontWeight, fontSize } from '../../theme/airways';
import {
  CSS_SELECTOR_HOVER,
  CSS_SELECTOR_ACTIVE,
  CSS_SELECTOR_FOCUS
} from '../../constants/css';

export function styles({ highlighted }) {
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

const ListItem = React.forwardRef(function ListItem(props, ref) {
  const {
    component: Component = 'li',
    children: childrenProp = [],
    ...otherProps
  } = props;

  const componentProps = {
    ...otherProps
  };

  const children = React.Children.toArray(childrenProp);

  return (
    <Component css={styles(componentProps)} {...componentProps}>
      {children}
    </Component>
  );
});

ListItem.propTypes = {
  children: PropTypes.node, // TODO: make a custom propType validation that needs to be treeshaken for efficiency yo
  highlighted: PropTypes.bool // TODO: deprecate this as its a crappy api name should be selected which is way more dope
};

export default ListItem;
