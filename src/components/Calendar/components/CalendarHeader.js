import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import Planeicon from '../../../icons/PlaneIcon';
import Triangle from '../../../icons/Triangle';
import {
  colours,
  mq,
  fontFamily,
  layout,
  fontSize,
  fontWeight
} from '../../../theme/airways';
import {
  CSS_PSEUDO_AFTER,
  CSS_SELECTOR_FOCUS,
  CSS_SELECTOR_HOVER
} from '../../../constants/css';

export function calendarHeatherCntStyle() {
  return css({
    position: 'relative',
    width: '100%',
    backgroundColor: colours.darkerGrey,
    display: 'flex'
  });
}

const tabStyles = {
  position: 'relative',
  cursor: 'pointer',
  width: '50%',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  [CSS_SELECTOR_FOCUS]: {
    outline: 'none'
  },
  [mq.medium]: {
    height: '80px'
  },
  [mq.large]: {
    justifyContent: 'center'
  }
};

export function endTabStyle({ isSelectingStartDate }) {
  return css({
    label: 'runway-calendar-header_endTab_style',
    color: isSelectingStartDate ? colours.white : colours.darkerGrey,
    border: isSelectingStartDate ? 'none' : `solid 5px ${colours.highlights}`,
    borderLeft: 'none',
    backgroundColor: isSelectingStartDate ? colours.darkerGrey : colours.white,
    textAlign: 'right',
    float: 'right',
    justifyContent: 'flex-end',
    padding: `0 ${layout.gutter}`,
    ...tabStyles,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: isSelectingStartDate ? '#3c3c3c' : colours.white
    }
  });
}

export function startTabStyles({ isSelectingStartDate }) {
  return css({
    label: 'runway-calendar-header_startTab_style',
    padding: `0 ${layout.gutter}`,
    border: isSelectingStartDate
      ? `solid 5px ${colours.highlights}`
      : `solid 5px ${colours.darkerGrey}`,
    borderRight: '0',
    backgroundColor: isSelectingStartDate ? colours.white : colours.darkerGrey,
    color: isSelectingStartDate ? colours.darkerGrey : colours.white,
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    textAlign: 'left',
    ...tabStyles,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: isSelectingStartDate ? colours.white : '#3c3c3c'
    },
    [CSS_PSEUDO_AFTER]: {
      content: "''",
      zIndex: '5',
      position: 'absolute',
      right: isSelectingStartDate ? '-14px' : '0',
      borderTop: `32px solid ${colours.transparent}`,
      borderLeft: isSelectingStartDate ? `14px solid ${colours.white}` : '0',
      borderBottom: `32px solid ${colours.transparent}`,
      borderRight: isSelectingStartDate ? '0' : `19px solid ${colours.white}`,
      top: '-5px',
      [mq.medium]: {
        right: isSelectingStartDate ? '-17px' : '-1px',
        borderLeft: isSelectingStartDate ? `19px solid ${colours.white}` : '0',
        borderTop: `42px solid ${colours.transparent}`,
        borderBottom: `42px solid ${colours.transparent}`,
        top: '-7px'
      }
    }
  });
}

export function textStyles({ isPlaceholder }) {
  return css({
    label: 'runway-calendar-header_text_style',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    lineHeight: isPlaceholder ? 1.11 : 1.25,
    fontWeight: fontWeight.regular,
    display: 'flex',
    flexDirection: 'column',
    [mq.medium]: {
      fontSize: fontSize.medium
    },
    [mq.large]: {
      flexDirection: 'row'
    }
  });
}

export function planeSvgStyles({ isSelectingStartDate }) {
  return css({
    width: '28px',
    height: '28px',
    zIndex: '10',
    position: 'absolute',
    right: isSelectingStartDate ? '-7px' : '-19px',
    transform: isSelectingStartDate ? 'rotate(0deg)' : 'rotate(180deg)',
    [mq.small]: {
      width: '32px',
      height: '32px',
      right: isSelectingStartDate ? '-7px' : '-24px'
    },
    [mq.medium]: {
      width: '40px',
      height: '40px',
      right: isSelectingStartDate ? '-3px' : '-34px'
    }
  });
}

export function TriangleSvgStyles({ isSelectingStartDate }) {
  return css({
    zIndex: '10',
    position: 'absolute',
    right: isSelectingStartDate ? '-49px' : '-11px',
    top: isSelectingStartDate ? '-5px' : '-7px',
    transform: isSelectingStartDate ? 'rotate(0)' : 'rotate(-180deg)',
    [mq.medium]: {
      height: '83px',
      right: isSelectingStartDate ? '-53px' : '-6px',
      top: isSelectingStartDate ? '-5px' : '-8px'
    }
  });
}

const CalendarHeader = ({
  isSelectingStartDate,
  startSelectedLabel,
  endSelectedLabel,
  startPlaceholder,
  endPlaceholder,
  startDate,
  endDate,
  onTabClick,
  isOneWay
}) => {
  const renderStartTabContent = () => {
    if (startDate) {
      return (
        <div css={textStyles({ isPlaceholder: false })}>
          <span>
            <b>
              {startSelectedLabel}
              &nbsp;
            </b>
          </span>
          <span>{startDate}</span>
        </div>
      );
    }
    return (
      <span css={textStyles({ isPlaceholder: true })}>{startPlaceholder}</span>
    );
  };
  const renderEndTabContent = () => {
    if (endDate) {
      return (
        <div css={textStyles({ isPlaceholder: false })}>
          <span>
            <b>{endSelectedLabel}</b>
          </span>
          <span>
            &nbsp;
            {endDate}
          </span>
        </div>
      );
    }
    return (
      <span css={textStyles({ isPlaceholder: true })}>{endPlaceholder}</span>
    );
  };
  return (
    <div>
      <div css={calendarHeatherCntStyle()}>
        <button
          onClick={() => onTabClick({ isSelectingStartDate: true })}
          type="button"
          css={startTabStyles({ isSelectingStartDate })}
        >
          {renderStartTabContent()}
          <Planeicon css={planeSvgStyles({ isSelectingStartDate })} />
          <Triangle css={TriangleSvgStyles({ isSelectingStartDate })} />
        </button>
        {!isOneWay && (
          <button
            onClick={() => onTabClick({ isSelectingStartDate: false })}
            type="button"
            css={endTabStyle({ isSelectingStartDate })}
          >
            {renderEndTabContent()}
          </button>
        )}
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  isSelectingStartDate: PropTypes.bool,
  isOneWay: PropTypes.bool,
  startPlaceholder: PropTypes.string.isRequired,
  endPlaceholder: PropTypes.string.isRequired,
  startSelectedLabel: PropTypes.string.isRequired,
  endSelectedLabel: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onTabClick: PropTypes.func
};

CalendarHeader.defaultProps = {
  isSelectingStartDate: true,
  isOneWay: false,
  startDate: null,
  endDate: null,
  onTabClick: () => {}
};

export default CalendarHeader;
