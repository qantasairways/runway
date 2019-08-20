import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

import { CSS_SELECTOR_LASTCHILD } from '../../../constants/css';
import { mq, fontWeight, colours } from '../../../theme/airways';

import Day from './Day';
import {
  MONTH_CAPTION_HEIGHT_DESKTOP,
  MONTH_CAPTION_HEIGHT_MOBILE
} from '../helpers';

const monthStyles = {
  paddingTop: '2px',
  textAlign: 'center',
  background: colours.disabledGrey,
  pointerEvents: 'auto',
  [CSS_SELECTOR_LASTCHILD]: {
    paddingBottom: '40px'
  }
};

class Month extends PureComponent {
  renderMonthCaption = (monthLabel, year) => (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.375rem',
        height: `${MONTH_CAPTION_HEIGHT_MOBILE}px`,
        [mq.medium]: {
          height: `${MONTH_CAPTION_HEIGHT_DESKTOP}px`
        }
      }}
    >
      <span
        css={{
          fontWeight: fontWeight.bold,
          marginRight: '5px'
        }}
      >
        {monthLabel}
      </span>
      <span>{year}</span>
    </div>
  );

  render() {
    const {
      month,
      monthLabels,
      isDateRange,
      isSelectingStartDate,
      startSelectedLabel,
      endSelectedLabel,
      startLabel,
      endLabel,
      startAriaLabel,
      endAriaLabel,
      Icon,
      isDesktopDevice,
      days,
      style,
      onDayClick,
      onDayNavigate,
      startDate,
      endDate,
      rowStyles,
      priceInPoints
    } = this.props;

    const monthLabel = monthLabels[month.getMonth()];
    const year = month.getFullYear();

    return (
      <div style={style} role="rowgroup" css={monthStyles}>
        {this.renderMonthCaption(monthLabel, year)}
        <div css={css(rowStyles)}>
          {days.map(day => (
            <Day
              month={monthLabel}
              year={year}
              key={day.timestamp}
              isDateRange={isDateRange}
              isSelectingStartDate={isSelectingStartDate}
              startSelectedLabel={startSelectedLabel}
              endSelectedLabel={endSelectedLabel}
              startLabel={startLabel}
              endLabel={endLabel}
              startAriaLabel={startAriaLabel}
              endAriaLabel={endAriaLabel}
              Icon={Icon}
              isDesktopDevice={isDesktopDevice}
              onDayClick={onDayClick}
              onDayNavigate={onDayNavigate}
              startDate={startDate}
              endDate={endDate}
              {...day}
              priceInPoints={priceInPoints}
            />
          ))}
        </div>
      </div>
    );
  }
}

Month.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  days: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isDateRange: PropTypes.bool,
  isSelectingStartDate: PropTypes.bool,
  isDesktopDevice: PropTypes.bool,
  onDayClick: PropTypes.func.isRequired,
  onDayNavigate: PropTypes.func.isRequired,
  startSelectedLabel: PropTypes.string,
  endSelectedLabel: PropTypes.string,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string,
  startAriaLabel: PropTypes.string,
  endAriaLabel: PropTypes.string,
  monthLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  Icon: PropTypes.func,
  rowStyles: PropTypes.shape(),
  style: PropTypes.shape(),
  priceInPoints: PropTypes.bool
};

Month.defaultProps = {
  startDate: null,
  endDate: null,
  isDateRange: true,
  isSelectingStartDate: true,
  isDesktopDevice: false,
  startSelectedLabel: '',
  endSelectedLabel: '',
  startLabel: '',
  endLabel: '',
  startAriaLabel: '',
  endAriaLabel: '',
  Icon: null,
  rowStyles: {},
  style: {},
  priceInPoints: false
};

export default Month;
