/* eslint-disable react/no-unused-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { isBefore, differenceInCalendarMonths } from 'date-fns';

import Month from './components/Month';
import Footer from './components/Footer';
import DisclaimerMessages from './components/DisclaimerMessages';
import Header from './components/Header';
import IconCalendar from '../../icons/CalendarIcon';
import ButtonWithDialog, {
  ButtonContent,
  transitionStylesSlideUp,
  dialogStylesFullScreen
} from '../../shared/ButtonWithDialog';

import noop from '../../utils/noop';
import { fontSize, layout, breakpoints } from '../../theme/airways';
import {
  getDateWithoutTime,
  getTwoDigitDate,
  getMonthAndYear,
  getMonthsArray,
  getInitialDateToFocus,
  getDateElementOffset,
  getItemSize,
  getFirstEnabledMonthDate,
  DAY_CELL_BORDER_WIDTH,
  getLastEnabledMonthDate
} from './helpers';

import { KEY_CODE_TAB } from '../../constants/keyCodes';

const rowStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridGap: `${DAY_CELL_BORDER_WIDTH}px`,
  maxWidth: layout.containerMaxWidth,
  margin: '1px auto 0 auto',
  padding: '0 1px'
};

const dividerStyles = {
  fontSize: fontSize.large,
  margin: '0 12px 20px 12px'
};

function CalendarRow({ index, style, data }) {
  if (index === 0) {
    return (
      <DisclaimerMessages
        style={style}
        disclaimerMessage={data.disclaimerMessage}
        onKeyDown={data.onDisclaimerKeyDown}
      />
    );
  }

  return <Month monthIndex={index - 1} style={style} {...data} />;
}

class DayPicker extends Component {
  constructor(props) {
    super(props);

    const { disabledAfter, monthsToShow } = props;
    const today = new Date().setHours(0, 0, 0, 0);

    this.state = {
      today,
      disabledAfter: getDateWithoutTime(disabledAfter),
      months: getMonthsArray(today, monthsToShow),
      isSelectingStartDate: true,
      showFooters: false
    };
  }

  static getDerivedStateFromProps({ startDate, endDate, disabledBefore }) {
    return {
      startDate: getDateWithoutTime(startDate),
      endDate: getDateWithoutTime(endDate),
      disabledBefore: getDateWithoutTime(disabledBefore)
    };
  }

  /** Enable use of the tab key to navigate from the daypicker header into the calendar */
  onHeaderKeyDown = event => {
    if (!event.shiftKey && event.keyCode === KEY_CODE_TAB) {
      event.preventDefault();

      const { today, startDate, disabledBefore } = this.state;
      const date = getInitialDateToFocus(today, startDate, disabledBefore);
      this.focusDateElement(date);
    }
  };

  onOpen = () => {
    const { isDateRange } = this.props;
    const { startDate, isSelectingStartDate } = this.state;
    let shouldSelectStartDate = true;

    if (isDateRange) {
      shouldSelectStartDate = startDate ? false : isSelectingStartDate;
    }

    this.setState({
      showFooters: true,
      isSelectingStartDate: shouldSelectStartDate
    });
  };

  onBeforeClose = () => {
    this.setState({ showFooters: false });
    this.props.onBeforeClose();
  };

  onDayClick = (startDate, endDate, isSelectingStartDate) => {
    this.setState({
      isSelectingStartDate
    });
    this.props.onDayClick(startDate, endDate);
  };

  /** Programatically set keyboard focus on a particular date for accessibility */
  focusDateElement = date => {
    const { disabledBefore, today } = this.state;

    const firstAvailableDate = disabledBefore || today;
    const dateToFocus = isBefore(date, firstAvailableDate)
      ? firstAvailableDate
      : date;
    const elementSelector = `.d${new Date(dateToFocus).getTime()}`;

    let elementToFocus = document.querySelector(elementSelector);

    // Set the focus in the next event loop
    setTimeout(() => {
      elementToFocus = document.querySelector(elementSelector);
      if (elementToFocus) {
        elementToFocus.focus();
      }
    });

    if (!this.scrollList) {
      return;
    }

    // Scroll the virtualised list so that the date we want to focus is mounted
    const dateElementOffset = getDateElementOffset(elementToFocus);
    if (dateElementOffset) {
      this.scrollList.scrollTo(dateElementOffset);
    } else {
      const month = differenceInCalendarMonths(dateToFocus, today);
      this.scrollList.scrollToItem(month + 1);
    }
  };

  renderHeader = ({ closeDialog, setFocusElementRef }) => {
    const {
      firstDayOfWeek,
      isDateRange,
      startSelectedLabel,
      endSelectedLabel,
      startLabel,
      endLabel,
      startPlaceholder,
      endPlaceholder,
      headerLabel,
      dayLabels,
      closeAriaLabel,
      Icon,
      disclaimerMessage
    } = this.props;

    const { startDate, endDate, isSelectingStartDate } = this.state;

    return (
      <Header
        closeDialog={closeDialog}
        startDate={startDate}
        endDate={endDate}
        firstDayOfWeek={firstDayOfWeek}
        isDateRange={isDateRange}
        isSelectingStartDate={isSelectingStartDate}
        startSelectedLabel={`${startLabel || ''} ${startSelectedLabel || ''}`}
        endSelectedLabel={`${endLabel || ''} ${endSelectedLabel || ''}`}
        startPlaceholder={startPlaceholder}
        endPlaceholder={endPlaceholder}
        headerLabel={headerLabel}
        dayLabels={dayLabels}
        closeAriaLabel={closeAriaLabel}
        onKeyDown={disclaimerMessage ? null : this.onHeaderKeyDown}
        rowStyles={rowStyles}
        Icon={Icon}
        setFocusElementRef={setFocusElementRef}
      />
    );
  };

  renderButtonDates = () => {
    const { monthLabels } = this.props;
    const { startDate, endDate } = this.state;

    return startDate ? (
      <div
        css={{
          display: 'flex',
          overflow: 'hidden',
          maxWidth: '100%'
        }}
      >
        <ButtonContent
          largeButtonValue={getTwoDigitDate(startDate)}
          smallButtonValue={getMonthAndYear(startDate, monthLabels)}
        />
        {endDate && <div css={dividerStyles}>-</div>}
        {endDate && (
          <ButtonContent
            largeButtonValue={getTwoDigitDate(endDate)}
            smallButtonValue={getMonthAndYear(endDate, monthLabels)}
          />
        )}
      </div>
    ) : null;
  };

  getCalendarRowKey = (index, { monthLabels, months }) => {
    if (index === 0) {
      return 'disclaimer';
    }

    const month = months[index - 1];

    return `${monthLabels[month.getMonth()]}${month.getFullYear()}`;
  };

  setUpOnScroll = () => {
    const { onCalendarScroll, disabledBefore, disabledAfter } = this.props;

    if (typeof onCalendarScroll === 'function') {
      return ({ visibleStartIndex, visibleStopIndex }) => {
        const firstVisibleDate = this.state.months[visibleStartIndex];
        const lastVisibleDate = this.state.months[visibleStopIndex];

        const startDate = getFirstEnabledMonthDate({
          monthDate: firstVisibleDate,
          disabledBefore,
          disabledAfter
        });

        const endDate = getLastEnabledMonthDate({
          monthDate: lastVisibleDate,
          disabledAfter
        });

        onCalendarScroll({
          startDate,
          endDate
        });
      };
    }
    return noop;
  };

  render() {
    const {
      monthsToShow,
      buttonLabel,
      placeHolder,
      closeAriaLabel,
      dialogAriaLabel,
      firstDayOfWeek,
      isDateRange,
      footerButtonLabel,
      preFooterInfo,
      bottomFootersummaryLabel,
      hasPrice,
      endDateData,
      shouldAddScrollLockClass,
      disclaimerMessage,
      transformDatesData,
      startSelectedLabel,
      endSelectedLabel,
      startLabel,
      endLabel,
      startAriaLabel,
      endAriaLabel,
      monthLabels,
      Icon
    } = this.props;

    const {
      months,
      today,
      startDate,
      endDate,
      disabledBefore,
      disabledAfter,
      isSelectingStartDate,
      showFooters
    } = this.state;

    const setPreFooter = () => {
      if (showFooters) {
        if (!isDateRange) {
          // one ways
          return true;
        }
        // return
        if (hasPrice && startDate) {
          return true;
        }
      }
      return false;
    };

    const setShowBottomFooters = () => {
      const result =
        showFooters && (!!(startDate && !isDateRange) || !!endDate);
      return result;
    };
    return (
      <ButtonWithDialog
        buttonLabel={buttonLabel}
        placeHolder={placeHolder}
        closeAriaLabel={closeAriaLabel}
        dialogAriaLabel={dialogAriaLabel}
        Icon={IconCalendar}
        onOpen={this.onOpen}
        onBeforeClose={this.onBeforeClose}
        closeOnBlur={false}
        renderHeader={this.renderHeader}
        renderButtonValue={this.renderButtonDates}
        dialogStyles={dialogStylesFullScreen}
        transitionStyles={transitionStylesSlideUp}
        shouldAddScrollLockClass={shouldAddScrollLockClass}
      >
        {({ closeDialog, setScrollTargetRef }) => (
          <div style={{ height: '100%' }}>
            <AutoSizer>
              {({ height, width }) => {
                const isDesktopDevice =
                  window.matchMedia &&
                  window.matchMedia(breakpoints.medium).matches;
                return (
                  <List
                    ref={el => {
                      this.scrollList = el;
                    }}
                    outerRef={setScrollTargetRef}
                    height={height}
                    itemCount={monthsToShow + 1}
                    itemKey={this.getCalendarRowKey}
                    itemSize={index =>
                      getItemSize(
                        index,
                        months,
                        firstDayOfWeek,
                        isDesktopDevice,
                        disclaimerMessage
                      )
                    }
                    width={width}
                    onItemsRendered={this.setUpOnScroll()}
                    itemData={{
                      today,
                      months,
                      startDate,
                      endDate,
                      disabledBefore,
                      disabledAfter,
                      isDateRange,
                      isSelectingStartDate,
                      firstDayOfWeek,
                      onDayClick: this.onDayClick,
                      startSelectedLabel,
                      endSelectedLabel,
                      startLabel,
                      endLabel,
                      startAriaLabel,
                      endAriaLabel,
                      monthLabels,
                      Icon,
                      rowStyles,
                      isDesktopDevice,
                      transformDatesData,
                      disclaimerMessage,
                      focusDateElement: this.focusDateElement,
                      onDisclaimerKeyDown: disclaimerMessage
                        ? this.onHeaderKeyDown
                        : null
                    }}
                  >
                    {CalendarRow}
                  </List>
                );
              }}
            </AutoSizer>
            <Footer
              /** Show pre footer if the dialog is open and the start date not selected or is oneway and hasPrice is true */
              showPreFooter={setPreFooter()}
              /** Show Bottom footer if Dialog is true && (startDate get selected and isDateRange is false(one way) || endDate is null) */
              showBottomFooter={setShowBottomFooters()}
              actionText={footerButtonLabel}
              onActionButtonClick={closeDialog}
              preFooterInfo={
                !isDateRange || (hasPrice && startDate) ? preFooterInfo : null
              }
              bottomFootersummaryLabel={
                hasPrice ? bottomFootersummaryLabel : null
              }
              endDateData={endDateData}
            />
          </div>
        )}
      </ButtonWithDialog>
    );
  }
}

