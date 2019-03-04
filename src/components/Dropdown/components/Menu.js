import * as React from 'react';

export const Menu = ({ isOpen, ...props }) => {
  return <ul {...props} css={{ display: isOpen ? 'block' : 'none' }} />;
};

export const MenuItem = ({ highlighted, ...props }) => {
  return <li {...props} css={{ fontWeight: highlighted ? 700 : 400 }} />;
};
