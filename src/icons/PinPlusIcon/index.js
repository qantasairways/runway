import React from 'react';

import SvgIcon from '../../components/SvgIcon';

export default function PinPlusIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M16.667 11.333a5.333 5.333 0 1 1 0 10.667 5.333 5.333 0 0 1 0-10.667zm2.666 6a.667.667 0 1 0 0-1.333h-2v-2A.667.667 0 1 0 16 14v2h-2a.667.667 0 0 0 0 1.333h2v2a.667.667 0 1 0 1.333 0v-2h2zm-9.366-.666c0 .893.182 1.778.533 2.6-1.033 1.266-1.833 2.066-1.833 2.066S2 14.667 2 8.667a6.667 6.667 0 1 1 13.333 0 9.167 9.167 0 0 1-.133 1.5 6.667 6.667 0 0 0-5.233 6.5zm-1.3-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </SvgIcon>
  );
}
