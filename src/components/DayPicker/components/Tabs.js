import React from 'react';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import Triangle from './TriangleSvg';
import {
  colours,
  mq,
  layout,
  fontSize,
  fontWeight,
  fontFamily
} from '../../../theme/airways';
import {
  CSS_PSEUDO_AFTER,
  CSS_SELECTOR_FOCUS
  // CSS_SELECTOR_HOVER
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
  fontFamily: fontFamily.main,
  position: 'relative',
  // cursor: 'pointer',
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
  return css(tabStyles, {
    label: 'runway-calendar-header_endTab_style',
    color: isSelectingStartDate ? colours.white : colours.darkerGrey,
    border: isSelectingStartDate ? 'none' : `solid 5px ${colours.highlights}`,
    borderLeft: 'none',
    backgroundColor: isSelectingStartDate ? colours.darkerGrey : colours.white,
    textAlign: 'right',
    float: 'right',
    justifyContent: 'flex-end',
    padding: `0 ${layout.gutter}`,
    // [CSS_SELECTOR_HOVER]: {
    //   backgroundColor: isSelectingStartDate ? colours.mediumGrey : colours.white
    // },
    [mq.medium]: {
      justifyContent: 'flex-start'
    }
  });
}

export function startTabStyles({ isSelectingStartDate }) {
  return css(tabStyles, {
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
    // [CSS_SELECTOR_HOVER]: {
    //   backgroundColor: isSelectingStartDate ? colours.white : colours.mediumGrey
    // },
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
    },
    [mq.medium]: {
      justifyContent: 'flex-end'
    }
  });
}

export function textStyles({ isPlaceholder }) {
  return css({
    label: 'runway-calendar-header_text_style',
    fontSize: fontSize.body,
    lineHeight: isPlaceholder ? 1.11 : 1.25,
    fontWeight: fontWeight.regular,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    [mq.medium]: {
      fontSize: fontSize.medium,
      maxWidth: '500px',
      justifyContent: 'center'
    },
    [mq.large]: {
      flexDirection: 'row'
    }
  });
}

export function iconStyles({ isSelectingStartDate }) {
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

const renderTabContent = (date, label, placeholder, isSelected) => {
  if (date) {
    return (
      <div css={textStyles({ isSelected, isPlaceholder: false })}>
        <span>
          <b>
            {label}
            &nbsp;
          </b>
        </span>
        <span>{date}</span>
      </div>
    );
  }
  return (
    <span css={textStyles({ isSelected, isPlaceholder: true })}>
      {placeholder}
    </span>
  );
};

const Tabs = ({
  isSelectingStartDate,
  startSelectedLabel,
  endSelectedLabel,
  startPlaceholder,
  endPlaceholder,
  startDate,
  endDate,
  isDateRange,
  Icon
}) => (
  <div>
    <div css={calendarHeatherCntStyle()}>
      <button
        type="button"
        css={startTabStyles({ isSelectingStartDate })}
        tabIndex={-1}
      >
        {renderTabContent(
          startDate,
          startSelectedLabel,
          startPlaceholder,
          isSelectingStartDate
        )}
        {Icon && <Icon css={iconStyles({ isSelectingStartDate })} />}
        <Triangle css={TriangleSvgStyles({ isSelectingStartDate })} />
      </button>
      {isDateRange && (
        <button
          type="button"
          css={endTabStyle({ isSelectingStartDate })}
          tabIndex={-1}
        >
          {renderTabContent(
            endDate,
            endSelectedLabel,
            endPlaceholder,
            !isSelectingStartDate
          )}
        </button>
      )}
    </div>
  </div>
);

Tabs.propTypes = {
  isSelectingStartDate: PropTypes.bool,
  isDateRange: PropTypes.bool,
  startPlaceholder: PropTypes.string.isRequired,
  endPlaceholder: PropTypes.string.isRequired,
  startSelectedLabel: PropTypes.string.isRequired,
  endSelectedLabel: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  Icon: PropTypes.func
};

Tabs.defaultProps = {
  isSelectingStartDate: true,
  isDateRange: true,
  startDate: null,
  endDate: null,
  Icon: null
};

export default Tabs;
