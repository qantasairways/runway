import React from 'react';

import SvgIcon from '../../components/SvgIcon';

export default function ChevronDown(props) {
  return (
    <SvgIcon {...props}>
      <path d="M2.12 1.29L6 5.17l3.88-3.88a.996.996 0 1 1 1.41 1.41L6.7 7.29a.996.996 0 0 1-1.41 0L.7 2.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z" />
    </SvgIcon>
  );
}
