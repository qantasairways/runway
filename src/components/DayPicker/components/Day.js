/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { addDays, startOfMonth, addMonths } from 'date-fns';

import { CSS_SELECTOR_HOVER, CSS_SELECTOR_FOCUS } from '../../../constants/css';
import {
  KEY_CODE_SPACE,
  KEY_CODE_ENTER,
  KEY_CODE_LEFT,
  KEY_CODE_RIGHT,
  KEY_CODE_UP,
  KEY_CODE_DOWN,
  KEY_CODE_TAB
} from '../../../constants/keyCodes';
import { colours, fontSize, layout, mq } from '../../../theme/airways';

import {
  getShouldSelectAsStartDate,
  getEndDateFromStartDate,
  DAY_NAVIGATION_MAPPING,
  DAY_CELL_HEIGHT_DESKTOP,
  DAY_CELL_HEIGHT_MOBILE
} from '../helpers';

import Price from './Price';

import DayLabel from './DayLabel';
import PlaneIcon from '../../../icons/PlaneIcon';

const rangeStyles = {
  label: 'runway-calendar__day--highlighted',
  backgroundColor: colours.hightlightsLighter
};

const startEndStyles = {
  label: 'runway-calendar__day--selected',
  paddingTop: '34px',
  zIndex: 1,
  border: `2px solid ${colours.hightlightsLight}`,
  boxShadow: `0 0 0 1px ${colours.hightlightsLight}`,
  [mq.medium]: {
    paddingTop: '31px'
  }
};

const disabledStyles = {
  label: 'runway-calendar__day--disabled',
  cursor: 'initial',
  color: colours.grey,
  background: 'none'
};

const activeStyles = {
  [`${CSS_SELECTOR_HOVER}, ${CSS_SELECTOR_FOCUS}`]: {
    zIndex: 2,
    boxShadow:
      '-2px 3px 4px 0 rgba(0, 0, 0, 0.08), 2px -3px 4px 0 rgba(0, 0, 0, 0.04)'
  },
  [CSS_SELECTOR_HOVER]: {
    'div[class$="runway-calendar__hover-label"]': {
      display: 'flex'
    }
  }
};

function dayStyles({ isInRange, isDisabled, isOutside, isStart, isEnd }) {
  return css(
    {
      label: 'runway-calendar__day',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      paddingTop: '36px',
      boxSizing: 'border-box',
      height: `${DAY_CELL_HEIGHT_MOBILE}px`,
      color: colours.darkerGrey,
      background: colours.white,
      boxShadow: isOutside ? 'none' : '0 0 0 1px #eaeaea',
      outline: 'none',
      [mq.medium]: {
        paddingTop: '33px',
        height: `${DAY_CELL_HEIGHT_DESKTOP}px`
      }
    },
    !isDisabled && !isOutside && activeStyles,
    isInRange && !isStart && !isEnd && rangeStyles,
    (isStart || isEnd) && startEndStyles,
    (isDisabled || isOutside) && disabledStyles
  );
}

function dateStyles({ isToday, isDisabled }) {
  return css({
    label: 'runway-calendar__date',
    height: fontSize.body,
    padding: '2px 4px',
    fontSize: fontSize.body,
    lineHeight: 1.1,
    borderRadius: layout.borderRadius,
    boxSizing: 'content-box',
    backgroundColor: isToday ? colours.hightlightsLight : 'initial',
    color: isToday && isDisabled ? colours.darkGrey : 'inherit',
    [mq.medium]: {
      fontSize: fontSize.labelLarge,
      lineHeight: 0.95
    }
  });
}

