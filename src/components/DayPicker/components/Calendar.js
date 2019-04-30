import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DayPicker } from 'react-day-picker';
import { css } from 'emotion';

import noop from '../../../utils/noop';
import { colours, fontFamily, fontSize } from '../../../theme/airways';

import Day from './Day';

function focusStyles() {
  return css({
    '&:focus': {
      zIndex: 2
    }
  });
}

function weekStyles(rowStyles) {
  return css({
    ...rowStyles
  });
}

function monthStyles() {
  return css({
    paddingTop: '2px',
    fontFamily: fontFamily.body,
    textAlign: 'center',
    background: colours.disabledGrey
  });
}

export function getDateToFocus({ start, disabledBefore }) {
  if (start) {
    return 'start';
  }

  if (disabledBefore) {
    return 'disabledBefore';
  }

  return 'today';
}

class Calendar extends Component {
  renderDay = (day, { hidden, ...modifiers }) => {
    const {
      setFocusElementRef,
      startLabel,
      endLabel,
      startAriaLabel,
      endAriaLabel,
      Icon
    } = this.props;

    return hidden ? null : (
      <Day
        setFocusElementRef={setFocusElementRef}
        day={day}
        modifiers={modifiers}
        startLabel={startLabel}
        endLabel={endLabel}
        startAriaLabel={startAriaLabel}
        endAriaLabel={endAriaLabel}
        Icon={Icon}
      />
    );
  };

  renderMonthCaption = ({ date }) => {
    const { monthLabels } = this.props;

    return (
      <div
        data-date={date}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '58px'
        }}
      >
        <span
          css={{
            fontFamily: fontFamily.bold,
            fontSize: '1.375rem',
            marginRight: '5px'
          }}
        >
          {monthLabels[date.getMonth()]}
        </span>
        <span
          css={{
            fontSize: fontSize.body,
            fontFamily: fontFamily.body
          }}
        >
          {date.getFullYear()}
        </span>
      </div>
    );
  };

  render() {
    const {
      today,
      start,
      end,
      onDayClick,
      disabledBefore,
      hiddenBefore,
      disabledAfter,
      rowStyles,
      firstDayOfWeek,
      monthsToShow
    } = this.props;

    const focusElement = getDateToFocus({
      start,
      disabledBefore
    });

    const initialMonth = today;

    return (
      <DayPicker
        initialMonth={new Date(initialMonth.setHours(0, 0, 0, 0))}
        disabledDays={{ before: disabledBefore, after: disabledAfter }}
        selectedDays={{ from: start, to: end }}
        modifiers={{
          start,
          end,
          hidden: { before: hiddenBefore },
          focusElement: this.props[focusElement]
        }}
        renderDay={this.renderDay}
        captionElement={this.renderMonthCaption}
        onDayClick={onDayClick}
        numberOfMonths={monthsToShow}
        firstDayOfWeek={firstDayOfWeek}
        showWeekDays={false}
        canChangeMonth={false}
        modifiersStyles={{
          hidden: { display: 'none' }
        }}
        classNames={{
          body: 'runway-calendar__body',
          week: weekStyles(rowStyles),
          day: focusStyles(),
          month: monthStyles(),
          outside: 'outside',
          selected: 'selected',
          disabled: 'disabled',
          today: 'today'
        }}
      />
    );
  }
}

Calendar.propTypes = {
  today: PropTypes.instanceOf(Date),
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  hiddenBefore: PropTypes.instanceOf(Date),
  disabledBefore: PropTypes.instanceOf(Date),
  disabledAfter: PropTypes.instanceOf(Date),
  onDayClick: PropTypes.func,
  setFocusElementRef: PropTypes.func,
  firstDayOfWeek: PropTypes.number,
  monthsToShow: PropTypes.number,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startAriaLabel: PropTypes.string,
  endAriaLabel: PropTypes.string,
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  Icon: PropTypes.func,
  rowStyles: PropTypes.shape()
};

Calendar.defaultProps = {
  today: new Date(),
  start: null,
  end: null,
  hiddenBefore: null,
  disabledBefore: null,
  disabledAfter: null,
  onDayClick: noop,
  setFocusElementRef: noop,
  firstDayOfWeek: 0,
  monthsToShow: 1,
  startLabel: '',
  endLabel: '',
  startAriaLabel: '',
  endAriaLabel: '',
  monthLabels: [],
  Icon: null,
  rowStyles: {}
};

export default Calendar;
