import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { colours } from '../../theme/airways';
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

export function ListItem(props) {
  const { component: Component = 'li', children, ...otherProps } = props;

  const componentProps = {
    ...otherProps
  };

  return (
    <Component css={styles(componentProps)} {...componentProps}>
      {children}
    </Component>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
  highlighted: PropTypes.bool // TODO: deprecate this as its a crappy api name should be selected which is way more dope
};

export default ListItem;
