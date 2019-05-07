import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import Planeicon from '../../../icons/PlaneIcon';
import Triangle from '../../../icons/Triangle';
import { colours, mq, airwaysFontFamily } from '../../../theme/airways';
import {
  CSS_PSEUDO_AFTER,
  CSS_SELECTOR_FOCUS,
  CSS_SELECTOR_HOVER
} from '../../../constants/css';

export function calendarHeatherCntStyle() {
  return css({
    label: 'runway-calendar-header-style_container',
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
  transition: '.4s',
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

export function returnTabStyle({ isSelectingStartDate }) {
  return css({
    label: 'runway-return_tab',
    color: isSelectingStartDate ? colours.white : colours.darkerGrey,
    border: isSelectingStartDate ? 'none' : 'solid 5px #8de2e0',
    borderLeft: 'none',
    backgroundColor: isSelectingStartDate ? colours.darkerGrey : colours.white,
    textAlign: 'right',
    float: 'right',
    justifyContent: 'flex-end',
    padding: '0 15px',
    ...tabStyles,
    [CSS_SELECTOR_HOVER]: {
      backgroundColor: isSelectingStartDate ? '#3c3c3c' : colours.white
    }
  });
}

export function departTabStyles({ isSelectingStartDate }) {
  return css({
    label: 'runway-depart_tab',
    padding: '0 15px',
    border: isSelectingStartDate ? 'solid 5px #8de2e0' : 'solid 5px #323232',
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
      borderTop: '32px solid transparent',
      borderLeft: isSelectingStartDate ? '14px solid white' : '0',
      borderBottom: '32px solid transparent',
      borderRight: isSelectingStartDate ? '0' : '19px solid white',
      top: '-5px',
      [mq.medium]: {
        right: isSelectingStartDate ? '-17px' : '-1px',
        borderLeft: isSelectingStartDate ? '19px solid white' : '0',
        borderTop: '42px solid transparent',
        borderBottom: '42px solid transparent',
        top: '-7px'
      }
    }
  });
}

export function textStyles({ isPlaceholder }) {
  return css({
    label: 'runway_text_style',
    fontFamily: airwaysFontFamily.main,
    fontSize: '18px',
    lineHeight: isPlaceholder ? 1.11 : 1.25,
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    [mq.medium]: {
      fontSize: '26px'
    },
    [mq.large]: {
      flexDirection: 'row'
    }
  });
}

export function planeSvgStyles({ isSelectingStartDate }) {
  return css({
    label: 'runway-slider_plane-svg',
    width: '32px',
    height: '32px',
    zIndex: '10',
    position: 'absolute',
    right: isSelectingStartDate ? '-5px' : '-26px',
    transform: isSelectingStartDate ? 'rotate(0deg)' : 'rotate(180deg)',
    [mq.medium]: {
      width: '40px',
      height: '40px',
      right: isSelectingStartDate ? '-3px' : '-34px'
    },
    [mq.small]: {
      width: '28px',
      height: '28px',
      right: isSelectingStartDate ? '-7px' : '-20px'
    }
  });
}

export function TriangleSvgStyles({ isSelectingStartDate }) {
  return css({
    label: 'runway-slider_triangle-svg',
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
  departSelectedLabel,
  returnSelectedLabel,
  departPlaceholder,
  returnPlaceholder,
  departDate,
  returnDate,
  onTabClick,
  isOneWay
}) => {
  const renderDepartPlaceholder = () => {
    if (departDate) {
      return (
        <div css={textStyles({ isPlaceholder: false })}>
          <span>
            <b>
              {departSelectedLabel}
              &nbsp;
            </b>
          </span>
          <span>{departDate}</span>
        </div>
      );
    }
    return (
      <span css={textStyles({ isPlaceholder: true })}>{departPlaceholder}</span>
    );
  };
  const renderReturnPlaceholder = () => {
    if (returnDate) {
      return (
        <div css={textStyles({ isPlaceholder: false })}>
          <span>
            <b>{returnSelectedLabel}</b>
          </span>
          <span>
            &nbsp;
            {returnDate}
          </span>
        </div>
      );
    }
    return (
      <span css={textStyles({ isPlaceholder: true })}>{returnPlaceholder}</span>
    );
  };
  return (
    <div>
      <div css={calendarHeatherCntStyle()}>
        <button
          onClick={() => onTabClick({ isSelectingStartDate: true })}
          type="button"
          css={departTabStyles({ isSelectingStartDate })}
        >
          {renderDepartPlaceholder()}
          <Planeicon css={planeSvgStyles({ isSelectingStartDate })} />
          <Triangle css={TriangleSvgStyles({ isSelectingStartDate })} />
        </button>
        {!isOneWay && (
          <button
            onClick={() => onTabClick({ isSelectingStartDate: false })}
            type="button"
            css={returnTabStyle({ isSelectingStartDate })}
          >
            {renderReturnPlaceholder()}
          </button>
        )}
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  isSelectingStartDate: PropTypes.bool,
  isOneWay: PropTypes.bool,
  departPlaceholder: PropTypes.string.isRequired,
  returnPlaceholder: PropTypes.string.isRequired,
  departSelectedLabel: PropTypes.string.isRequired,
  returnSelectedLabel: PropTypes.string.isRequired,
  departDate: PropTypes.string,
  returnDate: PropTypes.string,
  onTabClick: PropTypes.func
};

CalendarHeader.defaultProps = {
  isSelectingStartDate: true,
  isOneWay: false,
  departDate: null,
  returnDate: null,
  onTabClick: () => {}
};

export default CalendarHeader;
