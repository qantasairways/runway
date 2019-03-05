import React, { PureComponent } from 'react';

export class Menu extends PureComponent {
  render() {
    const { isOpen, focus, ...props } = this.props;
    return <ul {...props} css={{ display: isOpen ? 'block' : 'none' }} />;
  }
}

export const MenuItem = ({ highlighted, isLast, ...props }) => {
  return <li {...props} css={{ fontWeight: highlighted ? 700 : 400 }} />;
};
