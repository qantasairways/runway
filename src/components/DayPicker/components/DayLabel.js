import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { colours, fontWeight, mq } from '../../../theme/airways';

function DayLabelStyles({ leftAligned, bottomAligned, isSelected }) {
  const verticalOffset = isSelected ? '-3px' : 0;

  return css({
    label: 'runway-calendar__day-label',
    display: 'flex',
    flexDirection: leftAligned ? 'row' : 'row-reverse',
    alignItems: 'center',
    position: 'absolute',
    left: leftAligned ? 0 : 'initial',
    right: leftAligned ? 'initial' : '-1px',
    top: bottomAligned ? 'initial' : verticalOffset,
    bottom: bottomAligned ? verticalOffset : 'initial',
    height: '14px',
    boxSizing: 'border-box',
    paddingTop: 0,
    paddingRight: leftAligned ? 0 : '2px',
    paddingLeft: leftAligned ? '2px' : '0',
    fontSize: '0.625rem',
    fontWeight: fontWeight.bold,
    lineHeight: 0,
    background: colours.hightlightsLight,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: leftAligned ? '-5px' : 'initial',
      left: leftAligned ? 'initial' : '-5px',
      border: 'solid transparent',
      borderRight: leftAligned
        ? 'solid transparent'
        : `solid ${colours.hightlightsLight}`,
      borderLeft: leftAligned
        ? `solid ${colours.hightlightsLight}`
        : 'solid transparent',
      borderWidth: leftAligned ? '7px 0 7px 5px' : '7px 5px 7px 0'
    },
    [mq.medium]: {
      height: '16px',
      fontSize: '0.75rem',
      paddingRight: leftAligned ? 0 : '3px',
      paddingLeft: leftAligned ? '3px' : 0,
      paddingTop: isSelected && !bottomAligned ? '3px' : 0,
      '&::after': {
        right: leftAligned ? '-6px' : 'initial',
        left: leftAligned ? 'initial' : '-6px',
        borderWidth: leftAligned ? '8px 0 8px 6px' : '8px 6px 8px 0'
      }
    }
  });
}

function DayLabel({ leftAligned, bottomAligned, isSelected, label, Icon }) {
  return label ? (
    <div css={DayLabelStyles({ leftAligned, bottomAligned, isSelected })}>
      <span>{label}</span>
      {Icon && (
        <Icon
          className={css({
            marginBottom: '1px',
            fill: colours.darkerGrey,
            transform: leftAligned ? 'none' : 'scaleX(-1)'
          })}
          height="10"
          width="10"
        />
      )}
    </div>
  ) : null;
}

DayLabel.propTypes = {
  leftAligned: PropTypes.bool,
  bottomAligned: PropTypes.bool,
  isSelected: PropTypes.bool,
  label: PropTypes.string,
  Icon: PropTypes.func
};

DayLabel.defaultProps = {
  leftAligned: true,
  bottomAligned: false,
  isSelected: false,
  label: '',
  Icon: null
};

export default DayLabel;
