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
  addDays,
  differenceInCalendarMonths,
  isFirstDayOfMonth,
  differenceInCalendarWeeks,
  startOfDay
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
export const DISCLAIMER_HEIGHT = 90;
export const CLASSIC_DISCLAIMER_HEIGHT = 130;

export const isDayBefore = (firstDate, secondDate) => {
  const first = startOfDay(firstDate);
  const second = startOfDay(secondDate);
  return isBefore(first, second);
};

export const isDayAfter = (firstDate, secondDate) => {
  const first = startOfDay(firstDate);
  const second = startOfDay(secondDate);
  return isAfter(first, second);
};

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
  startDay,
  monthIndex,
  today,
  firstDayOfWeek,
  startDate,
  endDate,
  disabledBefore,
  disabledAfter
}) {
  const arr = [];
  const initialDay = monthIndex === 0 ? startDay : startOfMonth(startDay);
  const endDay = endOfWeek(endOfMonth(startDay));
  const current = startOfWeek(initialDay, { weekStartsOn: firstDayOfWeek });
  const firstAvailableDay = disabledBefore || today;
  const startOfAvailableWeek = startOfWeek(firstAvailableDay, {
    weekStartsOn: firstDayOfWeek
  });

  while (current <= endDay) {
    if (
      !isSameMonth(current, initialDay) ||
      isBefore(current, startOfAvailableWeek)
    ) {
      arr.push({
        date: new Date(current),
        timestamp: current.getTime(),
        isOutside: true
      });
    } else {
      arr.push({
        date: new Date(current),
        timestamp: current.getTime(),
        isToday: isSameDay(current, today),
        isDisabled:
          isBefore(current, disabledBefore) || isAfter(current, disabledAfter),
        isStart: startDate ? isSameDay(current, startDate) : false,
        isEnd: endDate ? isSameDay(current, endDate) : false,
        isFirstDayOfMonth:
          isFirstDayOfMonth(current) || isSameDay(current, disabledBefore),
        isInRange:
          endDate && startDate
            ? isBefore(current, endDate) && isAfter(current, startDate)
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

export function getHeight(disclaimerMessage, classicDisclaimerMessage) {
  if (disclaimerMessage && classicDisclaimerMessage) {
    return CLASSIC_DISCLAIMER_HEIGHT;
  }
  if (disclaimerMessage) {
    return DISCLAIMER_HEIGHT;
  }
  return 0;
}

export function getItemSize(
  index,
  months,
  firstDayOfWeek,
  isDesktopDevice,
  disclaimerMessage,
  classicDisclaimerMessage
) {
  if (index === 0) {
    return getHeight(disclaimerMessage, classicDisclaimerMessage);
  }

  const monthIndex = index - 1;
  const month = months[monthIndex];
  const numberOfWeeks = differenceInCalendarWeeks(
    endOfMonth(month),
    monthIndex === 0
      ? startOfWeek(month, { weekStartsOn: firstDayOfWeek })
      : startOfMonth(month),
    { weekStartsOn: firstDayOfWeek }
  );

  return isDesktopDevice
    ? MONTH_CAPTION_HEIGHT_DESKTOP +
        (DAY_CELL_HEIGHT_DESKTOP + DAY_CELL_BORDER_WIDTH * 3) *
          (numberOfWeeks + 1)
    : MONTH_CAPTION_HEIGHT_MOBILE +
        (DAY_CELL_HEIGHT_MOBILE + DAY_CELL_BORDER_WIDTH * 3) *
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

export const getFirstEnabledMonthDate = ({
  monthDate,
  disabledBefore,
  disabledAfter
}) => {
  const firstDayOfMonth = startOfMonth(monthDate);
  let validDate = firstDayOfMonth;
  if (disabledBefore && isDayBefore(validDate, disabledBefore)) {
    validDate = disabledBefore;
  }
  if (disabledAfter && isDayAfter(validDate, disabledAfter)) {
    validDate = disabledAfter;
  }
  return validDate;
};

export const getLastEnabledMonthDate = ({ monthDate, disabledAfter }) => {
  const lastDayOfMonth = endOfMonth(monthDate);
  let validDate = lastDayOfMonth;
  if (disabledAfter && isDayAfter(validDate, disabledAfter)) {
    validDate = disabledAfter;
  }
  return validDate;
};

export function abbrNum(price) {
  let abbrPrice = price;
  if (price >= 999900) {
    abbrPrice = `${Math.ceil(price / 1000000)}m`;
  }

  if (price >= 10000) {
    if (price % 1000 === 0 || price % 1000 > 900) {
      abbrPrice = `${Math.ceil(price / 1000)}k`;
    } else {
      const afterDecimal = price % 1000;
      // prettier-ignore
      abbrPrice = `${Math.floor(price / 1000)}.${Math.ceil(afterDecimal / 100)}k`;
    }
  } else {
    abbrPrice = Math.ceil(price);
  }

  return abbrPrice;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exponent) {
  if (typeof exponent === 'undefined' || +exponent === 0) {
    return Math[type](value);
  }
  let val = +value;
  const exp = +exponent;
  if (Number.isNaN(val) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  val = val.toString().split('e');
  val = Math[type](+`${val[0]}e${val[1] ? +val[1] - exp : -exp}`);
  val = val.toString().split('e');
  return +`${val[0]}e${val[1] ? +val[1] + exp : exp}`;
}

export const fmtCurrency = value =>
  Number(decimalAdjust('round', Number(value), -1 * 2)).toFixed(2);

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
