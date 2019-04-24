import React from 'react';
import PropTypes from 'prop-types';

import noop from '../../../utils/noop';
import { colours, layout, fontFamily } from '../../../theme/airways';

import CrossIcon from '../../../icons/CrossIcon';

const ICON_SIZE = '32px';

function Header({
  closePopup,
  closeAriaLabel,
  headerLabel,
  headerHeight,
  HeaderIcon,
  renderHeaderChildren
}) {
  return (
    <div css={{ zIndex: 1 }}>
      <div
        css={{
          fontFamily: fontFamily.bold,
          background: colours.darkerGrey,
          color: colours.white,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `0 0 0 ${layout.gutter}`
        }}
      >
        {HeaderIcon && (
          <HeaderIcon
            height={ICON_SIZE}
            width={ICON_SIZE}
            css={{ fill: colours.white, marginRight: '8px' }}
          />
        )}
        <span
          css={{
            flex: 1,
            justifySelf: 'left'
          }}
        >
          {headerLabel}
        </span>
        <button
          aria-label={closeAriaLabel}
          onClick={closePopup}
          type="button"
          css={{
            background: 'none',
            height: `${headerHeight}px`,
            padding: 0,
            lineHeight: 0,
            border: 'none',
            width: '52px',
            cursor: 'pointer'
          }}
        >
          <CrossIcon
            css={{ fill: 'white' }}
            height={ICON_SIZE}
            width={ICON_SIZE}
          />
        </button>
      </div>
      {renderHeaderChildren()}
    </div>
  );
}

Header.propTypes = {
  closePopup: PropTypes.func.isRequired,
  closeAriaLabel: PropTypes.string,
  headerLabel: PropTypes.string,
  headerHeight: PropTypes.number,
  HeaderIcon: PropTypes.func,
  renderHeaderChildren: PropTypes.func
};

Header.defaultProps = {
  closeAriaLabel: '',
  headerLabel: '',
  headerHeight: 65,
  HeaderIcon: null,
  renderHeaderChildren: noop
};

export default Header;