function getAriaLabel({
  dayOfMonth,
  month,
  year,
  isStart,
  isEnd,
  isSelectingStartDate,
  startLabel,
  endLabel,
  startSelectedLabel,
  endSelectedLabel,
  startAriaLabel,
  endAriaLabel
}) {
  let label = '';

  if (isStart) {
    label += `${startLabel} ${startSelectedLabel}. `;
  }

  if (isEnd) {
    label += `${endLabel} ${endSelectedLabel}. `;
  }

  label += `${dayOfMonth} ${month} ${year}. `;

  if (isSelectingStartDate) {
    label += startAriaLabel;
  } else {
    label += endAriaLabel;
  }

  return label;
}

class Day extends Component {
  state = {
    hover: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const priceUpdated =
      (this.props.price &&
        nextProps.price &&
        this.props.price.value !== nextProps.price.value) ||
      ((this.props.price && !nextProps.price) ||
        (!this.props.price && nextProps.price));
    if (
      nextState.hover !== this.state.hover ||
      nextProps.isEnd !== this.props.isEnd ||
      nextProps.isStart !== this.props.isStart ||
      nextProps.isInRange !== this.props.isInRange ||
      nextProps.isLoadingPrice !== this.props.isLoadingPrice ||
      priceUpdated
    ) {
      return true;
    }
    return false;
  }

  handleDayClick = () => {
    const {
      startDate,
      endDate,
      isDateRange,
      isDisabled,
      isSelectingStartDate,
      onDayClick,
      date
    } = this.props;

    if (!isDisabled) {
      const selectAsStartDate = getShouldSelectAsStartDate(
        isSelectingStartDate,
        date,
        startDate
      );

      const newStartDate = selectAsStartDate ? date : startDate;
      const newEndDate = !selectAsStartDate
        ? date
        : getEndDateFromStartDate(date, endDate);
      const newIsSelectingStartDate = !isDateRange || !selectAsStartDate;

      onDayClick(newStartDate, newEndDate, newIsSelectingStartDate);
    }

    this.setState({ hover: false });
  };

  handleMouseOver = () => {
    this.setState({
      hover: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hover: false
    });
  };

  handleKeyDown = event => {
    const { keyCode } = event;
    const {
      timestamp,
      focusDateElement,
      isFirstMonth,
      isLastMonth
    } = this.props;

    if (!keyCode || !timestamp) return;

    if (keyCode === KEY_CODE_SPACE || keyCode === KEY_CODE_ENTER) {
      event.preventDefault();
      event.stopPropagation();
      this.handleDayClick();
      return;
    }

    if (
      keyCode === KEY_CODE_LEFT ||
      keyCode === KEY_CODE_RIGHT ||
      keyCode === KEY_CODE_UP ||
      keyCode === KEY_CODE_DOWN
    ) {
      event.preventDefault();
      event.stopPropagation();
      const daysToNavigate = DAY_NAVIGATION_MAPPING[keyCode];
      const dateToFocus = new Date(addDays(timestamp, daysToNavigate));

      focusDateElement(dateToFocus);
      return;
    }

    if (event.shiftKey && keyCode === KEY_CODE_TAB) {
      if (isFirstMonth) return;

      const dateToFocus = startOfMonth(addMonths(new Date(timestamp), -1));
      focusDateElement(dateToFocus);
      return;
    }

    if (keyCode === KEY_CODE_TAB && !isLastMonth) {
      const dateToFocus = startOfMonth(addMonths(new Date(timestamp), 1));
      focusDateElement(dateToFocus);
    }
  };

  renderHoverLabel = () => {
    const {
      date,
      startDate,
      isStart,
      isEnd,
      isDisabled,
      isSelectingStartDate,
      startLabel,
      endLabel,
      Icon
    } = this.props;

    if (
      isDisabled ||
      (isSelectingStartDate && isStart) ||
      (!isSelectingStartDate && isEnd)
    ) {
      return null;
    }

    const isSelected = isStart || isEnd;

    if (getShouldSelectAsStartDate(isSelectingStartDate, date, startDate)) {
      return (
        <DayLabel isSelected={isSelected} label={startLabel} Icon={Icon} />
      );
    }

    if (!isEnd) {
      return (
        <DayLabel
          leftAligned={false}
          isSelected={isSelected}
          label={endLabel}
          Icon={Icon}
        />
      );
    }

    return null;
  };

