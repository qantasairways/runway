/* eslint-disable react/no-unused-prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Month from './components/Month';
import Footer from './components/Footer';

import noop from '../../utils/noop';
import { fontSize, layout, breakpoints } from '../../theme/airways';
import {
  getDateWithoutTime,
  getTwoDigitDate,
  getMonthAndYear,
  getMonthsArray,
  getDateArray,
  getInitialDateToFocus,
  getDateToNavigate,
  getItemSize,
  getFirstEnabledMonthDate,
  focusDayCell,
  DAY_CELL_BORDER_WIDTH,
  getLastEnabledMonthDate
} from './helpers';

import ButtonWithDialog, {
  ButtonContent,
  transitionStylesSlideUp,
  dialogStylesFullScreen
} from '../../shared/ButtonWithDialog';
import IconCalendar from '../../icons/CalendarIcon';
import Header from './components/Header';

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

  onOpen = () => {
    const { today, startDate, disabledBefore } = this.state;
    const { date, month } = getInitialDateToFocus(
      today,
      startDate,
      disabledBefore
    );

    this.scrollToMonth(month);
    focusDayCell(date);
    this.setState({ showFooters: true });
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

  onDayNavigate = (timestamp, keyCode) => {
    const dateToNavigate = getDateToNavigate(timestamp, keyCode);
    focusDayCell(dateToNavigate);
  };

  scrollToMonth = index => {
    if (this.scrollList) {
      this.scrollList.scrollToItem(index, 'start');
    }
  };

  renderHeader = ({ closeDialog }) => {
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
      Icon
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
        rowStyles={rowStyles}
        Icon={Icon}
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

  renderMonth = ({ index, style }, isDesktopDevice) => {
    const {
      isDateRange,
      firstDayOfWeek,
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
      isSelectingStartDate
    } = this.state;

    const month = months[index];

    let dates = getDateArray({
      month,
      monthIndex: index,
      today,
      firstDayOfWeek,
      startDate,
      endDate,
      disabledBefore,
      disabledAfter
    });

    const { transformDatesData } = this.props;
    if (transformDatesData) {
      dates = transformDatesData(dates);
    }

    return (
      <Month
        key={month}
        month={month}
        days={dates}
        style={style}
        startDate={startDate}
        endDate={endDate}
        isDateRange={isDateRange}
        isSelectingStartDate={isSelectingStartDate}
        onDayClick={this.onDayClick}
        onDayNavigate={this.onDayNavigate}
        startSelectedLabel={startSelectedLabel}
        endSelectedLabel={endSelectedLabel}
        startLabel={startLabel}
        endLabel={endLabel}
        startAriaLabel={startAriaLabel}
        endAriaLabel={endAriaLabel}
        monthLabels={monthLabels}
        Icon={Icon}
        rowStyles={rowStyles}
        isDesktopDevice={isDesktopDevice}
        today={today}
      />
    );
  };

  setupOnMonthsShownSubscription = () => {
    const {
      configOnMonthsShownSubscription,
      disabledBefore,
      disabledAfter
    } = this.props;
    if (configOnMonthsShownSubscription) {
      const { onlyEnableds, onMonthsShown } = configOnMonthsShownSubscription;
      if (onMonthsShown) {
        return ({ visibleStartIndex, visibleStopIndex }) => {
          const startMonthRawDate = this.state.months[visibleStartIndex];
          const endMonthRawDate = this.state.months[visibleStopIndex];
          if (onlyEnableds) {
            const firstValidMonthDate = getFirstEnabledMonthDate({
              monthDate: startMonthRawDate,
              disabledBefore,
              disabledAfter
            });
            const lastValidMonthDate = getLastEnabledMonthDate({
              monthDate: endMonthRawDate,
              disabledAfter
            });
            onMonthsShown({
              startMonthDate: firstValidMonthDate,
              endMonthDate: lastValidMonthDate
            });
            return;
          }
          onMonthsShown({
            startMonthDate: startMonthRawDate,
            endMonthDate: endMonthRawDate
          });
        };
      }
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
      startDate,
      endDate,
      isDateRange,
      footerButtonLabel,
      preFooterInfo,
      bottomFootersummaryLabel,
      hasPrice,
      endDateData
    } = this.props;

    const { months, showFooters } = this.state;
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
        contentPadding="0"
      >
        {({ closeDialog }) => (
          <div style={{ height: window.innerHeight }}>
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
                    height={height}
                    itemCount={monthsToShow}
                    itemSize={index =>
                      getItemSize(
                        index,
                        months,
                        firstDayOfWeek,
                        isDesktopDevice
                      )
                    }
                    width={width}
                    onItemsRendered={this.setupOnMonthsShownSubscription()}
                  >
                    {row => this.renderMonth(row, isDesktopDevice)}
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
   *
   * @param {Date} startDate New start date value
   * @param {Bool} endDate New end date value if isDateRange prop is true
   */ onDayClick: PropTypes.func,
  /**
   * Triggered when the calendar is closed
   *
   */ onBeforeClose: PropTypes.func,
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
  /** Icon to display in header and in the label of highlighted days */
  Icon: PropTypes.func,
  /** Custom transform function that will be applied over dates data arrays.
   * If provided, must return an array, which will be used to replace the existing
   * dates data array. Note, these transforms are practically applied over month-based sets of
   * dates data arrays, the consumer should not expect to have access to entire dates data list.
   */
  transformDatesData: PropTypes.func,
  /**
   * Object that sets up onMonthsShown event subscription. Must at least include
   * `onMonthsShown` callback which will be dispatched when visible months on screen is updated.
   * `onMonthsShown` will receive parameters `startMonthDate`, `endMonthDate`. Object also accepts
   *  enabledsOnly boolean, if true will only return visible start and end month dates that are enabled
   */
  configOnMonthsShownSubscription: PropTypes.shape({
    onMonthsShown: PropTypes.func.isRequired,
    enabledsOnly: PropTypes.bool
  }),
  /** Label for button */
  footerButtonLabel: PropTypes.string,
  /** Flag preFooter info in case price included. In one way it's up when land to the calenadar and in return needs to select the start date  */
  preFooterInfo: PropTypes.string,
  /** In one way it's up when the date has been selected and in return when end date has been selected */
  bottomFootersummaryLabel: PropTypes.string,
  /** Falg showing the price whether added price to the calnendar */
  hasPrice: PropTypes.bool,
  /** Data get from the date to show on the button footer label for price and points */
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
  })
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
  configOnMonthsShownSubscription: null,
  footerButtonLabel: 'Confirm',
  preFooterInfo: 'Lowest economy price per adult in AUD for a return trip.',
  bottomFootersummaryLabel: 'From ',
  hasPrice: false,
  endDateData: null
};

export default DayPicker;
