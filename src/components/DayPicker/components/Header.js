import React from 'react';
import PropTypes from 'prop-types';

import { colours, fontFamily } from '../../../theme/airways';

import CrossIcon from '../../../icons/CrossIcon';

const ICON_SIZE = '32px';

const weekdayStyles = {
  width: '100%',
  padding: '8px 0',
  fontFamily: fontFamily.body,
  fontSize: '0.875rem',
  lineHeight: '0.875rem',
  textAlign: 'center',
  background: colours.disabledGrey,
  boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08), 0 0 1px 0 rgba(0, 0, 0, 0.04)'
};

function orderLabels(firstDayOfWeek, dayLabels) {
  return dayLabels
    .slice(firstDayOfWeek)
    .concat(dayLabels.slice(0, firstDayOfWeek));
}

function Header({
  closeDialog,
  firstDayOfWeek,
  closeAriaLabel,
  headerLabel,
  dayLabels,
  rowStyles
}) {
  const orderedLabels = orderLabels(firstDayOfWeek, dayLabels);

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
          padding: '0 0 0 12px'
        }}
      >
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
          onClick={closeDialog}
          type="button"
          css={{
            background: 'none',
            height: '48px',
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
      <div css={{ ...rowStyles, ...weekdayStyles }}>
        {orderedLabels.map(day => (
          <div
            key={day}
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                right: '-1px',
                height: '15px',
                borderLeft: '1px solid #eeeeee'
              }
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

Header.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number.isRequired,
  closeAriaLabel: PropTypes.string,
  headerLabel: PropTypes.string,
  dayLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowStyles: PropTypes.shape().isRequired
};

Header.defaultProps = {
  closeAriaLabel: '',
  headerLabel: ''
};

export default Header;