DayPicker.propTypes = {
  /** Start date if selected */
  startDate: PropTypes.instanceOf(Date),
  /** End date if selected */
  endDate: PropTypes.instanceOf(Date),
  /** Disable all days before this date */
  disabledBefore: PropTypes.instanceOf(Date),
  /** Disable all days after this date */
  disabledAfter: PropTypes.instanceOf(Date),
  /**
   * Triggered when any day is clicked
   * @param {Date} startDate New start date value
   * @param {Bool} endDate New end date value if isDateRange prop is true
   */ onDayClick: PropTypes.func,
  /** Triggered when the calendar is closed */
  onBeforeClose: PropTypes.func,
  /** Flag showing whether to select a date range. If set to false a single date will be selected */
  isDateRange: PropTypes.bool,
  /** Index of they day of week to display first */
  firstDayOfWeek: PropTypes.number,
  /** Number of months to display */
  monthsToShow: PropTypes.number,
  /** Label for the field */
  buttonLabel: PropTypes.string,
  /** Placeholder to be displayed if no dates selected */
  placeHolder: PropTypes.string,
  /** Label for the top bar in the header */
  headerLabel: PropTypes.string,
  /** Label for the highlighted day when start date is selected */
  startSelectedLabel: PropTypes.string,
  /** Label for the highlighted day when end date is selected */
  endSelectedLabel: PropTypes.string,
  /** Label for on hover or focus of each day when the user is selecting the start date. This label will also display in the header. */
  startLabel: PropTypes.string,
  /** Label for on hover or focus of each day when the user is selecting the end date. This label will also display in the header. */
  endLabel: PropTypes.string,
  /** Placeholder in the header when no start date is selected */
  startPlaceholder: PropTypes.string,
  /** Placeholder in the header when no end date is selected */
  endPlaceholder: PropTypes.string,
  /** Aria label for the highlighted day when start date is selected */
  startAriaLabel: PropTypes.string,
  /** Aria label for the highlighted day when end date is selected */
  endAriaLabel: PropTypes.string,
  /** Labels for each month */
  monthLabels: PropTypes.arrayOf(PropTypes.string),
  /** Labels for each day */
  dayLabels: PropTypes.arrayOf(PropTypes.string),
  /** Aria label for the close button of the dialog */
  closeAriaLabel: PropTypes.string,
  /** Aria label for the dialog once opened */
  dialogAriaLabel: PropTypes.string,
  /** Function to render an icon to display in header and in the label of highlighted days. Must return an icon. */
  Icon: PropTypes.func,
  /** Custom transform function that will be applied over dates data arrays.
   * If provided, must return an array, which will be used to replace the existing
   * dates data array. Note, these transforms are practically applied over month-based sets of
   * dates data arrays, the consumer should not expect to have access to entire dates data list.
   */
  transformDatesData: PropTypes.func,
  /** Function is called as the calendar is scrolled
   * @param {Date} startDate First visible date
   * @param {Bool} endDate Last visible date */
  onCalendarScroll: PropTypes.func,
  /** Label for button */
  footerButtonLabel: PropTypes.string,
  /** Text to display in the preFooter component */
  preFooterInfo: PropTypes.string,
  /** Text to display in the footer component */
  bottomFootersummaryLabel: PropTypes.string,
  /** Flag showing whether any date has a price associated */
  hasPrice: PropTypes.bool,
  /** Pricing information to display in the footer for the selected date */
  endDateData: PropTypes.shape({
    price: PropTypes.shape({
      value: PropTypes.number,
      taxValue: PropTypes.number,
      points: PropTypes.number,
      isClassic: PropTypes.bool,
      isLowestPrice: PropTypes.bool
    }),
    currencyCode: '',
    currencySymbol: ''
  }),
  /* Additional scroll lock class for forcing safari toolbars to display */
  shouldAddScrollLockClass: PropTypes.bool,
  disclaimerMessage: PropTypes.string
};

DayPicker.defaultProps = {
  startDate: null,
  endDate: null,
  disabledBefore: null,
  disabledAfter: null,
  isDateRange: true,
  onDayClick: noop,
  onBeforeClose: noop,
  firstDayOfWeek: 0,
  monthsToShow: 12,
  buttonLabel: 'When',
  placeHolder: 'When?',
  headerLabel: 'Select Dates',
  startSelectedLabel: 'Selected as start date',
  endSelectedLabel: 'Selected as end date',
  startLabel: 'Starting',
  endLabel: 'Ending',
  startPlaceholder: 'Starting When?',
  endPlaceholder: 'Ending When?',
  startAriaLabel: 'Select as start date',
  endAriaLabel: 'Select as end date',
  monthLabels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  closeAriaLabel: 'Close dialog',
  dialogAriaLabel: 'Select dates',
  Icon: null,
  transformDatesData: null,
  onCalendarScroll: null,
  footerButtonLabel: 'Confirm',
  preFooterInfo: 'Lowest economy price per adult in AUD for a return trip.',
  bottomFootersummaryLabel: 'From ',
  hasPrice: false,
  endDateData: null,
  shouldAddScrollLockClass: false,
  disclaimerMessage: null
};

export default DayPicker;
