import {
  startOfMonth,
  endOfMonth,
  isBefore,
  isAfter,
  isSameDay,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  differenceInCalendarWeeks,
  addDays,
  differenceInCalendarMonths,
  isFirstDayOfMonth
} from 'date-fns';
import {
  KEY_CODE_RIGHT,
  KEY_CODE_LEFT,
  KEY_CODE_DOWN,
  KEY_CODE_UP
} from '../../../constants/keyCodes';

export const MONTH_CAPTION_HEIGHT_MOBILE = 58;
export const DAY_CELL_HEIGHT_MOBILE = 94;
export const DAY_CELL_BORDER_WIDTH = 1;
export const MONTH_CAPTION_HEIGHT_DESKTOP = 78;
export const DAY_CELL_HEIGHT_DESKTOP = 90;

export const getDateWithoutTime = date =>
  date ? new Date(new Date(date).setHours(0, 0, 0, 0)) : null;

export const getTwoDigitDate = date => `0${date.getDate()}`.slice(-2);

export const getMonthAndYear = (date, monthLabels) =>
  `${monthLabels[date.getMonth()]}, ${date.getFullYear()}`;

export const getMonthsArray = (today, monthsToShow) => {
  const monthsArray = [];

  for (let i = 0; i < monthsToShow; i += 1) {
    const month = addMonths(today, i);
    monthsArray.push(month);
  }

  return monthsArray;
};

export function getDateArray({
  month,
  monthIndex,
  today,
  firstDayOfWeek,
  startDate,
  endDate,
  disabledBefore,
  disabledAfter
}) {
  const arr = [];
  const initialDay =
    monthIndex === 0 ? startOfWeek(month) : startOfMonth(month);
  const endDay = endOfWeek(endOfMonth(month));
  const current = startOfWeek(initialDay, { weekStartsOn: firstDayOfWeek });

  while (current <= endDay) {
    if (!isSameMonth(current, initialDay)) {
      arr.push({
        isOutside: true
      });
    } else {
      const date = new Date(current);
      arr.push({
        date,
        timestamp: date.getTime(),
        isToday: isSameDay(date, today),
        isDisabled:
          isBefore(date, disabledBefore) || isAfter(date, disabledAfter),
        isStart: startDate ? isSameDay(date, startDate) : false,
        isEnd: endDate ? isSameDay(date, endDate) : false,
        isFirstDayOfMonth:
          isFirstDayOfMonth(date) || isSameDay(date, disabledBefore),
        isInRange:
          endDate && startDate
            ? isBefore(date, endDate) && isAfter(date, startDate)
            : false
      });
    }

    current.setDate(current.getDate() + 1);
  }
  return arr;
}

export function getInitialDateToFocus(today, startDate, disabledBefore) {
  const dateToFocus = startDate || disabledBefore || today;

  return {
    date: new Date(dateToFocus).getTime(),
    month: differenceInCalendarMonths(dateToFocus, today)
  };
}

export function getItemSize(index, months, firstDayOfWeek, isDesktopDevice) {
  const month = months[index];
  const numberOfWeeks = differenceInCalendarWeeks(
    endOfMonth(month),
    index === 0 ? startOfWeek(month) : startOfMonth(month),
    { weekStartsOn: firstDayOfWeek }
  );

  return isDesktopDevice
    ? MONTH_CAPTION_HEIGHT_DESKTOP +
        (DAY_CELL_HEIGHT_DESKTOP + DAY_CELL_BORDER_WIDTH * 2) *
          (numberOfWeeks + 1)
    : MONTH_CAPTION_HEIGHT_MOBILE +
        (DAY_CELL_HEIGHT_MOBILE + DAY_CELL_BORDER_WIDTH * 2) *
          (numberOfWeeks + 1);
}

export function getShouldSelectAsStartDate(
  isSelectingStartDate,
  day,
  startDate
) {
  return isSelectingStartDate || isBefore(day, startDate);
}

export function getEndDateFromStartDate(newStartDate, endDate) {
  return isAfter(newStartDate, endDate) ? null : endDate;
}

export function getDateToNavigate(timestamp, keyCode) {
  switch (keyCode) {
    case KEY_CODE_RIGHT:
      return new Date(addDays(timestamp, 1)).getTime();
    case KEY_CODE_LEFT:
      return new Date(addDays(timestamp, -1)).getTime();
    case KEY_CODE_DOWN:
      return new Date(addDays(timestamp, 7)).getTime();
    case KEY_CODE_UP:
      return new Date(addDays(timestamp, -7)).getTime();
    default:
      return null;
  }
}

export function focusDayCell(timestamp) {
  if (timestamp) {
    const elementToFocus = document.querySelector(`.d${timestamp}`);
    if (elementToFocus) elementToFocus.focus();
  }
}