  render() {
    const {
      date,
      timestamp,
      month,
      year,
      isStart,
      isEnd,
      isOutside,
      isInRange,
      isDisabled,
      isToday,
      isFirstDayOfMonth,
      isSelectingStartDate,
      isDesktopDevice,
      startLabel,
      endLabel,
      startAriaLabel,
      endAriaLabel,
      startSelectedLabel,
      endSelectedLabel,
      Icon,
      isLoadingPrice,
      price,
      currencySymbol
    } = this.props;

    const dayOfMonth = date && date.getDate();

    return isOutside ? (
      <div />
    ) : (
      <div
        role="button"
        tabIndex={isStart || isEnd || isFirstDayOfMonth ? 0 : -1}
        css={dayStyles({ isStart, isEnd, isInRange, isDisabled, isOutside })}
        className={isDisabled ? '' : `d${timestamp}`}
        aria-label={getAriaLabel({
          dayOfMonth,
          month,
          year,
          isStart,
          isEnd,
          isSelectingStartDate,
          startLabel,
          endLabel,
          startSelectedLabel,
          endSelectedLabel,
          startAriaLabel,
          endAriaLabel
        })}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleMouseLeave}
        onClick={this.handleDayClick}
        onKeyDown={this.handleKeyDown}
      >
        <div css={dateStyles({ isToday, isDisabled })}>{dayOfMonth}</div>
        {(isLoadingPrice || price) && (
          <Price
            {...price}
            currencySymbol={currencySymbol}
            isDesktopDevice={isDesktopDevice}
            isLoadingPrice={isLoadingPrice}
          />
        )}
        {isStart && (
          <DayLabel isSelected label={startSelectedLabel} Icon={Icon} />
        )}
        {isEnd && (
          <DayLabel
            leftAligned={false}
            bottomAligned={!!isStart}
            isSelected
            label={endSelectedLabel}
            Icon={Icon}
          />
        )}
        {isDesktopDevice && this.state.hover && this.renderHoverLabel()}
      </div>
    );
  }
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  timestamp: PropTypes.number.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  month: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  onDayClick: PropTypes.func.isRequired,
  focusDateElement: PropTypes.func.isRequired,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  isInRange: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOutside: PropTypes.bool,
  isToday: PropTypes.bool,
  isFirstDayOfMonth: PropTypes.bool,
  isDateRange: PropTypes.bool,
  isSelectingStartDate: PropTypes.bool,
  startSelectedLabel: PropTypes.string,
  endSelectedLabel: PropTypes.string,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startAriaLabel: PropTypes.string,
  endAriaLabel: PropTypes.string,
  Icon: PropTypes.func,
  isDesktopDevice: PropTypes.bool,
  isLoadingPrice: PropTypes.bool,
  currencyCode: PropTypes.string,
  currencySymbol: PropTypes.string,
  price: PropTypes.shape({
    value: PropTypes.number,
    taxValue: PropTypes.number,
    points: PropTypes.number,
    isClassic: PropTypes.bool,
    isLowestPrice: PropTypes.bool
  })
};

Day.defaultProps = {
  startDate: null,
  endDate: null,
  isStart: false,
  isEnd: false,
  isInRange: false,
  isDisabled: false,
  isOutside: false,
  isToday: false,
  isFirstDayOfMonth: false,
  isDateRange: true,
  isSelectingStartDate: true,
  startSelectedLabel: '',
  endSelectedLabel: '',
  startLabel: '',
  endLabel: '',
  startAriaLabel: '',
  endAriaLabel: '',
  Icon: PlaneIcon,
  isDesktopDevice: false,
  currencyCode: '',
  currencySymbol: '',
  isLoadingPrice: false,
  price: null
};

export default Day;
